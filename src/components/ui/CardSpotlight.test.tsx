import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CardSpotlight } from "./CardSpotlight";

describe("CardSpotlight", () => {
  it("sets --spotlight-x and --spotlight-y on the parent element on pointer move", () => {
    const { container } = render(
      <div data-testid="card-surface">
        <CardSpotlight />
      </div>
    );

    const parent = container.querySelector(
      '[data-testid="card-surface"]'
    ) as HTMLElement;

    const rectSpy = vi
      .spyOn(parent, "getBoundingClientRect")
      .mockReturnValue({
        x: 10,
        y: 20,
        width: 200,
        height: 100,
        top: 20,
        left: 10,
        right: 210,
        bottom: 120,
        toJSON: () => {},
      } as DOMRect);

    parent.dispatchEvent(
      new PointerEvent("pointermove", {
        clientX: 60,
        clientY: 45,
        bubbles: true,
      })
    );

    expect(parent.style.getPropertyValue("--spotlight-x")).toBe("50px");
    expect(parent.style.getPropertyValue("--spotlight-y")).toBe("25px");

    rectSpy.mockRestore();
  });

  it("removes the pointermove listener from the parent on unmount", () => {
    const { container, unmount } = render(
      <div data-testid="card-surface">
        <CardSpotlight />
      </div>
    );

    const parent = container.querySelector(
      '[data-testid="card-surface"]'
    ) as HTMLElement;

    const removeEventListenerSpy = vi.spyOn(parent, "removeEventListener");

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "pointermove",
      expect.any(Function)
    );
  });
});
