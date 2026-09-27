import { renderToString } from "react-dom/server";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TerminalCard } from "./TerminalCard";

const lines = ["$ curl -N https://api/agentes", "> respuesta en streaming"];

describe("TerminalCard", () => {
  it("has an accessible group label", () => {
    render(<TerminalCard lines={lines} />);

    expect(
      screen.getByRole("group", {
        name: "Terminal de ejemplo mostrando una consulta al agente de IA",
      })
    ).toBeInTheDocument();
  });

  it("renders every line, always — no client-side state or typing", () => {
    render(<TerminalCard lines={lines} />);

    for (const line of lines) {
      expect(screen.getByText(line, { exact: false })).toBeInTheDocument();
    }
  });

  it("server-renders every line, in order, each carrying its --i index for the CSS stagger", () => {
    const html = renderToString(<TerminalCard lines={lines} />);
    const container = document.createElement("div");
    container.innerHTML = html;

    const lineEls = Array.from(container.querySelectorAll(".terminal-line"));
    expect(lineEls.map((el) => el.textContent)).toEqual(lines);

    lineEls.forEach((el, index) => {
      expect(el.getAttribute("style")).toContain(`--i:${index}`);
    });
  });

  it("ships the whole log in the very first server-rendered HTML — no-JS clients never see an empty terminal", () => {
    const html = renderToString(<TerminalCard lines={lines} />);
    const container = document.createElement("div");
    container.innerHTML = html;

    expect(container.textContent).toContain(lines[0]);
    expect(container.textContent).toContain(lines[1]);
  });
});
