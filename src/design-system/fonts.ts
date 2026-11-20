import { Anton, Caveat, JetBrains_Mono, Manrope } from "next/font/google";

export const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--jv-font-display",
  display: "swap",
});

export const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--jv-font-body",
  display: "swap",
});

export const script = Caveat({
  subsets: ["latin"],
  weight: "600",
  variable: "--jv-font-script",
  display: "swap",
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "500",
  variable: "--jv-font-mono",
  display: "swap",
});

/** Class list that exposes every font variable to a subtree. */
export const fontVariables = [display, body, script, mono].map((f) => f.variable).join(" ");
