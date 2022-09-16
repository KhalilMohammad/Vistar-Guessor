import {
  EqualStatusMessage,
  HigherStatusMessage,
  LowerStatusMessage,
} from "./constants";
import guessReducer, { guessorState, guess, reset } from "./guessorSlice";

describe("guess reducer", () => {
  const initialState: guessorState = {
    guessNumber: 11,
    lower: 1,
    upper: 20,
    status: "",
  };

  it("should handle initial state", () => {
    const { lower, upper, status } = guessReducer(undefined, {
      type: "unknown",
    });
    expect({ lower, upper, status }).toEqual({
      lower: 2,
      upper: 10,
      status: "",
    });
  });

  it("should handle correct guess", () => {
    const number = 11;
    const actualAfterGuess1 = guessReducer(initialState, guess(number));
    expect(actualAfterGuess1.status).toEqual(EqualStatusMessage);
    expect(actualAfterGuess1.lastGuess).toEqual(number);
    expect(actualAfterGuess1.guessNumber).toEqual(number);
  });

  it("should handle incorrect guess", () => {
    const number = 12;
    const actualAfterGuess1 = guessReducer(initialState, guess(number));
    expect(actualAfterGuess1.status).toEqual(LowerStatusMessage);
    expect(actualAfterGuess1.lastGuess).toEqual(number);
    expect(actualAfterGuess1.guessNumber).toBeLessThan(number);
  });

  it("should handle incorrect guess", () => {
    const number = 10;
    const actualAfterGuess1 = guessReducer(initialState, guess(number));
    expect(actualAfterGuess1.status).toEqual(HigherStatusMessage);
    expect(actualAfterGuess1.lastGuess).toEqual(number);
    expect(actualAfterGuess1.guessNumber).toBeGreaterThan(number);
  });

  it("should handle reset and guess", () => {
    const number = 11;
    const actualAfterGuess1 = guessReducer(initialState, guess(number));
    expect(actualAfterGuess1.status).toEqual(EqualStatusMessage);
    expect(actualAfterGuess1.lastGuess).toEqual(number);
    expect(actualAfterGuess1.guessNumber).toEqual(number);
    expect(actualAfterGuess1.lower).toEqual(initialState.lower);
    expect(actualAfterGuess1.upper).toEqual(initialState.upper);

    const lower = 50;
    const upper = 100;
    const actualAfterReset1 = guessReducer(
      actualAfterGuess1,
      reset({
        lower,
        upper,
      })
    );
    expect(actualAfterReset1.lower).toEqual(lower);
    expect(actualAfterReset1.upper).toEqual(upper);
    expect(actualAfterReset1.guessNumber).not.toEqual(number);
  });
});
