import type { IconType } from "react-icons";
import {
  SiDocker,
  SiGithubactions,
  SiNextdotjs,
  SiPostgresql,
  SiTailwindcss,
  SiTypescript,
  SiVitest,
} from "react-icons/si";
import { FaNodeJs, FaReact } from "react-icons/fa";
import Section from "./UI/Section";

type StackItem = {
  name: string;
  icon: IconType;
  toneClass: string;
};

const stack: StackItem[] = [
  { name: "TypeScript", icon: SiTypescript, toneClass: "text-blue-400" },
  { name: "React", icon: FaReact, toneClass: "text-cyan-300" },
  { name: "Next.js", icon: SiNextdotjs, toneClass: "text-zinc-200" },
  { name: "Node.js", icon: FaNodeJs, toneClass: "text-green-400" },
  { name: "Tailwind CSS", icon: SiTailwindcss, toneClass: "text-sky-300" },
  { name: "PostgreSQL", icon: SiPostgresql, toneClass: "text-indigo-300" },
  { name: "Docker", icon: SiDocker, toneClass: "text-blue-300" },
  { name: "Vitest", icon: SiVitest, toneClass: "text-lime-300" },
  { name: "GitHub Actions", icon: SiGithubactions, toneClass: "text-violet-300" },
];

export default function Stack() {
  return (
    <Section
      id="stack"
      title="Tech Stack"
      subtitle="Base tecnica para construir produtos web modernos, escalaveis e observaveis."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((item) => {
          const Icon = item.icon;
          return (
          <div
            key={item.name}
            className="rounded-lg border border-[var(--jr-border)] bg-[var(--jr-surface)] px-4 py-3 text-sm text-[var(--jr-text)] transition-colors hover:border-[var(--jr-accent)]"
          >
            <div className="flex items-center gap-3">
              <Icon className={`h-5 w-5 ${item.toneClass}`} aria-hidden />
              <span>{item.name}</span>
            </div>
          </div>
          );
        })}
      </div>
    </Section>
  );
}
