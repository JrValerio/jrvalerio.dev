import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import { FaInstagram } from "react-icons/fa";
import "keen-slider/keen-slider.min.css";

const fotos = [
  "/img/01.jpg",
  "/img/02.jpg",
  "/img/03.jpg",
  "/img/04.jpg",
  "/img/05.jpg",
  "/img/06.jpg",
  "/img/07.jpg",
  "/img/08.jpg",
  "/img/09.jpg",
  "/img/10.jpg",
  "/img/11.jpg",
];

export default function Sobre() {
  const { t, i18n } = useTranslation("common");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: { perView: 3, spacing: 24 },
      breakpoints: {
        "(max-width: 900px)": {
          slides: { perView: 2, spacing: 16 },
        },
        "(max-width: 600px)": {
          slides: { perView: 1.2, spacing: 10 },
        },
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      renderMode: "performance",
      dragSpeed: 0.7,
    },
    [
      (slider) => {
        let timeout: NodeJS.Timeout;
        let mouseOver = false;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }

        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => slider.next(), 2500);
        }

        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });

        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  const pageUrl = "https://jrvalerio.dev/sobre";
  const imageUrl = "https://jrvalerio.dev/img/perfil2.png";
  const pageTitle = `${t("about.title")} - ${t("name") || "Amaro Junior"}`;

  const metaDesc = {
    pt: "Amaro Junior - Desenvolvedor Full Stack em Atibaia/SP. Especialista em React, Node.js, acessibilidade e solucoes de impacto social.",
    en: "Amaro Junior - Full Stack Developer based in Atibaia, Brazil. Specialist in React, Node.js, accessibility and social impact projects.",
    es: "Amaro Junior - Desarrollador Full Stack en Atibaia, Brasil. Especialista en React, Node.js, accesibilidad y proyectos de impacto social.",
  };

  const locale = (i18n.resolvedLanguage ?? i18n.language ?? "pt").split("-")[0] as "pt" | "en" | "es";
  const pageDescription = metaDesc[locale] ?? metaDesc.pt;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
        <link rel="canonical" href={pageUrl} />
      </Head>

      <section className="min-h-[80vh] bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center py-8">
        <div className="max-w-3xl mx-auto px-6 py-12 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-md border border-gray-300 dark:border-gray-800 shadow-lg mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text">
            {t("about.title")}
          </h1>
          <div className="text-gray-800 dark:text-white/90 leading-relaxed text-lg mb-6 text-justify space-y-4">
            {t("about.body")
              .split(/\n\s*\n/)
              .map((paragrafo, idx) => (
                <p key={idx}>{paragrafo.trim()}</p>
              ))}
          </div>
          <div className="flex items-center gap-4 mt-6 flex-wrap">
            <Link
              href="https://www.instagram.com/jrvalerioo/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-lg text-pink-600 dark:text-pink-400 hover:text-pink-500 dark:hover:text-pink-300"
            >
              <FaInstagram className="mr-2 text-2xl" />
              {t("about.instagram")}
            </Link>
            <Link
              href="/techs"
              className="inline-flex items-center text-lg text-teal-700 dark:text-teal-400 hover:text-blue-600 dark:hover:text-blue-400 transition underline"
            >
              <span className="mr-2">💻</span>
              {t("about.seeTechs", "Veja minha stack completa")}
            </Link>
          </div>
        </div>

        <div className="w-full flex flex-col items-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            {t("about.carouselTitle")}
          </h2>
          <div
            ref={sliderRef}
            className="keen-slider max-w-4xl min-h-[270px]"
            role="region"
            aria-label={t("about.carouselLabel", "Galeria de fotos pessoais")}
          >
            {fotos.map((foto, idx) => (
              <a
                key={idx}
                href="https://www.instagram.com/jrvalerioo/"
                target="_blank"
                rel="noopener noreferrer"
                className="keen-slider__slide relative block rounded-2xl shadow border-2 border-gray-300 dark:border-gray-700 hover:border-pink-400 overflow-hidden min-h-[240px] max-h-[260px] bg-white dark:bg-gray-800"
              >
                <Image
                  src={foto}
                  alt={t("about.photoAlt", { n: idx + 1 })}
                  fill
                  sizes="(max-width: 600px) 80vw, (max-width: 900px) 45vw, 30vw"
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </a>
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-3">
            {fotos.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full border-2 ${
                  currentSlide === idx
                    ? "bg-blue-500 border-blue-400"
                    : "bg-gray-400 dark:bg-gray-600 border-gray-300 dark:border-gray-500"
                }`}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                aria-label={t("about.dotLabel", { n: idx + 1 })}
                aria-current={currentSlide === idx ? true : undefined}
              />
            ))}
          </div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => instanceRef.current?.prev()}
              className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-3 rounded-full hover:bg-teal-100 dark:hover:bg-teal-600 transition text-2xl"
              aria-label={t("about.prev", "Anterior")}
            >
              ◀
            </button>
            <button
              onClick={() => instanceRef.current?.next()}
              className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-3 rounded-full hover:bg-teal-100 dark:hover:bg-teal-600 transition text-2xl"
              aria-label={t("about.next", "Proximo")}
            >
              ▶
            </button>
          </div>

          <span className="text-xs text-gray-600 dark:text-gray-400 mt-3">
            {t("about.carouselFooter")}
          </span>
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "pt", ["common"])),
  },
});
