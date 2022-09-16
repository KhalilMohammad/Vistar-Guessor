import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import guessorReducer from '../features/guessor/guessorSlice';

export const store = configureStore({
  reducer: {
    guessor: guessorReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
