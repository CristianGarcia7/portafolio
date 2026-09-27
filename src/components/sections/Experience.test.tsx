import { render, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { experience } from "@/content/profile";
import { Experience } from "./Experience";

describe("Experience", () => {
  it("renders every role, company, and period inside a semantic <ol> timeline, one <li> per entry in data order", () => {
    const { container } = render(<Experience />);

    const timeline = container.querySelector("ol");
    expect(timeline, "expected an <ol> timeline of experience entries").not
      .toBeNull();

    const entryEls = Array.from(
      (timeline as HTMLOListElement).querySelectorAll(":scope > li")
    );
    expect(entryEls).toHaveLength(experience.length);

    experience.forEach((item, index) => {
      const entry = within(entryEls[index] as HTMLElement);
      expect(entry.getByText(item.role)).toBeInTheDocument();
      expect(entry.getByText(item.company)).toBeInTheDocument();
      expect(entry.getByText(item.period)).toBeInTheDocument();
    });
  });

  it("renders every bullet of every role as a list item, scoped to its own entry", () => {
    const { container } = render(<Experience />);

    const timeline = container.querySelector("ol") as HTMLOListElement;
    const entryEls = Array.from(timeline.querySelectorAll(":scope > li"));

    experience.forEach((item, index) => {
      const entry = within(entryEls[index] as HTMLElement);
      for (const bullet of item.bullets) {
        expect(entry.getByText(bullet).closest("li")).not.toBeNull();
      }
    });
  });

  it("marks the current role with an explicit 'Actual' label that no other role has", () => {
    const { container } = render(<Experience />);

    const timeline = container.querySelector("ol") as HTMLOListElement;
    const entryEls = Array.from(timeline.querySelectorAll(":scope > li"));

    const currentIndex = experience.findIndex((item) =>
      item.period.includes("Actualidad")
    );
    expect(
      currentIndex,
      "fixture must include a current role"
    ).toBeGreaterThanOrEqual(0);

    experience.forEach((item, index) => {
      const entry = within(entryEls[index] as HTMLElement);
      if (index === currentIndex) {
        expect(entry.getByText("Actual", { exact: true })).toBeInTheDocument();
      } else {
        expect(
          entry.queryByText("Actual", { exact: true })
        ).not.toBeInTheDocument();
      }
    });
  });
});
