import { describe, expect, it } from "vitest";
import {
  certifications,
  contactEmail,
  contactLinks,
  heroStats,
  navLinks,
  projects,
} from "./profile";

describe("profile content invariants", () => {
  it("keeps certifications faithful to the CV (no invented issuers)", () => {
    expect(certifications).toEqual([
      { title: "Programación con JavaScript", issuer: "Meta", year: "2025" },
      { title: "JavaScript Interactivo", year: "2024" },
      { title: "SQL Interactivo", year: "2024" },
    ]);
  });

  it("only shows the approved hero stats", () => {
    expect(heroStats.map((s) => `${s.value} ${s.label}`)).toEqual([
      "3 centros SENA en producción",
      "47 tests unitarios",
      "1.5 años de experiencia",
      "3 proveedores de IA integrados",
    ]);
  });

  it("uses a single, valid contact email for the mailto link", () => {
    expect(contactEmail).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const mail = contactLinks.find((link) => link.icon === "mail");
    expect(mail?.href).toBe(`mailto:${contactEmail}`);
  });

  it("points GitHub links at the real account", () => {
    const github = contactLinks.find((link) => link.icon === "github");
    expect(github?.href).toBe("https://github.com/CristianGarcia7");
  });

  it("points LinkedIn at the owner-provided profile", () => {
    const linkedin = contactLinks.find((link) => link.icon === "linkedin");
    expect(linkedin?.href).toBe(
      "https://www.linkedin.com/in/cristian-garcia-developer/"
    );
  });

  it("never publishes the reference contact's phone number", () => {
    const serialized = JSON.stringify({ contactLinks, projects });
    expect(serialized).not.toMatch(/310\s?764\s?5964/);
  });

  it("links public projects to their repo and hides private repos", () => {
    for (const project of projects) {
      if (project.status === "public") {
        expect(project.href).toMatch(
          /^https:\/\/github\.com\/CristianGarcia7\/[\w.-]+$/,
        );
      } else if (project.status === "private") {
        expect(project.href).toBeUndefined();
      }
    }
  });

  it("adds the Darnel and Tracker Focus live projects with an https href and never the staging domain", () => {
    const liveProjects = projects.filter((p) => p.status === "live");
    expect(liveProjects).toHaveLength(2);

    const darnel = projects.find((p) => p.name === "Darnel — sitio corporativo");
    expect(darnel?.status).toBe("live");
    expect(darnel?.href).toBe("https://www.darnelgroup.com");

    const trackerFocus = projects.find((p) => p.name === "Tracker Focus");
    expect(trackerFocus?.status).toBe("live");
    expect(trackerFocus?.href).toBe("https://focus-ocx.online");

    for (const project of projects) {
      if (project.status === "live") {
        expect(project.href).toMatch(/^https:\/\//);
      }
    }

    const serialized = JSON.stringify({ contactLinks, projects });
    expect(serialized).not.toMatch(/quadi\.io/);
  });

  it("lists featured projects before the rest", () => {
    const firstNonFeatured = projects.findIndex((p) => !p.featured);
    const lastFeatured = projects.findLastIndex((p) => p.featured);
    expect(lastFeatured).toBeLessThan(firstNonFeatured);
  });

  it("uses unique in-page anchors for navigation", () => {
    const hrefs = navLinks.map((link) => link.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    for (const href of hrefs) expect(href).toMatch(/^#[a-z-]+$/);
  });
});
