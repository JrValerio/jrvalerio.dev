/**
 * Design tokens for the 2026 redesign.
 *
 * The palette is the six colours Amaro chose. Themes map them to semantic
 * roles; components only ever read the CSS variables generated from
 * `themes`, never the raw palette.
 */
export const palette = {
  ink: "#1A120E",
  cocoa: "#3A2418",
  walnut: "#6B4A2E",
  tan: "#A88462",
  sand: "#D5C4AE",
  graphite: "#4A4A46",
} as const;

export type PaletteName = keyof typeof palette;

export const themeRoles = [
  "bg",
  "raised",
  "fg",
  "muted",
  "accent",
  "word",
  "border",
  "neutral",
  "ctaBg",
  "ctaFg",
  "onAccent",
] as const;

export type ThemeRole = (typeof themeRoles)[number];
export type Theme = Record<ThemeRole, string>;
export type ThemeName = "dark" | "light";

export const themes: Record<ThemeName, Theme> = {
  dark: {
    bg: palette.ink,
    raised: palette.cocoa,
    fg: palette.sand,
    muted: palette.tan,
    accent: palette.tan,
    word: palette.walnut,
    border: "rgba(213, 196, 174, 0.14)",
    neutral: palette.graphite,
    ctaBg: palette.sand,
    ctaFg: palette.ink,
    onAccent: palette.ink,
  },
  light: {
    bg: palette.sand,
    raised: palette.sand,
    fg: palette.ink,
    muted: palette.cocoa,
    accent: palette.walnut,
    word: palette.tan,
    border: "rgba(26, 18, 14, 0.16)",
    neutral: palette.graphite,
    ctaBg: palette.ink,
    ctaFg: palette.sand,
    onAccent: palette.sand,
  },
};

/**
 * Text/background pairs the components actually render. Every pair must
 * reach WCAG 2.2 AA for normal text (4.5:1); the token tests enforce it.
 */
export const textPairs: ReadonlyArray<{
  text: ThemeRole;
  on: ThemeRole;
  usage: string;
}> = [
  { text: "fg", on: "bg", usage: "body and headings" },
  { text: "muted", on: "bg", usage: "secondary copy, meta" },
  { text: "accent", on: "bg", usage: "role line, numbers, links" },
  { text: "fg", on: "raised", usage: "copy inside raised panels" },
  { text: "ctaFg", on: "ctaBg", usage: "primary button" },
  { text: "onAccent", on: "accent", usage: "tags, cursor labels" },
];

export const fontVars = {
  display: "--jv-font-display",
  body: "--jv-font-body",
  script: "--jv-font-script",
  mono: "--jv-font-mono",
} as const;

const cssName = (role: ThemeRole) =>
  `--jv-${role.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`;

export function themeToCss(theme: Theme): string {
  return themeRoles.map((role) => `${cssName(role)}: ${theme[role]};`).join(" ");
}

/**
 * Light is the default (it follows the site's `system` theme start); the
 * `.dark` class set by next-themes switches the scope to dark.
 */
export function tokensStylesheet(): string {
  return [
    `.jv { ${themeToCss(themes.light)} color-scheme: light; }`,
    `.dark .jv, .jv[data-jv-theme="dark"] { ${themeToCss(themes.dark)} color-scheme: dark; }`,
    `.jv[data-jv-theme="light"] { ${themeToCss(themes.light)} color-scheme: light; }`,
  ].join("\n");
}
