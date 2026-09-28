import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("test harness", () => {
  it("renders React components into jsdom", () => {
    render(<p>harness ready</p>);
    expect(screen.getByText("harness ready")).toBeInTheDocument();
  });
});
