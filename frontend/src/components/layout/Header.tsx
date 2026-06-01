import * as React from "react";
import { Github, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useChatStore } from "@/stores/chatStore";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const { currentSessionId, sessions } = useChatStore();
  const [starCount, setStarCount] = React.useState<number | null>(null);
  const currentSession = React.useMemo(
    () => sessions.find((session) => session.id === currentSessionId),
    [sessions, currentSessionId]
  );

  React.useEffect(() => {
    let active = true;
    fetch("https://api.github.com/repos/nageoffer/ragent")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active) return;
        const count = typeof data?.stargazers_count === "number" ? data.stargazers_count : null;
        setStarCount(count);
      })
      .catch(() => {
        if (active) {
          setStarCount(null);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const starLabel = React.useMemo(() => {
    if (starCount === null) return "--";
    if (starCount < 1000) return String(starCount);
    const rounded = Math.round((starCount / 1000) * 10) / 10;
    const text = String(rounded).replace(/\.0$/, "");
    return `${text}k`;
  }, [starCount]);

  return (
    <header className="sticky top-0 z-20 bg-canvas">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            aria-label="切换侧边栏"
            className="text-muted-claude hover:bg-surface-soft lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <p className="text-base font-medium text-ink">
            {currentSession?.title || "新对话"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/nageoffer/ragent"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl border border-hairline px-3 py-1.5 text-sm text-body transition hover:bg-surface-soft hover:text-ink"
            aria-label="打开 GitHub 仓库"
          >
            <Github className="h-4 w-4" />
            <span className="font-medium">Star</span>
            <span className="rounded-full bg-surface-soft px-2 py-0.5 text-xs text-body">
              {starLabel}
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
