import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { contactEmail } from "@/content/profile";
import { CopyEmailButton } from "./CopyEmailButton";

// `fireEvent.click` (not `userEvent`) on purpose: `userEvent.setup()`
// installs its own `navigator.clipboard` stub for copy/paste emulation,
// which would silently override the clipboard mock these tests set up.
function stubClipboard(clipboard: Partial<Clipboard> | undefined) {
  Object.defineProperty(navigator, "clipboard", {
    value: clipboard,
    configurable: true,
  });
}

describe("CopyEmailButton", () => {
  afterEach(() => {
    stubClipboard(undefined);
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("copies the exact contact email and announces success via aria-live", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    stubClipboard({ writeText });

    render(<CopyEmailButton />);
    fireEvent.click(
      screen.getByRole("button", { name: new RegExp(contactEmail) })
    );

    await waitFor(() => expect(writeText).toHaveBeenCalledWith(contactEmail));
    expect(await screen.findByText("Copiado")).toBeInTheDocument();
  });

  it("exposes an aria-live polite region for the copy feedback", () => {
    stubClipboard({ writeText: vi.fn().mockResolvedValue(undefined) });
    render(<CopyEmailButton />);

    const region = screen.getByRole("status");
    expect(region).toHaveAttribute("aria-live", "polite");
  });

  it("keeps the live region mounted, announces the failure, and focuses a mailto link when the clipboard write rejects", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("denied"));
    stubClipboard({ writeText });

    render(<CopyEmailButton />);
    fireEvent.click(
      screen.getByRole("button", { name: new RegExp(contactEmail) })
    );

    await waitFor(() =>
      expect(screen.queryByRole("button")).not.toBeInTheDocument()
    );

    expect(screen.getByRole("status")).toHaveTextContent(
      `No se pudo copiar. Escribe a: ${contactEmail}`
    );

    const link = screen.getByRole("link", { name: contactEmail });
    expect(link).toHaveAttribute("href", `mailto:${contactEmail}`);
    expect(document.activeElement).toBe(link);
  });

  it("keeps the live region mounted, announces the failure, and focuses a mailto link when the Clipboard API is missing", async () => {
    stubClipboard(undefined);

    render(<CopyEmailButton />);
    fireEvent.click(
      screen.getByRole("button", { name: new RegExp(contactEmail) })
    );

    await waitFor(() =>
      expect(screen.queryByRole("button")).not.toBeInTheDocument()
    );

    expect(screen.getByRole("status")).toHaveTextContent(
      `No se pudo copiar. Escribe a: ${contactEmail}`
    );

    const link = screen.getByRole("link", { name: contactEmail });
    expect(link).toHaveAttribute("href", `mailto:${contactEmail}`);
    expect(document.activeElement).toBe(link);
  });

  it('resets the "Copiado" status about 2s after copying, and clears the reset timer on unmount', async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    stubClipboard({ writeText });
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { unmount } = render(<CopyEmailButton />);
    fireEvent.click(
      screen.getByRole("button", { name: new RegExp(contactEmail) })
    );
    await act(() => vi.advanceTimersByTimeAsync(0));
    expect(screen.getByRole("status")).toHaveTextContent("Copiado");

    unmount();
    await act(() => vi.advanceTimersByTimeAsync(2000));
    expect(errorSpy).not.toHaveBeenCalled();

    vi.useRealTimers();
  });

  it("re-announces the copied status on a second click by clearing it first", async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    stubClipboard({ writeText });

    render(<CopyEmailButton />);
    const button = screen.getByRole("button", {
      name: new RegExp(contactEmail),
    });
    const status = screen.getByRole("status");

    fireEvent.click(button);
    await act(() => vi.advanceTimersByTimeAsync(0));
    expect(status).toHaveTextContent("Copiado");

    fireEvent.click(button);
    expect(status).toBeEmptyDOMElement();

    await act(() => vi.advanceTimersByTimeAsync(0));
    expect(status).toHaveTextContent("Copiado");

    await act(() => vi.advanceTimersByTimeAsync(2000));
    expect(status).toBeEmptyDOMElement();

    vi.useRealTimers();
  });
});
