import React from "react";
import { FaPrint, FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next";

// Componente de seção reutilizável
const Section = ({ title, children }: { title: React.ReactNode; children: React.ReactNode }) => (
  <section className="mb-6">
    <h2 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent print:text-black">
      {title}
    </h2>
    {children}
  </section>
);

export default function CV() {
  const { t, i18n, ready } = useTranslation("common");

  if (!ready) return null;

  // Traduções para arrays/objetos
  const educations = t("educations", { returnObjects: true }) as any[];
  const experiences = t("experiences", { returnObjects: true }) as any[];
  const projects = t("projectsSectionArr", { returnObjects: true }) as any[];
  const skills = t("skillsArr", { returnObjects: true }) as string[];
  const certifications = t("certificationsArr", { returnObjects: true }) as string[];
  const idioms = t("idiomsArr", { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 flex items-center justify-center print:bg-white print:text-black print:p-0">
      <article className="w-full max-w-3xl mx-auto bg-white/95 dark:bg-[#202531] rounded-2xl shadow-2xl border border-gray-300 px-2 sm:px-8 py-8 sm:py-12 my-8 print:rounded-none print:shadow-none print:border-0 print:bg-white transition-colors">
        
        <header className="border-b border-gray-300 pb-4 mb-4 print:border-black">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent print:text-black">
            {t("name")}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-gray-800 dark:text-gray-200 text-base mb-2 print:text-black">
            <span>{t("role")}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 text-sm text-gray-600 dark:text-gray-300 print:text-black">
            <span>{t("location")}</span>
            <span>|</span>
            <span>{t("phone")}</span>
            <span>|</span>
            <a href="mailto:amarovsjr81@gmail.com" className="underline text-teal-600 hover:text-blue-500 transition-colors">amarovsjr81@gmail.com</a>
          </div>
          <div className="flex flex-wrap gap-2 text-sm mt-1 print:text-black">
            <a href="https://www.linkedin.com/in/jrvalerio" className="underline text-teal-600 hover:text-blue-500 transition-colors" target="_blank" rel="noopener noreferrer">{t("linkedin")}</a>
            <span>|</span>
            <a href="https://github.com/jrvalerio" className="underline text-teal-600 hover:text-blue-500 transition-colors" target="_blank" rel="noopener noreferrer">{t("github")}</a>
          </div>
        </header>
        <Section title={t("profile")}>
          <p className="text-gray-800 dark:text-gray-200 print:text-black leading-relaxed prose prose-neutral max-w-none">
            {t("about.body")}
          </p>
        </Section>
        <Section title={t("education")}>
          {educations.map((edu, i) => (
            <div className="mb-2" key={i}>
              <strong>
                {edu.link ? (
                  <a href={edu.link} target="_blank" rel="noopener noreferrer" className="underline text-teal-600 hover:text-blue-500 transition-colors">{edu.title}</a>
                ) : edu.title}
              </strong>{" "}
              <span className="text-gray-500 italic">{edu.date}</span>
              <br />
              <span className="text-gray-700 dark:text-gray-300 print:text-black italic">{edu.desc}</span>
              {i < educations.length - 1 && <div className="border-t border-gray-200 my-3" />}
            </div>
          ))}
        </Section>
        <Section title={t("experience")}>
          {experiences.map((exp, i) => (
            <div className="mb-2" key={i}>
              <strong className="underline text-teal-600 hover:text-blue-500 transition-colors">{exp.title}</strong>{" "}
              <span className="text-gray-500 italic">{exp.date}</span>
              <ul className="list-disc ml-6 text-gray-800 dark:text-gray-200 print:text-black">
                {exp.bullets.map((b: string, idx: number) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
              {i < experiences.length - 1 && <div className="border-t border-gray-200 my-3" />}
            </div>
          ))}
        </Section>
        <Section title={t("projectsSection")}>
          {projects.map((proj, i) => (
            <div className="mb-2" key={i}>
              <strong>
                {proj.link ? (
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="underline text-teal-600 hover:text-blue-500 transition-colors">{proj.title}</a>
                ) : proj.title}
              </strong><br />
              <span className="italic text-gray-800 dark:text-gray-200 print:text-black">{proj.desc}</span><br />
              <span className="text-gray-600 dark:text-gray-400 print:text-black">{proj.stack}</span>
              {i < projects.length - 1 && <div className="border-t border-gray-200 my-3" />}
            </div>
          ))}
        </Section>
        <Section title={t("skills")}>
          <ul className="list-disc ml-6 text-gray-800 dark:text-gray-200">
            {skills.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </Section>
        <Section title={t("certs")}>
          <ul className="list-disc ml-6 text-gray-800 dark:text-gray-200">
            {certifications.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </Section>
        <Section title={t("idioms")}>
          <ul className="list-disc ml-6 text-gray-800 dark:text-gray-200">
            {idioms.map((l, i) => <li key={i}>{l}</li>)}
          </ul>
        </Section>
        <div className="flex justify-center mt-8 print:hidden">
          <button className="px-6 py-2 rounded bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold shadow hover:from-teal-600 hover:to-blue-700 flex items-center gap-2 transition-colors" onClick={() => window.print()}>
            <FaPrint className="mb-1" /> {t("button.print")}
          </button>
        </div>
      </article>
    </div>
  );
}
