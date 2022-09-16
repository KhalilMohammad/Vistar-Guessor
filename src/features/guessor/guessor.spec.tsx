import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { Guessor } from "./Guessor";

describe("guess UI features", () => {
  it("renders guessor features", () => {
    render(
      <Provider store={store}>
        <Guessor />
      </Provider>
    );

    // expect(screen.getByText<HTMLHeadingElement>(/Play!/i)).toBeInTheDocument();
    // expect(screen.getByText<HTMLHeadingElement>(/Game Config/i)).toBeInTheDocument();
    expect(screen.getByText(/Play!/i)).toBeInTheDocument();
    expect(screen.getByText(/Game Config/i)).toBeInTheDocument();
  });

  it("checks state changes", () => {
    render(
      <Provider store={store}>
        <Guessor />
      </Provider>
    );

    const guessInput = screen.getByLabelText<HTMLInputElement>(/guess/i);
    fireEvent.change(guessInput, { target: { value: "5" } });
    expect(guessInput.value).toBe("5");

    const lowerInput = screen.getByLabelText<HTMLInputElement>(/lower/i);
    fireEvent.change(lowerInput, { target: { value: "20" } });
    expect(lowerInput.value).toBe("20");

    const upperInput = screen.getByLabelText<HTMLInputElement>(/upper/i);
    fireEvent.change(upperInput, { target: { value: "50" } });
    expect(upperInput.value).toBe("50");
  });

  it("update last guess", () => {
    render(
      <Provider store={store}>
        <Guessor />
      </Provider>
    );

    const guessInput = screen.getByLabelText<HTMLInputElement>(/guess/i);
    fireEvent.change(guessInput, { target: { value: "5" } });
    expect(guessInput.value).toBe("5");

    const attemptButton = screen.getByLabelText<HTMLInputElement>(/attempt/i);
    fireEvent.click(attemptButton);

    const lastGuessDiv = screen.getByTestId<HTMLDivElement>("last-guess");
    expect(lastGuessDiv.textContent).toContain(` Last guess: 5 `);
  });
});
