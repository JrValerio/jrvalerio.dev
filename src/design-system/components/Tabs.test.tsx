// @vitest-environment happy-dom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Tabs from "./Tabs";

const items = [
  { id: "a", label: "Todos", panel: <p>painel todos</p> },
  { id: "b", label: "Agentes", panel: <p>painel agentes</p> },
  { id: "c", label: "Produtos", panel: <p>painel produtos</p> },
];

describe("Tabs", () => {
  it("wires tabs and panels with ARIA and shows the first panel", () => {
    render(<Tabs label="Filtrar" items={items} />);
    const tabs = screen.getAllByRole("tab");
    expect(screen.getByRole("tablist", { name: "Filtrar" })).toBeTruthy();
    expect(tabs[0].getAttribute("aria-selected")).toBe("true");
    expect(tabs[0].tabIndex).toBe(0);
    expect(tabs[1].tabIndex).toBe(-1);
    const panel = screen.getByRole("tabpanel");
    expect(panel.textContent).toBe("painel todos");
    expect(panel.getAttribute("aria-labelledby")).toBe(tabs[0].id);
  });

  it("moves with arrow keys, wraps around and supports Home/End", async () => {
    const user = userEvent.setup();
    render(<Tabs label="Filtrar" items={items} />);
    const tabs = screen.getAllByRole("tab");
    tabs[0].focus();

    await user.keyboard("{ArrowRight}");
    expect(document.activeElement).toBe(tabs[1]);
    expect(screen.getByRole("tabpanel").textContent).toBe("painel agentes");

    await user.keyboard("{ArrowLeft}{ArrowLeft}");
    expect(document.activeElement).toBe(tabs[2]);

    await user.keyboard("{Home}");
    expect(document.activeElement).toBe(tabs[0]);
    await user.keyboard("{End}");
    expect(tabs[2].getAttribute("aria-selected")).toBe("true");
  });

  it("selects on click", async () => {
    const user = userEvent.setup();
    render(<Tabs label="Filtrar" items={items} defaultId="c" />);
    expect(screen.getByRole("tabpanel").textContent).toBe("painel produtos");
    await user.click(screen.getByRole("tab", { name: "Agentes" }));
    expect(screen.getByRole("tabpanel").textContent).toBe("painel agentes");
  });
});
