import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";

describe("quest start flow", () => {
  it("shows intro and starts the quest when the start button is clicked", async () => {
    render(<App />);

    expect(screen.getByText(/Online Quest 0 - New Beginnings/i)).toBeInTheDocument();
    expect(screen.getByText(/Prestad atención mis palabras/i)).toBeInTheDocument();

    const startButtons = screen.getAllByRole("button", { name: /start quest/i });
    fireEvent.click(startButtons[0]);

    await waitFor(() =>
      expect(screen.queryByText(/Online Quest 0 - New Beginnings/i)).not.toBeInTheDocument()
    );

    //expect(screen.getByRole("button", { name: /quest started/i })).toBeDisabled();
    expect(await screen.findByText(/Starting Room/i)).toBeInTheDocument();
  });
});
