import { useTranslation } from "react-i18next";
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub,
  FaInstagram, FaFacebook, FaSpotify, FaWhatsapp, FaLink
} from "react-icons/fa";
import { useRef } from "react";

export default function Contato() {
  const { t, ready } = useTranslation("common");
  const nomeRef = useRef<HTMLInputElement>(null);
  const sobrenomeRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  if (!ready) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nome = nomeRef.current?.value || "";
    const sobrenome = sobrenomeRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const phone = phoneRef.current?.value || "";
    const msg = msgRef.current?.value || "";
    // Monta mensagem para o WhatsApp
    const text = encodeURIComponent(
      `Nome: ${nome} ${sobrenome}\nE-mail: ${email}\nTelefone: ${phone}\nMensagem: ${msg}`
    );
    window.open(`https://wa.me/5511960757716?text=${text}`);
    // Limpar os campos do formulário
    if (nomeRef.current) nomeRef.current.value = "";
    if (sobrenomeRef.current) sobrenomeRef.current.value = "";
    if (emailRef.current) emailRef.current.value = "";
    if (phoneRef.current) phoneRef.current.value = "";
    if (msgRef.current) msgRef.current.value = "";
  }

  return (
    <main className="flex flex-col md:flex-row min-h-screen w-full justify-center items-center gap-10 px-4 md:px-16 py-12">
      {/* Formulário à esquerda */}
      <section className="flex-1 max-w-xl bg-black/60 rounded-2xl shadow-2xl p-10 flex flex-col justify-center items-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4 bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent text-center whitespace-nowrap">
          {t("contact.title")}
        </h2>
        <p className="text-lg md:text-xl font-semibold mb-8 bg-gradient-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent text-center drop-shadow">
          {t("contact.subtitle")}
        </p>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <input type="text" ref={nomeRef} placeholder={t("contact.form.firstName")} className="flex-1 px-4 py-3 rounded bg-gray-100 border border-gray-300 text-gray-900 focus:border-teal-400 outline-none placeholder:text-gray-400" />
            <input type="text" ref={sobrenomeRef} placeholder={t("contact.form.lastName")} className="flex-1 px-4 py-3 rounded bg-gray-100 border border-gray-300 text-gray-900 focus:border-teal-400 outline-none placeholder:text-gray-400" />
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <input type="email" ref={emailRef} placeholder={t("contact.form.email")} className="flex-1 px-4 py-3 rounded bg-gray-100 border border-gray-300 text-gray-900 focus:border-teal-400 outline-none placeholder:text-gray-400" />
            <input type="text" ref={phoneRef} placeholder={t("contact.form.phone")} className="flex-1 px-4 py-3 rounded bg-gray-100 border border-gray-300 text-gray-900 focus:border-teal-400 outline-none placeholder:text-gray-400" />
          </div>
          <textarea
            ref={msgRef}
            placeholder={t("contact.form.message")}
            rows={5}
            className="px-4 py-3 rounded bg-gray-100 border border-gray-300 text-gray-900 focus:border-teal-400 outline-none resize-none placeholder:text-gray-400"
          />
          <button type="submit" className="mt-2 py-3 rounded bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold shadow hover:from-teal-600 hover:to-blue-700 transition-colors text-lg">
            {t("contact.form.button")}
          </button>
        </form>
      </section>
      {/* Coluna direita com banner e contatos */}
      <div className="flex-1 flex flex-col gap-8 max-w-xl w-full">
        {/* Banner networking/chamada */}
        <section className="bg-black/60 rounded-2xl shadow-2xl p-8 flex flex-col items-center mb-0">
          <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-teal-400 to-blue-600 text-white font-bold shadow mb-3">
            Disponível para projetos freelance e parcerias!
          </span>
          <p className="text-lg md:text-xl font-semibold text-white/90 text-center max-w-lg mb-4">
            Vamos tomar um café? <span className="inline-block align-middle">👋</span> Aberto a networking, mentorias e novas ideias.<br />
            Me chama no WhatsApp ou LinkedIn!
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://wa.me/11960757716" target="_blank" rel="noopener" className="px-4 py-2 rounded bg-green-500 text-white font-bold hover:bg-green-600 transition">WhatsApp</a>
            <a href="https://www.linkedin.com/in/jrvalerio/" target="_blank" rel="noopener" className="px-4 py-2 rounded bg-blue-500 text-white font-bold hover:bg-blue-600 transition">LinkedIn</a>
          </div>
        </section>
        {/* Informações de contato + redes */}
        <aside className="bg-black/60 rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-8">
          <h3 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent text-center">
            {t("contact.infoTitle")}
          </h3>
          <div className="flex flex-col gap-3 text-lg text-white/90 w-full items-center">
            <div className="flex gap-3 items-center"><FaPhone /> <span>{t("contact.phone")}: +55 11 96075-7716</span></div>
            <div className="flex gap-3 items-center"><FaEnvelope /> <a href="mailto:amarovsjr81@gmail.com" className="underline hover:text-teal-400 transition">amarovsjr81@gmail.com</a></div>
            <div className="flex gap-3 items-center"><FaMapMarkerAlt /> <span>{t("contact.addressText")}</span></div>
          </div>
          <div className="flex flex-wrap justify-center gap-5 mt-2">
            <a href="https://linktr.ee/jrvalerio" target="_blank" rel="noopener" title="Linktree" className="text-teal-400 hover:text-blue-400 text-2xl"><FaLink /></a>
            <a href="https://wa.me/11960757716" target="_blank" rel="noopener" title="WhatsApp" className="text-green-400 hover:text-green-600 text-2xl"><FaWhatsapp /></a>
            <a href="https://www.linkedin.com/in/jrvalerio/" target="_blank" rel="noopener" title="LinkedIn" className="text-blue-400 hover:text-blue-600 text-2xl"><FaLinkedin /></a>
            <a href="https://github.com/JrValerio" target="_blank" rel="noopener" title="GitHub" className="text-gray-400 hover:text-white text-2xl"><FaGithub /></a>
            <a href="https://www.instagram.com/jrvalerioo/" target="_blank" rel="noopener" title="Instagram" className="text-pink-400 hover:text-pink-600 text-2xl"><FaInstagram /></a>
            <a href="https://www.facebook.com/amaro.junior.1447/" target="_blank" rel="noopener" title="Facebook" className="text-blue-600 hover:text-blue-800 text-2xl"><FaFacebook /></a>
            <a href="https://open.spotify.com/user/314fehp4tlratobdadchi4tot5ta" target="_blank" rel="noopener" title="Spotify" className="text-green-400 hover:text-green-600 text-2xl"><FaSpotify /></a>
          </div>
        </aside>
      </div>
    </main>
  );
}
