import Section from "./UI/Section";

const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "Web Accessibility",
  "Testing (Vitest)",
  "CI/CD",
];

export default function Stack() {
  return (
    <Section
      id="stack"
      title="Tech Stack"
      subtitle="Base tecnica para construir produtos web modernos, escalaveis e observaveis."
    >
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((item) => (
          <li
            key={item}
            className="border-b border-[var(--jr-border)] py-3 text-sm text-[var(--jr-text)] transition-colors hover:border-[var(--jr-accent)]"
          >
            {item}
          </li>
        ))}
      </ul>
    </Section>
  );
}
