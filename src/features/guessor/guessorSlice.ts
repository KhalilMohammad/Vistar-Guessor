import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  EqualStatusMessage,
  HigherStatusMessage,
  LowerStatusMessage,
} from "./constants";

export interface guessorState {
  lower: number;
  upper: number;
  guessNumber: number;
  lastGuess?: number;
  status: string;
}

function randInt(lower: number, upper: number) {
  const random = Math.trunc(Math.random() * (upper - lower) + lower);
  return random;
}

const defaultLower = 2;
const defaultUpper = 10;
const initialState: guessorState = {
  lower: defaultLower,
  upper: defaultUpper,
  guessNumber: (() => {
    return randInt(defaultLower, defaultUpper);
  })(),
  status: "",
};

export const guessorSlice = createSlice({
  name: "guessor",
  initialState,
  reducers: {
    guess: (state, action: PayloadAction<number>) => {
      const choosenNumber = action.payload;
      if (choosenNumber > state.guessNumber) {
        state.status = LowerStatusMessage;
      } else if (choosenNumber < state.guessNumber) {
        state.status = HigherStatusMessage;
      } else {
        state.status = EqualStatusMessage;
      }

      state.lastGuess = choosenNumber;
    },
    reset: (state, action: PayloadAction<{ lower: number; upper: number }>) => {
      const { lower, upper } = action.payload;
      state.lower = lower;
      state.upper = upper;
      state.guessNumber = randInt(lower, upper);
    },
  },
});

export const { guess, reset } = guessorSlice.actions;

export const selectGuess = (state: RootState) => state.guessor;

export default guessorSlice.reducer;
