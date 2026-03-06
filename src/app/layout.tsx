import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import AppAnalyticsTracker from "../components/AppAnalyticsTracker";
import AppThemeProvider from "../components/AppThemeProvider";
import "reactflow/dist/style.css";
import "../styles/globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jrvalerio.dev";
const defaultOgImage = `${siteUrl}/api/og?title=${encodeURIComponent(
  "Amaro Junior"
)}&subtitle=${encodeURIComponent("Portfolio V2")}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Amaro Junior | Portfolio V2",
    template: "%s | Portfolio V2",
  },
  description:
    "Portfolio em arquitetura App Router com design system minimalista e foco em performance.",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Amaro Junior | Portfolio V2",
    description:
      "Portfolio em arquitetura App Router com design system minimalista e foco em performance.",
    images: [
      {
        url: defaultOgImage,
        alt: "Amaro Junior portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amaro Junior | Portfolio V2",
    description:
      "Portfolio em arquitetura App Router com design system minimalista e foco em performance.",
    images: [defaultOgImage],
  },
  icons: {
    icon: "/img/perfil.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={geist.variable} suppressHydrationWarning>
      <body>
        <AppThemeProvider>
          <AppAnalyticsTracker />
          {children}
          <Analytics />
        </AppThemeProvider>
      </body>
    </html>
  );
}
