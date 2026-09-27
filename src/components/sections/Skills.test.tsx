import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { skillGroups } from "@/content/profile";
import { Skills } from "./Skills";

describe("Skills", () => {
  it("renders every group's category as a heading", () => {
    render(<Skills />);

    for (const group of skillGroups) {
      expect(
        screen.getByRole("heading", { name: group.category })
      ).toBeInTheDocument();
    }
  });

  it("renders every item of every group as a badge inside that group", () => {
    render(<Skills />);

    for (const group of skillGroups) {
      const heading = screen.getByRole("heading", { name: group.category });
      // The group's items live in the same card as its heading.
      const groupContainer = heading.closest("div") as HTMLElement;
      for (const item of group.items) {
        expect(within(groupContainer).getByText(item)).toBeInTheDocument();
      }
    }
  });
});
