import React from "react";
import { render, screen } from "@testing-library/react";
import BenefitSection from "./BenefitSection";

describe("<BenefitSection />", () => {
  render(
    <BenefitSection
      type="ltr"
      title="Example Title"
      subtitle="Example Subtitle"
      description="Example description"
    />
  );
  it("should render correct content", () => {
    const titleElement = screen.getByText("Example Title");
    const subtitleElement = screen.getByText("Example Subtitle");
    const descriptionElement = screen.getByText("Example description");
    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });
});
