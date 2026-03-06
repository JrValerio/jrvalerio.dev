"use client";

import { useEffect } from "react";

const SHELL_CONTAINER_ID = "Content";
const SHELL_SCROLL_CONTAINER_ID = "ContentScroll";

export default function ShellScrollShadow() {
  useEffect(() => {
    const shellContainer = document.getElementById(SHELL_CONTAINER_ID);
    const scrollContainer = document.getElementById(SHELL_SCROLL_CONTAINER_ID);

    if (!shellContainer || !scrollContainer) return;

    const syncScrollState = () => {
      shellContainer.dataset.scrolled = scrollContainer.scrollTop > 8 ? "true" : "false";
    };

    syncScrollState();
    scrollContainer.addEventListener("scroll", syncScrollState, { passive: true });

    return () => {
      scrollContainer.removeEventListener("scroll", syncScrollState);
      delete shellContainer.dataset.scrolled;
    };
  }, []);

  return null;
}
