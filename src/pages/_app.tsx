import { ThemeProvider } from "next-themes";
import { appWithTranslation } from "next-i18next";
import Layout from "../components/Layout";
import "../styles/globals.css";
import "../i18n"

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);
