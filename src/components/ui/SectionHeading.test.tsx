import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionHeading } from "./SectionHeading";

describe("SectionHeading", () => {
  it("renders the title as a level-2 heading", () => {
    render(
      <SectionHeading eyebrow="// 02 · experiencia" title="Experiencia" />
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "Experiencia" })
    ).toBeInTheDocument();
  });

  it("renders the eyebrow label", () => {
    render(
      <SectionHeading eyebrow="// 02 · experiencia" title="Experiencia" />
    );

    expect(screen.getByText("// 02 · experiencia")).toBeInTheDocument();
  });

  it("renders the optional subtitle when provided", () => {
    render(
      <SectionHeading
        eyebrow="// 03 · proyectos"
        title="Proyectos"
        subtitle="Una seleccion de trabajo reciente."
      />
    );

    expect(
      screen.getByText("Una seleccion de trabajo reciente.")
    ).toBeInTheDocument();
  });

  it("does not render a subtitle paragraph when none is provided", () => {
    const { container } = render(
      <SectionHeading eyebrow="// 01 · inicio" title="Inicio" />
    );

    expect(container.querySelectorAll("p")).toHaveLength(1);
  });

  it("applies the given id to the wrapper element", () => {
    const { container } = render(
      <SectionHeading
        eyebrow="// 04 · contacto"
        title="Contacto"
        id="contacto"
      />
    );

    const wrapper = container.querySelector("#contacto");
    expect(wrapper).toBeInTheDocument();
    expect(
      wrapper?.querySelector("h2")?.textContent
    ).toBe("Contacto");
  });
});
