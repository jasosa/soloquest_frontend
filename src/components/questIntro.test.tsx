import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { QuestIntro } from "./questIntro";

afterEach(cleanup);

describe("QuestIntro", () => {
  it("renders title and intro copy", () => {
    render(
      <QuestIntro
        title="HeroQuest"
        intro="Prepare for adventure."
        imageUrl="/images/start.png"
        onBack={() => {}}
        onStart={() => {}}
      />
    );

    expect(screen.getByText("HeroQuest")).toBeInTheDocument();
    expect(screen.getByText("Prepare for adventure.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /start quest/i })).toBeInTheDocument();
    expect(screen.getByText(/ubicación inicial de los héroes/i)).toBeInTheDocument();
    expect(screen.getByAltText(/ubicación inicial de los héroes/i)).toHaveAttribute(
      "src",
      "/images/start.png"
    );
  });

  it("fires callbacks when buttons are pressed", () => {
    const onBack = vi.fn();
    const onStart = vi.fn();

    render(<QuestIntro title="HeroQuest" intro="Intro text" onBack={onBack} onStart={onStart} />);

    fireEvent.click(screen.getByRole("button", { name: /back/i }));
    fireEvent.click(screen.getByRole("button", { name: /start quest/i }));

    expect(onBack).toHaveBeenCalledTimes(1);
    expect(onStart).toHaveBeenCalledTimes(1);
  });
});
