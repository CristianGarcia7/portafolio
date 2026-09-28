import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { heroStats, languages, profile } from "@/content/profile";
import { About } from "./About";

describe("About", () => {
  it("renders the CV summary, all four stats, and both languages", () => {
    render(<About />);

    expect(screen.getByText(profile.summary)).toBeInTheDocument();

    const statItems = screen.getAllByRole("listitem");
    for (const stat of heroStats) {
      const match = statItems.find(
        (item) =>
          item.textContent?.includes(stat.value) &&
          item.textContent?.includes(stat.label)
      );
      expect(match, `expected a stat tile for "${stat.label}"`).toBeDefined();
    }

    for (const language of languages) {
      expect(
        screen.getByText(
          (_, element) =>
            element?.children.length === 0 &&
            Boolean(element.textContent?.includes(language.label)) &&
            Boolean(element.textContent?.includes(language.level))
        )
      ).toBeInTheDocument();
    }
  });
});
