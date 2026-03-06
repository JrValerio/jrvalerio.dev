"use client";

import { useEffect, useState } from "react";

type ReadingProgressProps = {
  ariaLabel: string;
};

const SHELL_SCROLL_CONTAINER_ID = "ContentScroll";

function getScrollMetrics() {
  const shellScrollContainer = document.getElementById(SHELL_SCROLL_CONTAINER_ID);

  if (shellScrollContainer) {
    return {
      target: shellScrollContainer,
      maxScroll: shellScrollContainer.scrollHeight - shellScrollContainer.clientHeight,
      scrollOffset: shellScrollContainer.scrollTop,
    };
  }

  return {
    target: window,
    maxScroll: document.documentElement.scrollHeight - window.innerHeight,
    scrollOffset: window.scrollY,
  };
}

type ScrollMetrics = ReturnType<typeof getScrollMetrics>;

export default function ReadingProgress({ ariaLabel }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const syncProgress = (metrics: ScrollMetrics) => {
      const { maxScroll, scrollOffset } = metrics;
      const nextValue = maxScroll > 0 ? Math.min(1, Math.max(0, scrollOffset / maxScroll)) : 0;
      setProgress(nextValue);
    };

    const updateProgress = () => {
      syncProgress(getScrollMetrics());
    };

    const metrics = getScrollMetrics();
    const { target } = metrics;

    syncProgress(metrics);
    target.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      target.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      className="jr-reading-progress"
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <div
        className="jr-reading-progress__bar"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
