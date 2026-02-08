import type { GetStaticProps } from "next";
import { useRef } from "react";
import { FaPrint, FaDownload } from "react-icons/fa";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Head from "next/head";

const Section = ({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) => (
  <section className="mb-6">
    <h2 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent print:text-black print:bg-transparent">
      {title}
    </h2>
    {children}
  </section>
);

export default function CV() {
  const { t } = useTranslation("common");
  const pdfRef = useRef<HTMLDivElement>(null);

  const educations = t("educations", { returnObjects: true }) as any[];
  const experiences = t("experiences", { returnObjects: true }) as any[];
  const projects = t("projectsSectionArr", { returnObjects: true }) as any[];
  const skills = t("skillsArr", { returnObjects: true }) as string[];
  const certifications = t("certificationsArr", {
    returnObjects: true,
  }) as string[];
  const idioms = t("idiomsArr", { returnObjects: true }) as string[];
  const techs = t("techs.skillsList", { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 flex items-center justify-center print:bg-white print:text-black print:p-0">
      <Head>
        <title>{t("cv.title", "Currículo")} - Amaro Júnior</title>
        <meta
          name="description"
          content={t(
            "cv.description",
            "Currículo e histórico profissional de Amaro Júnior"
          )}
        />
        <meta
          property="og:title"
          content={`${t("cv.title", "Currículo")} - Amaro Júnior`}
        />
        <meta
          property="og:description"
          content={t(
            "cv.description",
            "Currículo e histórico profissional de Amaro Júnior"
          )}
        />
        <meta property="og:url" content="https://jrvalerio.dev/cv" />
        <meta property="og:image" content="/img/perfil2.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${t("cv.title", "Currículo")} - Amaro Júnior`}
        />
        <meta
          name="twitter:description"
          content={t(
            "cv.description",
            "Currículo e histórico profissional de Amaro Júnior"
          )}
        />
        <meta name="twitter:image" content="/img/perfil2.png" />
        <link rel="canonical" href="https://jrvalerio.dev/cv" />
      </Head>
      <article
        ref={pdfRef}
        className="w-full max-w-3xl mx-auto bg-white/95 dark:bg-[#202531] rounded-2xl shadow-2xl border border-gray-300 px-2 sm:px-8 py-8 sm:py-12 my-8 print:rounded-none print:shadow-none print:border-0 print:bg-white transition-colors"
      >
        <header className="border-b border-gray-300 pb-4 mb-4 print:border-black">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-teal-400 to-blue-600 bg-clip-text text-transparent print:text-black print:bg-transparent">
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
            <a
              href="mailto:amarovsjr81@gmail.com"
              className="underline text-teal-600 hover:text-blue-500 transition-colors"
            >
              amarovsjr81@gmail.com
            </a>
          </div>
          <div className="flex flex-wrap gap-2 text-sm mt-1 print:text-black">
            <a
              href="https://www.linkedin.com/in/jrvalerio"
              className="underline text-teal-600 hover:text-blue-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("linkedin")}
            </a>
            <span>|</span>
            <a
              href="https://github.com/jrvalerio"
              className="underline text-teal-600 hover:text-blue-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("github")}
            </a>
          </div>
        </header>
        <Section title={t("profileSectionTitle")}>
          <p className="text-gray-800 dark:text-gray-200 print:text-black leading-relaxed prose prose-neutral max-w-none">
            {t("profile")}
          </p>
        </Section>
        <Section title={t("techs.title")}>
          <div className="flex flex-wrap gap-2">
            {techs.map((tech, i) => (
              <span
                key={i}
                className="bg-cyan-800 text-white text-xs px-3 py-1 rounded-full mb-2 print:bg-black print:text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </Section>
        <Section title={t("education")}>
          {educations.map((edu, i) => (
            <div className="mb-2" key={i}>
              <strong>
                {edu.link ? (
                  <a
                    href={edu.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-teal-600 hover:text-blue-500 transition-colors"
                  >
                    {edu.title}
                  </a>
                ) : (
                  edu.title
                )}
              </strong>{" "}
              <span className="text-gray-500 italic">{edu.date}</span>
              <br />
              <span className="text-gray-700 dark:text-gray-300 print:text-black italic">
                {edu.desc}
              </span>
              {i < educations.length - 1 && (
                <div className="border-t border-gray-200 my-3" />
              )}
            </div>
          ))}
        </Section>
        <Section title={t("experience")}>
          {experiences.map((exp, i) => (
            <div className="mb-2" key={i}>
              <strong className="underline text-teal-600 hover:text-blue-500 transition-colors">
                {exp.title}
              </strong>{" "}
              <span className="text-gray-500 italic">{exp.date}</span>
              <ul className="list-disc ml-6 text-gray-800 dark:text-gray-200 print:text-black">
                {exp.bullets.map((b: string, idx: number) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
              {i < experiences.length - 1 && (
                <div className="border-t border-gray-200 my-3" />
              )}
            </div>
          ))}
        </Section>
        <Section title={t("projectsSection")}>
          {projects.map((proj, i) => (
            <div className="mb-2" key={i}>
              <strong>
                {proj.link ? (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-teal-600 hover:text-blue-500 transition-colors"
                  >
                    {proj.title}
                  </a>
                ) : (
                  proj.title
                )}
              </strong>
              <br />
              <span className="italic text-gray-800 dark:text-gray-200 print:text-black">
                {proj.desc}
              </span>
              <br />
              <span className="text-gray-600 dark:text-gray-400 print:text-black">
                {proj.stack}
              </span>
              {i < projects.length - 1 && (
                <div className="border-t border-gray-200 my-3" />
              )}
            </div>
          ))}
        </Section>
        <Section title={t("skills")}>
          <ul className="list-disc ml-6 text-gray-800 dark:text-gray-200">
            {skills.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </Section>
        <Section title={t("certs")}>
          <ul className="list-disc ml-6 text-gray-800 dark:text-gray-200">
            {certifications.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </Section>
        <Section title={t("idioms")}>
          <ul className="list-disc ml-6 text-gray-800 dark:text-gray-200">
            {idioms.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </Section>
        <div className="flex justify-center mt-8 print:hidden gap-4">
          <button
            className="px-6 py-2 rounded bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold shadow hover:from-teal-600 hover:to-blue-700 flex items-center gap-2 transition-colors"
            onClick={() => window.print()}
            aria-label={t("button.print", "Imprimir")}
          >
            <FaPrint className="mb-1" /> {t("button.print", "Imprimir")}
          </button>
          <button
  className="px-6 py-2 rounded bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold shadow hover:from-teal-500 hover:to-blue-600 flex items-center gap-2 transition-colors"
  onClick={async () => {
    if (pdfRef.current) {
      const canvas = await html2canvas(pdfRef.current, {
        onclone: (clonedDoc) => {
          clonedDoc.querySelectorAll("*").forEach((el) => {
            const style = clonedDoc.defaultView!.getComputedStyle(
              el as Element
            );
            const hasUnsupportedColor =
              (style.backgroundImage &&
                (style.backgroundImage.includes("oklab") ||
                  style.backgroundImage.includes("oklch"))) ||
              (style.backgroundColor &&
                (style.backgroundColor.includes("oklab") ||
                  style.backgroundColor.includes("oklch"))) ||
              (style.color &&
                (style.color.includes("oklab") ||
                  style.color.includes("oklch")));

            if (hasUnsupportedColor) {
              (el as HTMLElement).style.backgroundImage = "none";
              (el as HTMLElement).style.backgroundColor = "#ffffff";
              (el as HTMLElement).style.color = "#000000";
            }
          });
        },
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        canvas.width,
        canvas.height
      );
      pdf.save("CV-Amaro-Junior.pdf");
    }
  }}
  aria-label={t("button.download", "Baixar PDF")}
>
  <FaDownload className="mb-1" /> {t("button.download", "Baixar PDF")}
</button>

        </div>
      </article>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "pt", ["common"])),
  },
});
