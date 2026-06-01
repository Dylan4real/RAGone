import * as React from "react";
import { Brain, Lightbulb, Send, Square } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/stores/chatStore";

export function ChatInput() {
  const [value, setValue] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);
  const isComposingRef = React.useRef(false);
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const {
    sendMessage,
    isStreaming,
    cancelGeneration,
    deepThinkingEnabled,
    setDeepThinkingEnabled,
    inputFocusKey
  } = useChatStore();

  const focusInput = React.useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.focus({ preventScroll: true });
  }, []);

  const adjustHeight = React.useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const next = Math.min(el.scrollHeight, 160);
    el.style.height = `${next}px`;
  }, []);

  React.useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  React.useEffect(() => {
    if (!inputFocusKey) return;
    focusInput();
  }, [inputFocusKey, focusInput]);

  const handleSubmit = async () => {
    if (isStreaming) {
      cancelGeneration();
      focusInput();
      return;
    }
    if (!value.trim()) return;
    const next = value;
    setValue("");
    focusInput();
    await sendMessage(next);
    focusInput();
  };

  const hasContent = value.trim().length > 0;

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "relative flex flex-col rounded-2xl border bg-canvas px-4 pt-3 pb-2 transition-all duration-200",
          isFocused
            ? "border-coral shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
            : "border-hairline hover:border-hairline"
        )}
      >
        <div className="relative">
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={deepThinkingEnabled ? "输入需要深度分析的问题..." : "输入你的问题..."}
            className="max-h-40 min-h-[44px] w-full resize-none border-0 bg-transparent px-2 pt-2 pb-2 pr-2 text-[15px] text-ink shadow-none placeholder:text-muted-claude focus-visible:ring-0"
            rows={1}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onCompositionStart={() => {
              isComposingRef.current = true;
            }}
            onCompositionEnd={() => {
              isComposingRef.current = false;
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                const nativeEvent = event.nativeEvent as KeyboardEvent;
                if (nativeEvent.isComposing || isComposingRef.current || nativeEvent.keyCode === 229) {
                  return;
                }
                event.preventDefault();
                handleSubmit();
              }
            }}
            aria-label="聊天输入框"
          />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[10px] bg-gradient-to-b from-canvas/0 via-canvas/40 to-canvas/90" />
        </div>
        <div className="relative mt-2 flex items-center">
          <button
            type="button"
            onClick={() => setDeepThinkingEnabled(!deepThinkingEnabled)}
            disabled={isStreaming}
            aria-pressed={deepThinkingEnabled}
            className={cn(
              "absolute left-0 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
              deepThinkingEnabled
                ? "border-cream-strong bg-surface-card text-coral"
                : "border-transparent bg-surface-soft text-muted-claude hover:bg-cream-strong",
              isStreaming && "cursor-not-allowed opacity-60"
            )}
          >
            <span className="inline-flex items-center gap-2">
              <Brain className={cn("h-3.5 w-3.5", deepThinkingEnabled && "text-coral")} />
              深度思考
              {deepThinkingEnabled ? (
                <span className="h-2 w-2 rounded-full bg-coral animate-pulse" />
              ) : null}
            </span>
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!hasContent && !isStreaming}
            aria-label={isStreaming ? "停止生成" : "发送消息"}
            className={cn(
              "ml-auto rounded-full p-2.5 transition-all duration-200",
              isStreaming
                ? "bg-error/10 text-error hover:bg-error/20"
                : hasContent
                  ? "bg-coral text-white hover:bg-coral-active"
                  : "cursor-not-allowed bg-surface-soft text-muted-soft"
            )}
          >
            {isStreaming ? <Square className="h-4 w-4" /> : <Send className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {deepThinkingEnabled ? (
        <p className="text-xs text-coral">
          <span className="inline-flex items-center gap-1.5">
            <Lightbulb className="h-3.5 w-3.5" />
            深度思考模式已开启，AI将进行更深入的分析推理
          </span>
        </p>
      ) : null}
      <p className="text-center text-xs text-muted-claude">
        <kbd className="rounded bg-surface-soft px-1.5 py-0.5 text-body">Enter</kbd> 发送
        <span className="px-1.5">·</span>
        <kbd className="rounded bg-surface-soft px-1.5 py-0.5 text-body">
          Shift + Enter
        </kbd>{" "}
        换行
        {isStreaming ? <span className="ml-2 animate-pulse-soft">生成中...</span> : null}
      </p>
    </div>
  );
}
