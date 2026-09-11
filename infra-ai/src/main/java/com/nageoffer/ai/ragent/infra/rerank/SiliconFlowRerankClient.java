/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.nageoffer.ai.ragent.infra.rerank;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.nageoffer.ai.ragent.framework.convention.RetrievedChunk;
import com.nageoffer.ai.ragent.infra.config.AIModelProperties;
import com.nageoffer.ai.ragent.infra.enums.ModelCapability;
import com.nageoffer.ai.ragent.infra.enums.ModelProvider;
import com.nageoffer.ai.ragent.infra.http.HttpMediaTypes;
import com.nageoffer.ai.ragent.infra.http.HttpResponseHelper;
import com.nageoffer.ai.ragent.infra.http.ModelClientErrorType;
import com.nageoffer.ai.ragent.infra.http.ModelClientException;
import com.nageoffer.ai.ragent.infra.http.ModelUrlResolver;
import com.nageoffer.ai.ragent.infra.model.ModelTarget;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * 硅基流动重排接口：请求字段及响应 results 均位于 JSON 顶层。
 */
@Service
public class SiliconFlowRerankClient implements RerankClient {

    private final OkHttpClient httpClient;

    public SiliconFlowRerankClient(@Qualifier("syncHttpClient") OkHttpClient httpClient) {
        this.httpClient = httpClient;
    }

    @Override
    public String provider() {
        return ModelProvider.SILICON_FLOW.getId();
    }

    @Override
    public List<RetrievedChunk> rerank(String query, List<RetrievedChunk> candidates, int topN, ModelTarget target) {
        if (candidates == null || candidates.isEmpty()) {
            return List.of();
        }

        List<RetrievedChunk> documents = new ArrayList<>(candidates.size());
        Set<String> seen = new HashSet<>();
        for (RetrievedChunk candidate : candidates) {
            if (seen.add(candidate.getId())) {
                documents.add(candidate);
            }
        }
        if (topN <= 0) {
            return documents;
        }
        int limit = Math.min(topN, documents.size());

        AIModelProperties.ProviderConfig provider = HttpResponseHelper.requireProvider(target, provider());
        HttpResponseHelper.requireApiKey(provider, provider());

        JsonObject body = new JsonObject();
        body.addProperty("model", HttpResponseHelper.requireModel(target, provider()));
        body.addProperty("query", query);
        body.addProperty("top_n", limit);
        body.addProperty("return_documents", false);
        JsonArray texts = new JsonArray();
        for (RetrievedChunk document : documents) {
            texts.add(document.getText() == null ? "" : document.getText());
        }
        body.add("documents", texts);

        Request request = new Request.Builder()
                .url(ModelUrlResolver.resolveUrl(provider, target.candidate(), ModelCapability.RERANK))
                .post(RequestBody.create(body.toString(), HttpMediaTypes.JSON))
                .addHeader("Authorization", "Bearer " + provider.getApiKey())
                .build();

        JsonObject responseBody;
        try (Response response = httpClient.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new ModelClientException(
                        provider() + " rerank 请求失败: HTTP " + response.code(),
                        ModelClientErrorType.fromHttpStatus(response.code()), response.code());
            }
            responseBody = HttpResponseHelper.parseJson(response.body(), provider());
        } catch (IOException e) {
            throw new ModelClientException(provider() + " rerank 请求失败: " + e.getMessage(),
                    ModelClientErrorType.NETWORK_ERROR, null, e);
        }

        return parseResults(responseBody, documents, limit);
    }

    private List<RetrievedChunk> parseResults(JsonObject body, List<RetrievedChunk> documents, int limit) {
        if (body == null || !body.has("results") || !body.get("results").isJsonArray()) {
            throw invalidResponse("响应缺少 results 数组");
        }
        List<RetrievedChunk> reranked = new ArrayList<>(limit);
        Set<Integer> added = new HashSet<>();
        for (JsonElement element : body.getAsJsonArray("results")) {
            if (!element.isJsonObject()) {
                throw invalidResponse("结果格式错误");
            }
            JsonObject item = element.getAsJsonObject();
            int index;
            float score;
            try {
                // 精确读取整数，避免把小数索引截断后映射到错误文档。
                index = item.get("index").getAsBigDecimal().intValueExact();
                score = item.get("relevance_score").getAsFloat();
            } catch (RuntimeException e) {
                throw invalidResponse("结果缺少有效的 index 或 relevance_score");
            }
            if (index < 0 || index >= documents.size() || !Float.isFinite(score)) {
                throw invalidResponse("结果索引或相关性分数无效");
            }
            if (!added.add(index)) {
                continue;
            }
            RetrievedChunk source = documents.get(index);
            reranked.add(new RetrievedChunk(source.getId(), source.getText(), score));
            if (reranked.size() >= limit) {
                break;
            }
        }
        if (reranked.isEmpty()) {
            throw invalidResponse("results 为空");
        }
        // 与已有重排客户端一致，接口返回不足时按原检索顺序补齐。
        for (int i = 0; i < documents.size() && reranked.size() < limit; i++) {
            if (added.add(i)) {
                reranked.add(documents.get(i));
            }
        }
        return reranked;
    }

    private ModelClientException invalidResponse(String message) {
        return new ModelClientException(provider() + " rerank " + message,
                ModelClientErrorType.INVALID_RESPONSE, null);
    }
}
