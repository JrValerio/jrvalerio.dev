/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          400: "oklch(79.2% 0.209 151.711)",
        },
        teal: {
          300: "oklch(85.5% 0.138 181.071)",
          400: "oklch(77.7% 0.152 181.912)",
          500: "oklch(70.4% 0.14 182.503)",
          600: "oklch(60% 0.118 184.704)",
        },
        blue: {
          400: "oklch(70.7% 0.165 254.624)",
          500: "oklch(62.3% 0.214 259.815)",
          600: "oklch(54.6% 0.245 262.881)",
          700: "oklch(48.8% 0.243 264.376)",
        },
        gray: {
          200: "oklch(92.8% 0.006 264.531)",
          300: "oklch(87.2% 0.01 258.338)",
          400: "oklch(70.7% 0.022 261.325)",
          500: "oklch(55.1% 0.027 264.364)",
          600: "oklch(44.6% 0.03 256.802)",
          700: "oklch(37.3% 0.034 259.733)",
          800: "oklch(27.8% 0.033 256.848)",
          900: "oklch(21% 0.034 264.665)",
          950: "oklch(13% 0.028 261.692)",
        },
        black: "#000",
        white: "#fff"
      },
      borderRadius: {
        '2xl': '1rem',
      },
      fontFamily: {
        sans: [
          'ui-sans-serif', 'system-ui', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'
        ],
        mono: [
          'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'
        ]
      },
      fontWeight: {
        medium: 500,
        semibold: 600,
        bold: 700
      },
      boxShadow: {
        md: "0 3px 3px rgb(0 0 0 / 0.12)",
      },
      blur: {
        md: "12px"
      },
      spacing: {
        'spacing': '0.25rem',
        'container-md': '28rem',
        'container-3xl': '48rem',
      },
      lineHeight: {
        tight: '1.25',
        relaxed: '1.625',
      },
      transitionDuration: {
        DEFAULT: '150ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    },
  },
  plugins: [],
}
