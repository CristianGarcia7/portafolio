import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  it("renders its children with accessible structure preserved", () => {
    render(
      <Card>
        <h3>Asistente RAG</h3>
        <p>Descripcion del proyecto.</p>
      </Card>
    );

    expect(
      screen.getByRole("heading", { name: "Asistente RAG" })
    ).toBeInTheDocument();
    expect(screen.getByText("Descripcion del proyecto.")).toBeInTheDocument();
  });

  it("keeps the decorative spotlight out of the accessibility tree", () => {
    const { container } = render(
      <Card>
        <p>Contenido</p>
      </Card>
    );

    const spotlight = container.querySelector('[aria-hidden="true"]');
    expect(spotlight).toBeInTheDocument();
    expect(spotlight).not.toHaveTextContent("Contenido");
  });

  it("forwards className and other props to the outer element", () => {
    render(
      <Card data-testid="project-card" className="extra-class">
        <p>Contenido</p>
      </Card>
    );

    const card = screen.getByTestId("project-card");
    expect(card).toHaveClass("extra-class");
  });
});
