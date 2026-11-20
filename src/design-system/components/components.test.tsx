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
