// @vitest-environment happy-dom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ShellHeaderNav from "./shell-header-nav";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={String(href)} {...props}>
      {children}
    </a>
  ),
}));

// Mock lucide-react icons to avoid SVG rendering overhead in tests
vi.mock("lucide-react", () => ({
  Menu: () => <span data-testid="icon-menu" />,
  X: () => <span data-testid="icon-close" />,
  Search: () => <span data-testid="icon-search" />,
}));

import { usePathname } from "next/navigation";
const mockPathname = vi.mocked(usePathname);

const NAV_LINKS = [
  { href: "/v2", label: "Home" },
  { href: "/v2/projects", label: "Projects" },
  { href: "/v2/about", label: "About" },
];

const DEFAULT_PROPS = {
  navAriaLabel: "Main navigation",
  navLinks: NAV_LINKS,
  openMenuLabel: "Open menu",
  closeMenuLabel: "Close menu",
  searchLabel: "Search",
};

// Both desktop and mobile navs render the same links.
// Helper checks that every rendered link with the given name is (or is not) active.
function expectAllLinksActive(name: string, active: boolean) {
  const links = screen.getAllByRole("link", { name });
  expect(links.length).toBeGreaterThan(0);
  for (const link of links) {
    if (active) {
      expect(link).toHaveAttribute("aria-current", "page");
    } else {
      expect(link).not.toHaveAttribute("aria-current");
    }
  }
}

describe("ShellHeaderNav — active link (isActiveLink)", () => {
  it("marks the home link active on exact home route", () => {
    mockPathname.mockReturnValue("/v2");
    render(<ShellHeaderNav {...DEFAULT_PROPS} />);
    expectAllLinksActive("Home", true);
    expectAllLinksActive("Projects", false);
    expectAllLinksActive("About", false);
  });

  it("does not mark home link active on a sub-page", () => {
    mockPathname.mockReturnValue("/v2/projects");
    render(<ShellHeaderNav {...DEFAULT_PROPS} />);
    expectAllLinksActive("Home", false);
    expectAllLinksActive("Projects", true);
  });

  it("marks a section link active on an exact match", () => {
    mockPathname.mockReturnValue("/v2/about");
    render(<ShellHeaderNav {...DEFAULT_PROPS} />);
    expectAllLinksActive("About", true);
    expectAllLinksActive("Home", false);
  });

  it("marks a section link active on a nested child route (prefix match)", () => {
    mockPathname.mockReturnValue("/v2/projects/ecovoz");
    render(<ShellHeaderNav {...DEFAULT_PROPS} />);
    expectAllLinksActive("Projects", true);
    expectAllLinksActive("Home", false);
  });

  it("normalizes trailing slashes before comparing", () => {
    mockPathname.mockReturnValue("/v2/about/");
    render(<ShellHeaderNav {...DEFAULT_PROPS} />);
    expectAllLinksActive("About", true);
  });

  it("does not mark home active when the route merely starts with '/v2'", () => {
    // /v2/projects starts with /v2 but home is exact-only
    mockPathname.mockReturnValue("/v2/projects/ecovoz");
    render(<ShellHeaderNav {...DEFAULT_PROPS} />);
    expectAllLinksActive("Home", false);
  });
});

describe("ShellHeaderNav — mobile menu toggle", () => {
  it("starts with the menu closed", () => {
    mockPathname.mockReturnValue("/v2");
    render(<ShellHeaderNav {...DEFAULT_PROPS} />);
    expect(screen.getByRole("button", { name: DEFAULT_PROPS.openMenuLabel })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("opens the menu when the toggle button is clicked", async () => {
    const user = userEvent.setup();
    mockPathname.mockReturnValue("/v2");
    render(<ShellHeaderNav {...DEFAULT_PROPS} />);
    await user.click(screen.getByRole("button", { name: DEFAULT_PROPS.openMenuLabel }));
    expect(screen.getByRole("button", { name: DEFAULT_PROPS.closeMenuLabel })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("closes the menu when the toggle button is clicked again", async () => {
    const user = userEvent.setup();
    mockPathname.mockReturnValue("/v2");
    render(<ShellHeaderNav {...DEFAULT_PROPS} />);
    const button = screen.getByRole("button", { name: DEFAULT_PROPS.openMenuLabel });
    await user.click(button);
    await user.click(screen.getByRole("button", { name: DEFAULT_PROPS.closeMenuLabel }));
    expect(screen.getByRole("button", { name: DEFAULT_PROPS.openMenuLabel })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("closes the menu when Escape is pressed", async () => {
    const user = userEvent.setup();
    mockPathname.mockReturnValue("/v2");
    render(<ShellHeaderNav {...DEFAULT_PROPS} />);
    await user.click(screen.getByRole("button", { name: DEFAULT_PROPS.openMenuLabel }));
    await user.keyboard("{Escape}");
    expect(screen.getByRole("button", { name: DEFAULT_PROPS.openMenuLabel })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});

describe("ShellHeaderNav — accessibility", () => {
  it("nav element has a descriptive aria-label", () => {
    mockPathname.mockReturnValue("/v2");
    render(<ShellHeaderNav {...DEFAULT_PROPS} />);
    const navs = screen.getAllByRole("navigation", { name: DEFAULT_PROPS.navAriaLabel });
    expect(navs.length).toBeGreaterThan(0);
  });

  it("mobile panel is controlled by the toggle button via aria-controls", () => {
    mockPathname.mockReturnValue("/v2");
    render(<ShellHeaderNav {...DEFAULT_PROPS} />);
    const button = screen.getByRole("button", { name: DEFAULT_PROPS.openMenuLabel });
    expect(button).toHaveAttribute("aria-controls", "jr-mobile-nav");
    expect(document.getElementById("jr-mobile-nav")).toBeInTheDocument();
  });
});
