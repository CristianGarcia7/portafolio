import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

  it("falls back to showing the email as text when the clipboard write rejects", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("denied"));
    stubClipboard({ writeText });

    render(<CopyEmailButton />);
    fireEvent.click(
      screen.getByRole("button", { name: new RegExp(contactEmail) })
    );

    await waitFor(() =>
      expect(screen.queryByRole("button")).not.toBeInTheDocument()
    );
    expect(
      screen.getByText(contactEmail, { selector: "p" })
    ).toBeInTheDocument();
  });

  it("falls back to showing the email when the Clipboard API is missing", async () => {
    stubClipboard(undefined);

    render(<CopyEmailButton />);
    fireEvent.click(
      screen.getByRole("button", { name: new RegExp(contactEmail) })
    );

    await waitFor(() =>
      expect(screen.queryByRole("button")).not.toBeInTheDocument()
    );
    expect(
      screen.getByText(contactEmail, { selector: "p" })
    ).toBeInTheDocument();
  });
});
