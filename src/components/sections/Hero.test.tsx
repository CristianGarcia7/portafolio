import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useReducedMotion } from "motion/react";
import { contactLinks, profile, terminalLog } from "@/content/profile";
import { Hero } from "./Hero";

vi.mock("motion/react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("motion/react")>();
  return {
    ...actual,
    useReducedMotion: vi.fn(),
  };
});

const mockedUseReducedMotion = vi.mocked(useReducedMotion);

describe("Hero", () => {
  it("shows the person's name as the only h1 on the page", () => {
    mockedUseReducedMotion.mockReturnValue(true);
    render(<Hero />);

    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(profile.shortName);
  });

  it("points the primary CTAs at the projects and contact anchors", () => {
    mockedUseReducedMotion.mockReturnValue(true);
    render(<Hero />);

    expect(screen.getByRole("link", { name: /proyectos/i })).toHaveAttribute(
      "href",
      "#proyectos"
    );
    expect(screen.getByRole("link", { name: /^contacto$/i })).toHaveAttribute(
      "href",
      "#contacto"
    );
  });

  it("links to GitHub using the contact link declared in the profile", () => {
    mockedUseReducedMotion.mockReturnValue(true);
    render(<Hero />);

    const github = contactLinks.find((link) => link.icon === "github");
    expect(github).toBeDefined();
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      github?.href
    );
  });

  it("shows the profile photo with alt text and falls back to initials on load error", () => {
    mockedUseReducedMotion.mockReturnValue(true);
    render(<Hero />);

    const photo = screen.getByAltText(profile.photoAlt);
    fireEvent.error(photo);

    expect(screen.queryByAltText(profile.photoAlt)).not.toBeInTheDocument();
    expect(
      screen.getByText(profile.initials, { selector: "span,div" })
    ).toBeInTheDocument();
  });

  it("shows the full terminal log immediately when reduced motion is preferred", () => {
    mockedUseReducedMotion.mockReturnValue(true);
    render(<Hero />);

    const terminal = screen.getByRole("group", { name: /terminal/i });
    for (const line of terminalLog) {
      expect(terminal).toHaveTextContent(line);
    }
  });
});
