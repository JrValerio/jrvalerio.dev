import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Typewriter from "typewriter-effect";

export default function Home() {
  const { t, ready } = useTranslation("common");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!ready) return null;

  const HEADER_HEIGHT = 64;
  const typewriterStrings = t(
    isMobile ? "home.heroTypewriterMobile" : "home.heroTypewriterDesktop",
    { returnObjects: true }
  ) as string[];

  return (
    <>
      <Head>
        <title>Portfólio - Amaro Júnior (JrValerio)</title>
        <meta name="description" content={t("seo.home.description")} />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Portfólio - Amaro Júnior (JrValerio)"
        />
        <meta property="og:description" content={t("seo.home.description")} />
        <meta property="og:url" content="https://jrvalerio.dev/" />
        <meta property="og:image" content="/img/perfil.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Portfólio - Amaro Júnior (JrValerio)"
        />
        <meta name="twitter:description" content={t("seo.home.description")} />
        <meta name="twitter:image" content="/img/perfil.png" />
        <link rel="canonical" href="https://jrvalerio.dev/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Amaro Júnior",
                "url": "https://jrvalerio.dev/",
                "image": "https://jrvalerio.dev/img/perfil.png",
                "sameAs": [
                  "https://www.linkedin.com/in/jrvalerio/",
                  "mailto:amarovsjr81@gmail.com"
                ],
                "jobTitle": "Full Stack Developer",
                "worksFor": {
                  "@type": "Organization",
                  "name": "Freelancer"
                }
              }
            `,
          }}
        />
      </Head>
      <section
        className="
          hidden md:flex flex-row items-center justify-center gap-x-32
          w-full max-w-7xl mx-auto min-h-[calc(100vh-64px)]
          px-0 md:px-8 py-0 md:py-0 overflow-hidden
        "
      >
        <div className="flex-1 flex flex-col justify-center items-center px-6 md:px-0 min-h-0">
          <h1
            className="
              text-3xl md:text-5xl font-bold leading-tight mb-8 max-w-xl text-center
              bg-gradient-to-r from-teal-300 via-blue-400 to-fuchsia-500
              bg-clip-text text-transparent
              animate-gradient-x
              drop-shadow-xl
            "
          >
            <Typewriter
              options={{
                strings: typewriterStrings,
                autoStart: true,
                loop: true,
                delay: 38,
                deleteSpeed: 20,
                cursor: "|",
              }}
            />
          </h1>
          <div className="h-2 w-32 bg-gradient-to-r from-teal-400 to-blue-600 rounded-full opacity-80 animate-glow mb-8" />
        </div>
        <div className="relative flex-1 flex justify-center items-center min-h-0">
          <div className="relative w-full md:w-[420px] aspect-[9/16] flex items-center justify-center pr-8 overflow-hidden">
            <Image
              src="/img/perfil2.png"
              alt="Amaro Júnior"
              fill
              className="object-cover rounded-none md:rounded-l-full shadow-2xl border-4 border-teal-400"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
      <section
        className={`
          flex md:hidden flex-col items-center justify-start
          w-full
          min-h-[calc(100vh-${HEADER_HEIGHT}px)]
          px-4 py-8 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900
        `}
      >
        <div className="w-60 h-70 mb-6 mx-auto relative">
          <Image
            src="/img/perfil2.png"
            alt="Amaro Júnior"
            fill
            className="object-cover rounded-2xl shadow-2xl border-4 border-teal-400"
            priority
            sizes="90vw"
          />
        </div>
        <div className="w-full flex flex-col items-center">
          <h1 className="
            text-2xl font-bold leading-tight drop-shadow-xl mb-6 max-w-xs text-center
            bg-gradient-to-r from-teal-300 via-blue-400 to-fuchsia-500
            bg-clip-text text-transparent animate-gradient-x
          ">
            <Typewriter
              options={{
                strings: typewriterStrings,
                autoStart: true,
                loop: true,
                delay: 38,
                deleteSpeed: 20,
                cursor: "|",
              }}
            />
          </h1>
          <div className="h-2 w-24 bg-gradient-to-r from-teal-400 to-blue-600 rounded-full opacity-80 animate-glow mb-6" />
        </div>
      </section>
    </>
  );
}
