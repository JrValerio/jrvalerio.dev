"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SHELL_SCROLL_CONTAINER_ID = "ContentScroll";

export default function ShellScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    const container = document.getElementById(SHELL_SCROLL_CONTAINER_ID);
    if (!container) return;

    container.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
