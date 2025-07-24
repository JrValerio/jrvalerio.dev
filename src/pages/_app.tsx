import { ThemeProvider } from "next-themes";
import { appWithTranslation } from "next-i18next";
import Layout from "../components/Layout";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import "../i18n";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Toaster
        position="top-center"
        toastOptions={{
          style: { zIndex: 999999 },
        }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);
