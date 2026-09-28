import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { contactEmail, contactLinks } from "@/content/profile";
import { Contact } from "./Contact";

describe("Contact", () => {
  it("shows the CTA heading", () => {
    render(<Contact />);
    expect(
      screen.getByRole("heading", { name: "¿Construimos algo juntos?" })
    ).toBeInTheDocument();
  });

  it("renders a link for every contact entry with its exact href", () => {
    render(<Contact />);

    for (const link of contactLinks) {
      const anchor = screen.getByRole("link", {
        name: new RegExp(link.label, "i"),
      });
      expect(anchor).toHaveAttribute("href", link.href);
    }
  });

  it("opens every non-email contact link in a new tab with safe rel", () => {
    render(<Contact />);

    for (const link of contactLinks) {
      const anchor = screen.getByRole("link", {
        name: new RegExp(link.label, "i"),
      });

      if (link.icon === "mail") {
        expect(anchor).not.toHaveAttribute("target");
      } else {
        expect(anchor).toHaveAttribute("target", "_blank");
        const rel = anchor.getAttribute("rel") ?? "";
        expect(rel).toMatch(/noopener/);
        expect(rel).toMatch(/noreferrer/);
      }
    }
  });

  it("exposes the contacto landmark id for in-page navigation", () => {
    render(<Contact />);
    expect(document.getElementById("contacto")).not.toBeNull();
  });

  it("includes the copy-email control alongside the links", () => {
    render(<Contact />);
    expect(
      screen.getByRole("button", { name: new RegExp(contactEmail) })
    ).toBeInTheDocument();
  });
});
