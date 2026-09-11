# 仓库贡献指南

## 项目结构与模块划分

Ragent 的后端使用 Java 17 和 Spring Boot，前端使用 React 和 TypeScript。

- 后端 Maven 模块：`framework`（公共基础设施）、`infra-ai`（模型接入）、`system`（用户与审计）、`rag`（数据入库与检索）、`agent`（智能体执行）和 `mcp-server`（独立工具服务）。
- `bootstrap` 仅负责应用启动与配置，业务逻辑应放在对应功能模块中。
- Java 源码位于各模块的 `src/main/java`；测试代码和测试数据分别位于 `src/test/java`、`src/test/resources`。
- `frontend/src` 按职责划分为 `pages`、`components`、`hooks`、`services` 和 `stores` 等目录。
- `resources` 存放数据库脚本、Docker 配置和初始化数据；`docs` 与 `assets` 存放文档和图片。

## 构建、测试与开发命令

后端命令在仓库根目录执行。Unix 使用 `./mvnw`，Windows 使用 `.\mvnw.cmd`。

- `./mvnw clean package`：编译各模块、运行测试并打包。
- `./mvnw test`：运行后端测试套件。
- `./mvnw -pl rag -am test`：测试 `rag` 及其依赖的仓库内模块。
- 先执行 `./mvnw install -DskipTests`，再执行 `./mvnw -pl bootstrap spring-boot:run`：将模块安装到本地 Maven 仓库并启动后端。
- 在 `frontend` 中执行 `npm ci` 安装依赖，再执行 `npm run dev` 启动 Vite 开发服务；`npm run build` 生成生产构建产物。
- `npm run lint` 检查前端代码；`npm run format` 使用 Prettier 格式化代码。

## 代码风格与命名约定

Java 使用四空格缩进，类名采用 PascalCase，方法名采用 camelCase，常量采用 UPPER_SNAKE_CASE。在 `com.nageoffer.ai.ragent` 包下沿用 `Controller`、`ServiceImpl`、`Mapper`、`DO`、`VO` 和 `Request` 等命名后缀。

前端 Prettier 配置为两空格缩进、双引号、保留分号、不使用尾随逗号，目标行宽为 100 字符。遵循 ESLint 规则和相邻组件的代码约定。Maven Spotless 会在编译阶段应用 Java 版权头，请保留这些声明。

## 测试指南

后端通过 Spring Boot 测试依赖使用 JUnit Jupiter 和 Mockito。测试类以 `Test` 结尾，包结构与被测代码保持一致。行为变更应补充回归测试；当前未配置数值化的覆盖率门槛。外部服务测试应保留运行条件，例如 `YouComSearchMcpExecutorLiveTest` 需要设置 `YDC_API_KEY`。前端尚无测试脚本，提交前应执行 lint 和 build，并手动验证受影响的流程。

## 提交与 Pull Request 规范

沿用 Git 历史中的带作用域 Conventional Commits 格式，例如 `fix(initializer): ...` 或 `feat(agent): ...`。每次提交聚焦单一变更。PR 应说明行为变化、关联相关 issue、列出验证结果；涉及界面调整时附上截图。

## 安全与配置

通过 `bootstrap/src/main/resources/application.yaml` 和环境变量覆盖项配置本地服务，不要提交凭据。保留初始化数据的原始字节及 `.gitattributes` 规则：对 `resources/initializer/enterprise-knowledge-base` 下的文件转换换行符会导致校验和验证失败。
