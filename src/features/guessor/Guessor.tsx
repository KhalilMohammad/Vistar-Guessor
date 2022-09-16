import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectGuess, guess, reset } from "./guessorSlice";

export const Guessor = () => {
  const [choosenNumber, setChoosenNumber] = useState<number | string>("");
  const { lower, status, upper, lastGuess } = useAppSelector(selectGuess);
  const [lowerBound, setLowerBound] = useState<number>(lower);
  const [upperBound, setUpperBound] = useState<number>(upper);
  const dispatch = useAppDispatch();

  return (
    <>
      <div>
        <h3>Play!</h3>
        <div className="prompt">
          Guess the number between {lower} and {upper}
        </div>
        <div data-testid="last-guess" id="test"> Last guess: {lastGuess} </div>
        <div className="status">{status}</div>
        <label htmlFor="guess">Guess: </label>
        <input
          type="number"
          name="guess"
          aria-label="guess"
          value={choosenNumber}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setChoosenNumber(e.target.value)
          }
        ></input>
        <button
          name="attempt"
          aria-label="attempt"
          onClick={() => dispatch(guess(Number(choosenNumber)))}
          disabled={!choosenNumber}
        >
          Make guess
        </button>
      </div>
      <h3>Game Config</h3>
      <div>
        <div>
          <label htmlFor="lower">Lower bound: </label>
          <input
            type="number"
            name="lower"
            aria-label="lower"
            value={lowerBound}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setLowerBound(Number(e.target.value))
            }
          ></input>
        </div>
        <div>
          <label htmlFor="upper">Upper bound: </label>
          <input
            type="number"
            name="upper"
            aria-label="upper"
            value={upperBound}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUpperBound(Number(e.target.value))
            }
          ></input>
        </div>
        <button
          name="reset"
          onClick={() =>
            dispatch(
              reset({
                lower: lowerBound,
                upper: upperBound,
              })
            )
          }
          disabled={!lowerBound || !upperBound}
        >
          Reset
        </button>
      </div>
    </>
  );
};
