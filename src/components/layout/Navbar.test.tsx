import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { navLinks, profile } from "@/content/profile";
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  it("renders the brand and every nav link", () => {
    render(<Navbar />);

    expect(
      screen.getByRole("link", { name: profile.shortName })
    ).toBeInTheDocument();

    for (const link of navLinks) {
      expect(screen.getByRole("link", { name: link.label })).toHaveAttribute(
        "href",
        link.href
      );
    }
  });

  it("toggles the mobile menu open and closed via the menu button", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const toggle = screen.getByRole("button", { name: /menú/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    const menuId = toggle.getAttribute("aria-controls");
    const mobileMenu = document.getElementById(menuId as string);
    expect(mobileMenu).not.toBeNull();
    expect(
      within(mobileMenu as HTMLElement).getByRole("link", {
        name: navLinks[0].label,
      })
    ).toBeInTheDocument();

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the mobile menu when a nav link inside it is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const toggle = screen.getByRole("button", { name: /menú/i });
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    const menuId = toggle.getAttribute("aria-controls") as string;
    const mobileMenu = document.getElementById(menuId) as HTMLElement;
    const firstMobileLink = within(mobileMenu).getByRole("link", {
      name: navLinks[0].label,
    });

    await user.click(firstMobileLink);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the mobile menu when Escape is pressed", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const toggle = screen.getByRole("button", { name: /menú/i });
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    await user.keyboard("{Escape}");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
