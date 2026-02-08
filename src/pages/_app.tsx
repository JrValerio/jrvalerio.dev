import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import { appWithTranslation } from "next-i18next";
import { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import "../styles/globals.css";
import nextI18NextConfig from "../../next-i18next.config";

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Head>
        <link rel="icon" href="/img/perfil.png" />
      </Head>
      <Toaster
        position="top-center"
        toastOptions={{ style: { zIndex: 999999 } }}
      />
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
