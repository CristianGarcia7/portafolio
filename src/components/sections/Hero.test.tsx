import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { contactLinks, profile, terminalLog } from "@/content/profile";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("shows the person's name as the only h1 on the page", () => {
    render(<Hero />);

    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(profile.shortName);
  });

  it("points the primary CTAs at the projects and contact anchors", () => {
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
    render(<Hero />);

    const github = contactLinks.find((link) => link.icon === "github");
    expect(github).toBeDefined();
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      github?.href
    );
  });

  it("shows the profile photo with alt text and falls back to initials on load error", () => {
    render(<Hero />);

    const photo = screen.getByAltText(profile.photoAlt);
    fireEvent.error(photo);

    expect(screen.queryByAltText(profile.photoAlt)).not.toBeInTheDocument();
    expect(
      screen.getByText(profile.initials, { selector: "span,div" })
    ).toBeInTheDocument();
  });

  it("shows the full terminal log — it's always fully server-rendered, no typing state", () => {
    render(<Hero />);

    const terminal = screen.getByRole("group", { name: /terminal/i });
    for (const line of terminalLog) {
      expect(terminal).toHaveTextContent(line);
    }
  });
});
