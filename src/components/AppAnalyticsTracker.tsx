"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import ScrollDepthTracker from "./ScrollDepthTracker";
import WebVitalsTracker from "./WebVitalsTracker";
import { initAnalytics } from "../lib/analytics";

export default function AppAnalyticsTracker() {
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <>
      <ScrollDepthTracker path={pathname} routeType="app" />
      <WebVitalsTracker routeType="app" />
    </>
  );
}
