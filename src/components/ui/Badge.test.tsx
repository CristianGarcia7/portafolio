import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders its label text", () => {
    render(<Badge>NestJS</Badge>);

    expect(screen.getByText("NestJS")).toBeInTheDocument();
  });

  it("defaults to the default variant", () => {
    render(<Badge>PHP</Badge>);

    expect(screen.getByText("PHP")).toHaveAttribute(
      "data-variant",
      "default"
    );
  });

  it.each([
    ["accent", "text-accent-cyan"],
    ["success", "text-accent"],
    ["default", "text-foreground/70"],
  ] as const)("applies the %s variant class", (variant, expectedClass) => {
    render(<Badge variant={variant}>Etiqueta</Badge>);

    const badge = screen.getByText("Etiqueta");
    expect(badge).toHaveAttribute("data-variant", variant);
    expect(badge.className).toContain(expectedClass);
  });
});
