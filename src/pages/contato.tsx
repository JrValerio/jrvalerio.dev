import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaSpotify,
  FaWhatsapp,
  FaLink,
} from "react-icons/fa";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";

export default function Contato() {
  const { t, i18n } = useTranslation("common");
  const nomeRef = useRef<HTMLInputElement>(null);
  const sobrenomeRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);

    const templateParams = {
      name: `${nomeRef.current?.value} ${sobrenomeRef.current?.value}`,
      title: msgRef.current?.value,
      email: emailRef.current?.value,
    };

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;

      if (!serviceId || !templateId || !userId) {
        throw new Error("EmailJS environment variables are not set.");
      }

      await emailjs.send(
        serviceId as string,
        templateId as string,
        templateParams,
        { publicKey: userId as string }
      );

      toast.success(
        t("contact.toast.success", "Mensagem enviada com sucesso!")
      );
      if (nomeRef.current) nomeRef.current.value = "";
      if (sobrenomeRef.current) sobrenomeRef.current.value = "";
      if (emailRef.current) emailRef.current.value = "";
      if (phoneRef.current) phoneRef.current.value = "";
      if (msgRef.current) msgRef.current.value = "";
    } catch {
      toast.error(
        t("contact.toast.error", "Erro ao enviar. Tente novamente.")
      );
    } finally {
      setSending(false);
    }
  }

  const metaDesc = {
    pt: "Entre em contato com Amaro Júnior. Disponível para projetos, networking, parcerias e mentorias em tecnologia, desenvolvimento web, React, Node.js e mais. Respondo rápido!",
    en: "Get in touch with Amaro Júnior. Available for freelance projects, networking, partnerships, and mentoring in tech, web development, React, Node.js and more. Quick response guaranteed!",
    es: "Contacta a Amaro Júnior. Disponible para proyectos, networking, colaboraciones y mentorías en tecnología, desarrollo web, React, Node.js y más. ¡Respuesta rápida!",
  };

  return (
    <>
      <Head>
        <title>{t("contact.title")} - Amaro Júnior</title>
        <meta
          name="description"
          content={
            metaDesc[i18n.language as "pt" | "en" | "es"] || metaDesc.pt
          }
        />
        <meta
          property="og:title"
          content={`${t("contact.title")} - Amaro Júnior`}
        />
        <meta
          property="og:description"
          content={
            metaDesc[i18n.language as "pt" | "en" | "es"] || metaDesc.pt
          }
        />
        <meta
          property="og:url"
          content="https://jrvalerio.dev/contato"
        />
        <meta property="og:image" content="/img/perfil2.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${t("contact.title")} - Amaro Júnior`}
        />
        <meta
          name="twitter:description"
          content={
            metaDesc[i18n.language as "pt" | "en" | "es"] || metaDesc.pt
          }
        />
        <meta name="twitter:image" content="/img/perfil2.png" />
        <link
          rel="canonical"
          href="https://jrvalerio.dev/contato"
        />
      </Head>
      <main className="flex flex-col md:flex-row w-full justify-center items-center gap-10 px-4 md:px-16 py-8 md:py-10 bg-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors">
        <section className="flex-1 max-w-xl bg-white/90 dark:bg-black/60 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-8 md:p-10 flex flex-col justify-center items-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4 bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent text-center whitespace-nowrap">
            {t("contact.title")}
          </h2>
          <p className="text-lg md:text-xl font-semibold mb-8 bg-gradient-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent text-center drop-shadow">
            {t("contact.subtitle")}
          </p>
          <div aria-busy={sending ? "true" : "false"} className="w-full">
            <form
              className="flex flex-col gap-4 w-full"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <input
                  type="text"
                  ref={nomeRef}
                  placeholder={t("contact.form.firstName")}
                  className="flex-1 px-4 py-3 rounded bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:border-teal-400 outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors"
                  aria-label={t("contact.form.firstName")}
                  required
                />
                <input
                  type="text"
                  ref={sobrenomeRef}
                  placeholder={t("contact.form.lastName")}
                  className="flex-1 px-4 py-3 rounded bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:border-teal-400 outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors"
                  aria-label={t("contact.form.lastName")}
                  required
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <input
                  type="email"
                  ref={emailRef}
                  placeholder={t("contact.form.email")}
                  className="flex-1 px-4 py-3 rounded bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:border-teal-400 outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors"
                  aria-label={t("contact.form.email")}
                  required
                />
                <input
                  type="tel"
                  ref={phoneRef}
                  placeholder={t("contact.form.phone")}
                  className="flex-1 px-4 py-3 rounded bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:border-teal-400 outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors"
                  aria-label={t("contact.form.phone")}
                  required
                />
              </div>
              <textarea
                ref={msgRef}
                placeholder={t("contact.form.message")}
                rows={5}
                className="px-4 py-3 rounded bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:border-teal-400 outline-none resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors"
                aria-label={t("contact.form.message")}
                required
              />
              <button
                type="submit"
                className="mt-2 py-3 rounded bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold shadow hover:from-teal-600 hover:to-blue-700 transition-colors text-lg flex items-center justify-center gap-2"
                disabled={sending}
              >
                {sending ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                ) : null}
                {t("contact.form.button")}
              </button>
            </form>
          </div>
        </section>
        <div className="flex-1 flex flex-col gap-8 max-w-xl w-full">
          <section className="bg-white/90 dark:bg-black/60 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-8 flex flex-col items-center mb-0">
            <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-teal-400 to-blue-600 text-white font-bold shadow mb-3">
              {t(
                "contact.banner",
                "Disponível para projetos freelance e parcerias!"
              )}
            </span>
            <p className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white/90 text-center max-w-lg mb-4">
              {t("contact.chamada", "Vamos tomar um café?")}{" "}
              <span className="inline-block align-middle">👋</span>{" "}
              {t(
                "contact.bannerSubtitle",
                "Aberto a networking, mentorias e novas ideias. Me chama no WhatsApp ou LinkedIn!"
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://wa.me/11960757716"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded bg-green-700 text-white font-bold hover:bg-green-800 transition"
              >
                WhatsApp
              </a>
              <a
                href="https://www.linkedin.com/in/jrvalerio/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded bg-blue-700 text-white font-bold hover:bg-blue-800 transition"
              >
                LinkedIn
              </a>
            </div>
          </section>
          <aside className="bg-white/90 dark:bg-black/60 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-8">
            <h3 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent text-center">
              {t("contact.infoTitle")}
            </h3>
            <div className="flex flex-col gap-3 text-lg text-gray-800 dark:text-white/90 w-full items-center">
              <div className="flex gap-3 items-center">
                <FaPhone />{" "}
                <span>
                  {t("contact.phone")}: +55 11 96075-7716
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <FaEnvelope />{" "}
                <a
                  href="mailto:amarovsjr81@gmail.com"
                  className="underline text-teal-700 dark:text-teal-300 hover:text-teal-500 transition"
                >
                  amarovsjr81@gmail.com
                </a>
              </div>
              <div className="flex gap-3 items-center">
                <FaMapMarkerAlt />{" "}
                <span>{t("contact.addressText")}</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-5 mt-2">
              <a
                href="https://linktr.ee/jrvalerio"
                target="_blank"
                rel="noopener noreferrer"
                title="Linktree"
                className="text-teal-400 hover:text-blue-400 text-2xl"
              >
                <FaLink />
              </a>
              <a
                href="https://wa.me/11960757716"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
                className="text-green-400 hover:text-green-600 text-2xl"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://www.linkedin.com/in/jrvalerio/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="text-blue-400 hover:text-blue-600 text-2xl"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/JrValerio"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-2xl"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.instagram.com/jrvalerioo/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="text-pink-400 hover:text-pink-600 text-2xl"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/amaro.junior.1447/"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="text-blue-600 hover:text-blue-800 text-2xl"
              >
                <FaFacebook />
              </a>
              <a
                href="https://open.spotify.com/user/314fehp4tlratobdadchi4tot5ta"
                target="_blank"
                rel="noopener noreferrer"
                title="Spotify"
                className="text-green-400 hover:text-green-600 text-2xl"
              >
                <FaSpotify />
              </a>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "pt", ["common"])),
  },
});
