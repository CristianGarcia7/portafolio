import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { projects } from "@/content/profile";
import { Projects } from "./Projects";

describe("Projects", () => {
  it("renders every project's name as a heading, in data order (featured first)", () => {
    render(<Projects />);

    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings.map((heading) => heading.textContent)).toEqual(
      projects.map((project) => project.name)
    );
  });

  it("links each public project to its exact GitHub href, opened safely in a new tab", () => {
    render(<Projects />);

    for (const project of projects.filter((p) => p.status === "public")) {
      const link = screen.getByRole("link", {
        name: `Ver ${project.name} en GitHub`,
      });
      expect(link).toHaveAttribute("href", project.href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("shows a 'Privado · En producción' badge and no link for private projects", () => {
    render(<Projects />);

    for (const project of projects.filter((p) => p.status === "private")) {
      const card = screen.getByTestId(`project-card-${project.name}`);
      expect(
        within(card).getByText("Privado · En producción")
      ).toBeInTheDocument();
      expect(within(card).queryByRole("link")).not.toBeInTheDocument();
    }
  });

  it("renders every tag of every project as a badge", () => {
    render(<Projects />);

    for (const project of projects) {
      const card = screen.getByTestId(`project-card-${project.name}`);
      for (const tag of project.tags) {
        expect(within(card).getByText(tag)).toBeInTheDocument();
      }
    }
  });

  it("links each live project to its exact site href via a 'Ver sitio' link, opened safely in a new tab", () => {
    render(<Projects />);

    const liveProjects = projects.filter((p) => p.status === "live");
    expect(liveProjects).toHaveLength(2);

    for (const project of liveProjects) {
      const link = screen.getByRole("link", {
        name: `Ver sitio de ${project.name}`,
      });
      expect(link).toHaveAttribute("href", project.href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).toHaveTextContent("Ver sitio");
    }
  });

  it("shows the production/internal badge for live projects and never renders the staging domain", () => {
    render(<Projects />);

    const liveProjects = projects.filter((p) => p.status === "live");
    expect(liveProjects).toHaveLength(2);

    for (const project of liveProjects) {
      const card = screen.getByTestId(`project-card-${project.name}`);
      expect(
        within(card).getByText(
          project.badgeLabel ?? "En producción · sitio web"
        )
      ).toBeInTheDocument();
    }

    expect(document.body.innerHTML).not.toMatch(/quadi\.io/);
  });
});
