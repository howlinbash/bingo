import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import ballsReducer from "./ballsSlice";
import cardReducer from "./cardSlice";
import chanceReducer from "./chanceSlice";
import tilesReducer from "./tilesSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    balls: ballsReducer,
    card: cardReducer,
    chance: chanceReducer,
    tiles: tilesReducer,
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
