import React, { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useKeenSlider } from "keen-slider/react";
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
  const { t, ready } = useTranslation("common");
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
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
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
    created(s) {
      setCurrentSlide(s.track.details.rel);
    },
    renderMode: "performance",
    dragSpeed: 0.7,
  }, [
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
    }
  ]);

  useEffect(() => {
    setMounted(true);
    if (ready) {
      document.title = t("pageTitles.about");
    }
  }, [ready]);

  if (!mounted || !ready) return null;

  return (
    <section className="min-h-[80vh] bg-gray-900 flex flex-col items-center justify-center py-8">
      <div className="max-w-3xl mx-auto px-6 py-12 rounded-2xl bg-white/5 backdrop-blur-md border border-gray-800 shadow-lg mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text">
          {t("about.title")}
        </h1>
        <p className="text-white/90 leading-relaxed text-lg mb-6">{t("about.body")}</p>
        <div className="flex items-center gap-4 mt-6">
          <Link
            href="https://www.instagram.com/jrvalerioo/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-lg text-pink-400 hover:text-pink-300"
          >
            <FaInstagram className="mr-2 text-2xl" />
            {t("about.instagram")}
          </Link>
        </div>
      </div>

      <div className="w-full flex flex-col items-center">
        <h2 className="text-lg font-semibold text-white mb-2">
          {t("about.carouselTitle")}
        </h2>
        <div ref={sliderRef} className="keen-slider max-w-4xl min-h-[270px]">
          {fotos.map((foto, idx) => (
            <a
              key={idx}
              href="https://www.instagram.com/jrvalerioo/"
              target="_blank"
              rel="noopener noreferrer"
              className="keen-slider__slide block rounded-2xl shadow border-2 border-gray-700 hover:border-pink-400 overflow-hidden min-h-[240px] max-h-[260px] bg-gray-800"
            >
              <img
                src={foto}
                alt={`Foto pessoal ${idx + 1}`}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
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
                  : "bg-gray-600 border-gray-500"
              }`}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              aria-label={t("about.dotLabel", { n: idx + 1 })}
            />
          ))}
        </div>

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => instanceRef.current?.prev()}
            className="bg-gray-800 text-white p-3 rounded-full hover:bg-teal-600 transition text-2xl"
            aria-label={t("about.prev")}
          >
            ◀
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="bg-gray-800 text-white p-3 rounded-full hover:bg-teal-600 transition text-2xl"
            aria-label={t("about.next")}
          >
            ▶
          </button>
        </div>
        <span className="text-xs text-gray-400 mt-3">
          {t("about.carouselFooter")}
        </span>
      </div>
    </section>
  );
}
