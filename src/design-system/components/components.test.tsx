// @vitest-environment happy-dom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Button from "./Button";
import ProjectCard from "./ProjectCard";
import SectionTitle from "./SectionTitle";
import StatList from "./Stat";

describe("Button", () => {
  it("renders a link when href is given and a button otherwise", () => {
    render(
      <>
        <Button href="#projetos">Ver projetos</Button>
        <Button variant="ghost">Conversar</Button>
      </>,
    );
    expect(screen.getByRole("link", { name: "Ver projetos" }).getAttribute("href")).toBe("#projetos");
    const button = screen.getByRole("button", { name: "Conversar" });
    expect(button.getAttribute("type")).toBe("button");
    expect(button.className).toContain("rounded-full");
  });
});

describe("ProjectCard", () => {
  it("zero-pads the index and exposes one link named by the title", () => {
    render(<ProjectCard index={3} title="Agente DEV" summary="Resumo" href="/x" tags={["Claude", "GitHub"]} status="Em uso" />);
    expect(screen.getByText("03")).toBeTruthy();
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0].textContent).toBe("Agente DEV");
    expect(screen.getByRole("list", { name: "Stack de Agente DEV" }).children).toHaveLength(2);
  });
});

describe("ProjectCard without a link", () => {
  it("renders the title as text and shows the note", () => {
    render(<ProjectCard index={5} title="Agente OBS" summary="Resumo" tags={[]} note="Código privado" />);
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByRole("heading", { name: "Agente OBS" })).toBeTruthy();
    expect(screen.getByText("Código privado")).toBeTruthy();
  });

  it("opens external links in a new tab safely", () => {
    render(<ProjectCard index={4} title="Site" summary="Resumo" tags={[]} href="https://example.com" external />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
  });
});

describe("SectionTitle", () => {
  it("renders the heading level asked for, with a decorative dot", () => {
    render(<SectionTitle as="h3" eyebrow="Projetos">Trabalho</SectionTitle>);
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading.textContent).toBe("Trabalho.");
    expect(heading.querySelector('[aria-hidden="true"]')?.textContent).toBe(".");
  });
});

describe("StatList", () => {
  it("pairs each value with its label in a description list", () => {
    render(<StatList label="Números" items={[{ value: "4", label: "Anos programando" }]} />);
    const list = screen.getByLabelText("Números");
    expect(list.tagName).toBe("DL");
    expect(list.querySelector("dt")?.textContent).toBe("Anos programando");
    expect(list.querySelector("dd")?.textContent).toBe("4");
  });
});
