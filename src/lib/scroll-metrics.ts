export const SHELL_SCROLL_CONTAINER_ID = "ContentScroll";

export type ScrollTarget = Window | HTMLElement;

export type ScrollMetrics = {
  target: ScrollTarget;
  maxScroll: number;
  scrollOffset: number;
  root: HTMLElement | null;
};

export function getScrollMetrics(): ScrollMetrics {
  const shellScrollContainer = document.getElementById(
    SHELL_SCROLL_CONTAINER_ID
  ) as HTMLElement | null;

  if (shellScrollContainer) {
    return {
      target: shellScrollContainer,
      maxScroll: shellScrollContainer.scrollHeight - shellScrollContainer.clientHeight,
      scrollOffset: shellScrollContainer.scrollTop,
      root: shellScrollContainer,
    };
  }

  return {
    target: window,
    maxScroll: document.documentElement.scrollHeight - window.innerHeight,
    scrollOffset: window.scrollY,
    root: null,
  };
}
