import { renderToString } from "react-dom/server";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Reveal } from "./Reveal";

describe("Reveal", () => {
  it("renders children with the reveal class", () => {
    render(
      <Reveal>
        <p>Contenido</p>
      </Reveal>
    );

    const wrapper = screen.getByText("Contenido").parentElement;
    expect(wrapper).toHaveClass("reveal");
  });

  it("forwards an extra className alongside the reveal class", () => {
    render(
      <Reveal className="extra-class">
        <p>Contenido</p>
      </Reveal>
    );

    const wrapper = screen.getByText("Contenido").parentElement;
    expect(wrapper).toHaveClass("reveal");
    expect(wrapper).toHaveClass("extra-class");
  });

  it("is fully server-renderable, with content visible and no inline hidden style", () => {
    const html = renderToString(
      <Reveal>
        <p>Contenido SSR</p>
      </Reveal>
    );

    expect(html).toContain("Contenido SSR");
    // Plain server element: no JS state, so nothing ships hidden for a
    // no-JS client or before hydration.
    expect(html).not.toMatch(/opacity:\s*0/);
    expect(html).not.toMatch(/display:\s*none/);
  });

  it("renders its wrapper as a plain <div>, not some other element", () => {
    const { container } = render(
      <Reveal>
        <p>Contenido</p>
      </Reveal>
    );

    expect(container.firstElementChild?.tagName).toBe("DIV");
  });
});
