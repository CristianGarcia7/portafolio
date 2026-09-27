import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useReducedMotion } from "motion/react";
import { Reveal } from "./Reveal";

vi.mock("motion/react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("motion/react")>();
  return {
    ...actual,
    useReducedMotion: vi.fn(),
  };
});

const mockedUseReducedMotion = vi.mocked(useReducedMotion);

describe("Reveal", () => {
  it("renders children immediately visible when reduced motion is preferred", () => {
    mockedUseReducedMotion.mockReturnValue(true);

    render(
      <Reveal>
        <p>Contenido revelado</p>
      </Reveal>
    );

    expect(screen.getByText("Contenido revelado")).toBeVisible();
  });

  it("still renders children when motion is enabled", () => {
    mockedUseReducedMotion.mockReturnValue(false);

    render(
      <Reveal>
        <p>Contenido animado</p>
      </Reveal>
    );

    expect(screen.getByText("Contenido animado")).toBeInTheDocument();
  });
});
