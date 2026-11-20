import Image from "next/image";
import {
  AvailabilityBadge,
  Button,
  ProjectCard,
  SectionTitle,
  StatList,
  Tabs,
  Tag,
  ThemeTokens,
} from "../../design-system";
import { fontVariables } from "../../design-system/fonts";
import { contactLinks, heroStats, homeCopy, homeProjects, liveProducts, tools, type HomeProject } from "../../content/home";
import { toLocalePath, type V2Locale } from "../../i18n/v2";
import ContactForm from "./ContactForm";
import LocaleSwitch from "./LocaleSwitch";
import ThemeSwitch from "./ThemeSwitch";

type Props = { locale: V2Locale; prefixed: boolean };

const container = "mx-auto w-full max-w-[1280px] px-5 md:px-10";
const sectionPad = "py-24 md:py-32";

export default function HomePage({ locale, prefixed }: Props) {
  const t = homeCopy[locale];
  const path = (p: string) => toLocalePath(p, locale, prefixed);
  const newTab = locale === "pt-BR" ? "abre em nova aba" : locale === "es" ? "se abre en una pestaña nueva" : "opens in a new tab";

  const card = (project: HomeProject, index: number) => (
    <li key={project.id} className="h-full">
      <ProjectCard
        index={index}
        title={project.title}
        summary={project.summary[locale]}
        href={project.href?.startsWith("/") ? path(project.href) : project.href}
        external={project.external}
        tags={project.tags}
        status={project.status ? t.projects.status[project.status] : undefined}
        note={project.href ? undefined : t.projects.private}
        newTabLabel={newTab}
      />
    </li>
  );

  const ordered = [...homeProjects].sort((a, b) => Number(b.featured) - Number(a.featured));
  const numbered = new Map(ordered.map((p, i) => [p.id, i + 1]));
  const grid = (items: HomeProject[]) => (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => card(p, numbered.get(p.id) ?? 0))}
    </ul>
  );

  return (
    <div className={`jv jv-page ${fontVariables} min-h-screen bg-[var(--jv-bg)] font-[family-name:var(--jv-font-body)] text-[var(--jv-fg)]`}>
      <ThemeTokens />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[var(--jv-cta-bg)] focus:px-4 focus:py-2 focus:text-[var(--jv-cta-fg)]"
      >
        {t.skip}
      </a>

      <header className="sticky top-0 z-40 border-b border-[var(--jv-border)] bg-[var(--jv-bg)]/95 backdrop-blur">
        <div className={`${container} flex min-h-[72px] flex-wrap items-center justify-between gap-x-6 gap-y-2 py-2`}>
          <a href="#inicio" className="font-[family-name:var(--jv-font-display)] text-3xl leading-none text-[var(--jv-fg)]">
            JR<span className="text-[var(--jv-accent)]">.</span>
            <span className="sr-only"> Amaro Júnior</span>
          </a>
          <nav aria-label={t.nav.label} className="order-3 w-full md:order-none md:w-auto">
            <ul className="flex gap-6 overflow-x-auto text-sm font-medium">
              <li><a className="inline-flex min-h-[44px] items-center hover:text-[var(--jv-accent)]" href="#projetos">{t.nav.projects}</a></li>
              <li><a className="inline-flex min-h-[44px] items-center hover:text-[var(--jv-accent)]" href="#sobre">{t.nav.about}</a></li>
              <li><a className="inline-flex min-h-[44px] items-center hover:text-[var(--jv-accent)]" href="#trajetoria">{t.nav.journey}</a></li>
              <li><a className="inline-flex min-h-[44px] items-center hover:text-[var(--jv-accent)]" href="#contato">{t.nav.contact}</a></li>
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <LocaleSwitch locale={locale} label={t.locale.label} />
            <ThemeSwitch label={t.theme.label} light={t.theme.light} dark={t.theme.dark} />
            <div className="hidden lg:block">
              <Button href="#contato" variant="ghost">
                {t.nav.talk} <span aria-hidden="true">↗</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main id="conteudo">
        <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden border-b border-[var(--jv-border)]">
          <p
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-[8.5rem] z-0 sm:top-[4.5rem] text-center font-[family-name:var(--jv-font-display)] text-[clamp(4.5rem,15vw,14rem)] leading-[0.86] whitespace-nowrap text-[var(--jv-word)] select-none"
          >
            JRVALERIO
          </p>
          <div className={`${container} relative z-10 flex flex-col gap-4 pt-6`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-[family-name:var(--jv-font-mono)] text-xs tracking-[0.18em] text-[var(--jv-muted)] uppercase">{t.hero.eyebrow}</p>
              <AvailabilityBadge>{t.hero.available}</AvailabilityBadge>
            </div>
          </div>
          <div className={`${container} relative z-10 grid items-end gap-10 pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_220px] lg:pt-44`}>
            <div className="flex flex-col gap-4 pb-4 lg:pb-20">
              <p className="origin-left -rotate-3 font-[family-name:var(--jv-font-script)] text-4xl text-[var(--jv-accent)]">{t.hero.hello}</p>
              <h1 id="hero-title" className="font-[family-name:var(--jv-font-display)] text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] uppercase">
                <span className="block">Amaro</span>
                {/* Extra top room so the acute accent on the Ú clears the line above. */}
                <span className="block pt-[0.2em]">
                  Júnior<span aria-hidden="true" className="text-[var(--jv-accent)]">.</span>
                </span>
              </h1>
              <p className="text-[15px] font-extrabold tracking-[0.1em] text-[var(--jv-accent)] uppercase">{t.hero.role}</p>
              <p className="max-w-[26rem] text-base leading-relaxed text-[var(--jv-muted)]">{t.hero.pitch}</p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
                <Button href="#projetos">
                  {t.hero.ctaProjects} <span aria-hidden="true">↓</span>
                </Button>
                <Button href="#processo" variant="link">{t.hero.ctaAgent}</Button>
              </div>
            </div>
            <div className="relative order-first mx-auto w-full max-w-[520px] self-end lg:order-none">
              <Image
                src="/img/hero-portrait.webp"
                alt={t.hero.portraitAlt}
                width={1200}
                height={1383}
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="h-auto w-full drop-shadow-[0_30px_60px_rgba(26,18,14,0.35)]"
              />
            </div>
            <div className="pb-12 lg:pb-20">
              <StatList
                label={t.hero.statsLabel}
                items={[
                  { value: heroStats.yearsCoding, label: t.hero.stats.years },
                  { value: heroStats.productsLive, label: t.hero.stats.products },
                  { value: heroStats.agentPullRequests, label: t.hero.stats.prs },
                ]}
              />
            </div>
          </div>
        </section>

        <section id="projetos" aria-labelledby="projetos-title" className={`${sectionPad} border-b border-[var(--jv-border)]`}>
          <div className={`${container} flex flex-col gap-12`}>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <SectionTitle id="projetos-title" eyebrow={t.projects.eyebrow}>{t.projects.title}</SectionTitle>
              <p className="max-w-sm text-[var(--jv-muted)]">{t.projects.lead}</p>
            </div>
            <Tabs
              label={t.projects.filters.label}
              items={[
                { id: "todos", label: t.projects.filters.all, panel: grid(ordered) },
                { id: "produtos", label: t.projects.filters.products, panel: grid(ordered.filter((p) => p.kind === "produto")) },
                { id: "agentes", label: t.projects.filters.agents, panel: grid(ordered.filter((p) => p.kind === "agente")) },
              ]}
            />
            <Button href={path("/v2/projetos")} variant="link" className="self-start">{t.projects.seeAll} →</Button>
          </div>
        </section>

        <section aria-labelledby="ferramentas-title" className="border-b border-[var(--jv-border)] py-16">
          <div className={`${container} flex flex-col gap-6 md:flex-row md:items-center md:gap-12`}>
            <div className="shrink-0">
              <p className="font-[family-name:var(--jv-font-mono)] text-xs tracking-[0.18em] text-[var(--jv-muted)] uppercase">{t.tools.eyebrow}</p>
              <h2 id="ferramentas-title" className="font-[family-name:var(--jv-font-display)] text-2xl uppercase">{t.tools.title}</h2>
            </div>
            <ul className="flex flex-wrap gap-x-8 gap-y-3 font-[family-name:var(--jv-font-display)] text-2xl text-[var(--jv-muted)] uppercase">
              {tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="sobre" aria-labelledby="sobre-title" className={`${sectionPad} border-b border-[var(--jv-border)]`}>
          <div className={`${container} grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]`}>
            <div className="flex flex-col gap-6">
              <SectionTitle id="sobre-title" eyebrow={t.about.eyebrow}>{t.about.title}</SectionTitle>
              {t.about.body.map((paragraph) => (
                <p key={paragraph} className="max-w-xl text-lg leading-relaxed text-[var(--jv-muted)]">{paragraph}</p>
              ))}
            </div>
            <div id="processo" className="scroll-mt-24 flex flex-col gap-6">
              <h3 className="font-[family-name:var(--jv-font-display)] text-3xl uppercase">{t.about.processTitle}</h3>
              <ol className="flex flex-col">
                {t.about.process.map((step, i) => (
                  <li key={step.title} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-[var(--jv-border)] py-5 last:border-b">
                    <span aria-hidden="true" className="font-[family-name:var(--jv-font-display)] text-3xl leading-none text-[var(--jv-accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-[var(--jv-fg)]">{step.title}</p>
                      <p className="leading-relaxed text-[var(--jv-muted)]">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="trajetoria" aria-labelledby="trajetoria-title" className={`${sectionPad} border-b border-[var(--jv-border)]`}>
          <div className={`${container} grid gap-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]`}>
            <div className="flex flex-col gap-8">
              <SectionTitle id="trajetoria-title" eyebrow={t.journey.eyebrow}>{t.journey.title}</SectionTitle>
              <div className="flex flex-col">
                {t.journey.items.map((item, i) => (
                  <details key={`${item.year}-${item.title}`} open={i === t.journey.items.length - 1} className="group border-t border-[var(--jv-border)] last:border-b">
                    <summary className="flex min-h-[64px] cursor-pointer list-none items-center gap-6 py-4 [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-[var(--jv-accent)]">
                      <span className="w-28 shrink-0 font-[family-name:var(--jv-font-mono)] text-sm text-[var(--jv-accent)]">{item.year}</span>
                      <span className="flex-1 font-bold">{item.title}</span>
                      <span aria-hidden="true" className="text-xl text-[var(--jv-muted)] transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="pb-5 pl-34 leading-relaxed text-[var(--jv-muted)] max-md:pl-0">{item.text}</p>
                  </details>
                ))}
              </div>
            </div>
            <div className="jv flex flex-col gap-6 rounded-lg bg-[var(--jv-raised)] p-8 text-[var(--jv-fg)] lg:self-start" data-jv-theme="dark">
              <h3 className="font-[family-name:var(--jv-font-display)] text-3xl uppercase">{t.journey.liveTitle}</h3>
              <ul className="flex flex-col">
                {liveProducts.map((product) => (
                  <li key={product.name} className="border-t border-[var(--jv-border)] first:border-t-0">
                    <a href={product.href} target="_blank" rel="noopener noreferrer" className="flex min-h-[52px] items-center justify-between gap-4 font-bold hover:underline">
                      {product.name}
                      <span aria-hidden="true">↗</span>
                      <span className="sr-only"> ({newTab})</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="contato" aria-labelledby="contato-title" className={sectionPad}>
          <div className={`${container} grid gap-14 lg:grid-cols-2`}>
            <div className="flex flex-col gap-6">
              <SectionTitle id="contato-title" eyebrow={t.contact.eyebrow}>{t.contact.title}</SectionTitle>
              <p className="max-w-md text-lg leading-relaxed text-[var(--jv-muted)]">{t.contact.lead}</p>
              <h3 className="sr-only">{t.contact.channels}</h3>
              <ul className="flex flex-col gap-3">
                <li><a className="inline-flex min-h-[44px] items-center gap-3 font-bold hover:text-[var(--jv-accent)]" href={`mailto:${contactLinks.email}`}><Tag>E-mail</Tag>{contactLinks.email}</a></li>
                <li><a className="inline-flex min-h-[44px] items-center gap-3 font-bold hover:text-[var(--jv-accent)]" href={contactLinks.linkedin} target="_blank" rel="noopener noreferrer"><Tag>LinkedIn</Tag>/in/jrvalerio<span className="sr-only"> ({newTab})</span></a></li>
                <li><a className="inline-flex min-h-[44px] items-center gap-3 font-bold hover:text-[var(--jv-accent)]" href={contactLinks.github} target="_blank" rel="noopener noreferrer"><Tag>GitHub</Tag>JrValerio<span className="sr-only"> ({newTab})</span></a></li>
              </ul>
            </div>
            <ContactForm copy={t.contact.form} />
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--jv-border)] py-10">
        <div className={`${container} flex flex-wrap items-center justify-between gap-4 text-sm text-[var(--jv-muted)]`}>
          <p>
            © {new Date().getFullYear()} {t.footer.rights}
          </p>
          <ul className="flex gap-6">
            <li><a className="inline-flex min-h-[44px] items-center hover:text-[var(--jv-fg)]" href={path("/v2/archive")}>{t.footer.archive}</a></li>
            <li><a className="inline-flex min-h-[44px] items-center hover:text-[var(--jv-fg)]" href={path("/v2/engineering")}>{t.footer.engineering}</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
