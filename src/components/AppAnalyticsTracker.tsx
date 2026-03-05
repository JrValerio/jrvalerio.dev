"use client";

import { usePathname } from "next/navigation";
import ScrollDepthTracker from "./ScrollDepthTracker";
import WebVitalsTracker from "./WebVitalsTracker";

export default function AppAnalyticsTracker() {
  const pathname = usePathname() ?? "/";

  return (
    <>
      <ScrollDepthTracker path={pathname} routeType="app" />
      <WebVitalsTracker routeType="app" />
    </>
  );
}
