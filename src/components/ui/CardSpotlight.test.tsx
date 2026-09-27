import { createPortal } from "react-dom";
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

  it("removes the exact pointermove listener that was added, and stops updating the CSS vars on unmount", () => {
    // A plain DOM node created (and spied on) *before* mounting, portaled
    // into directly. React still attaches its own root-level synthetic
    // event delegation listener ("pointermove", bound to
    // `dispatchContinuousEvent`) to this same portal-target node, so the
    // two `addEventListener("pointermove", ...)` calls are told apart by
    // the handler function's own name rather than by call order.
    const parent = document.createElement("div");
    document.body.appendChild(parent);

    const addEventListenerSpy = vi.spyOn(parent, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(parent, "removeEventListener");

    const { unmount } = render(createPortal(<CardSpotlight />, parent));

    const addedCall = addEventListenerSpy.mock.calls.find(
      ([eventName, handler]) =>
        eventName === "pointermove" &&
        (handler as EventListener).name === "handlePointerMove"
    );
    expect(addedCall).toBeDefined();
    const addedHandler = addedCall?.[1];

    unmount();

    const removedCall = removeEventListenerSpy.mock.calls.find(
      ([eventName, handler]) =>
        eventName === "pointermove" &&
        (handler as EventListener).name === "handlePointerMove"
    );
    expect(removedCall).toBeDefined();
    // The listener removed on unmount must be the same function reference
    // that was added — not merely "a" pointermove listener — otherwise
    // cleanup silently fails to detach the real one.
    expect(removedCall?.[1]).toBe(addedHandler);

    const rectSpy = vi.spyOn(parent, "getBoundingClientRect").mockReturnValue({
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

    // After unmount, further pointer moves must no longer update the CSS
    // vars (the listener is genuinely gone, not just spied on).
    expect(parent.style.getPropertyValue("--spotlight-x")).toBe("");
    expect(parent.style.getPropertyValue("--spotlight-y")).toBe("");

    rectSpy.mockRestore();
    document.body.removeChild(parent);
  });
});
