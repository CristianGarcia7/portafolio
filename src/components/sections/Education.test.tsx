import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { certifications, education } from "@/content/profile";
import { Education } from "./Education";

describe("Education", () => {
  it("renders every education item's title, institution, and period", () => {
    render(<Education />);

    for (const item of education) {
      const card = screen.getByTestId(`education-item-${item.title}`);
      expect(within(card).getByText(item.title)).toBeInTheDocument();
      expect(within(card).getByText(item.institution)).toBeInTheDocument();
      expect(within(card).getByText(item.period)).toBeInTheDocument();
    }
  });

  it("renders every certification, showing the issuer only when the CV has one", () => {
    render(<Education />);

    for (const cert of certifications) {
      const card = screen.getByTestId(`certification-item-${cert.title}`);
      expect(within(card).getByText(cert.title)).toBeInTheDocument();

      if (cert.issuer) {
        expect(within(card).getByText(cert.issuer)).toBeInTheDocument();
      }
    }

    // Two certifications in the CV genuinely have no issuer — confirm the
    // fixture still reflects that (guards against silently inventing one).
    const withoutIssuer = certifications.filter((c) => !c.issuer);
    expect(withoutIssuer).toHaveLength(2);
  });

  it("never invents an issuer for a certification that doesn't have one", () => {
    render(<Education />);

    const issuers = certifications
      .map((c) => c.issuer)
      .filter((issuer): issuer is string => Boolean(issuer));

    for (const cert of certifications.filter((c) => !c.issuer)) {
      const card = screen.getByTestId(`certification-item-${cert.title}`);
      for (const otherIssuer of issuers) {
        expect(within(card).queryByText(otherIssuer)).not.toBeInTheDocument();
      }
    }
  });

  it("exposes the educación landmark id for in-page navigation", () => {
    render(<Education />);
    expect(document.getElementById("educacion")).not.toBeNull();
  });
});
