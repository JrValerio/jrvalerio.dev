import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t, ready } = useTranslation("common");
  if (!ready) return null;
  return (
    <section className="flex flex-col md:flex-row items-center md:items-stretch justify-between w-full max-w-7xl mx-auto min-h-screen px-0 md:px-8 py-12 md:py-0">
      {/* Texto à esquerda */}
      <div className="flex-1 flex flex-col justify-center items-center md:items-start px-6 md:px-0 py-16 md:py-0">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-xl animate-fade-in-up mb-8 max-w-xl">
          {t("home.hero")}
        </h1>
        <div className="h-2 w-32 bg-gradient-to-r from-teal-400 to-blue-600 rounded-full opacity-80 animate-glow mb-8" />
      </div>
      {/* Foto ocupa toda lateral direita, responsivo */}
      <div className="relative flex-1 h-[300px] md:h-auto flex justify-end items-center overflow-visible">
        <div className="relative w-[100vw] md:w-[520px] h-[340px] md:h-screen flex items-center justify-end">
          <Image
            src="/img/perfil.png"
            alt="Amaro Júnior"
            fill
            className="object-contain md:object-cover rounded-none md:rounded-l-full shadow-2xl border-4 border-teal-400"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
