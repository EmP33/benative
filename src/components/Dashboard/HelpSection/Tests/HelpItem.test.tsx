import { render, screen, fireEvent } from "@testing-library/react";
import HelpItem from "../HelpItem";
import { BrowserRouter } from "react-router-dom";

describe("<HelpItem />", () => {
  render(
    <BrowserRouter>
      <HelpItem
        title="Ustaw nazwę użytkownika"
        description="Ustaw nazwę jaka zostanie przypisana dla twojego konta."
        linkTitle="Ustawienia Konta"
        link="/dashboard/user-settings"
      />
    </BrowserRouter>
  );
  const LinkButton = screen.getByText(/Ustawienia Konta/i);
  it("renders Help Item", () => {
    const HelpHeader = screen.getByText("Ustaw nazwę użytkownika");
    const HelpDescription = screen.getByText(
      "Ustaw nazwę jaka zostanie przypisana dla twojego konta."
    );

    expect(HelpHeader).toBeInTheDocument();
    expect(HelpDescription).toBeInTheDocument();
    expect(LinkButton).toBeInTheDocument();
  });
  it("should navigate to link when button is clicked", () => {
    fireEvent.click(LinkButton);
    expect(LinkButton).not.toBeInTheDocument();
  });
});
