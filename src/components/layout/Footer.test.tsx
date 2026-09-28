import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { profile } from "@/content/profile";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("exposes the contentinfo landmark", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("shows the current year and the owner's name in the copyright line", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(
      screen.getByText(new RegExp(`${year}.*${profile.name}`))
    ).toBeInTheDocument();
  });

  it("credits Next.js", () => {
    render(<Footer />);
    expect(screen.getByText(/Hecho con Next\.js/)).toBeInTheDocument();
  });
});
