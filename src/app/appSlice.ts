import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import { drawBall, selectUndrawnBalls } from "../app/ballsSlice";
import { selectSortedCard, Vector } from "../app/cardSlice";
import {
  selectNewChances,
  storeChances,
  ChanceVector,
} from "../app/chanceSlice";
import { markCard } from "../app/tilesSlice";

export enum AppState {
  Login,
  Ready,
  Playing,
  Bingo,
}

const initialState = {
  appState: AppState.Login,
  username: "",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    transition: (state, action: PayloadAction<AppState>) => {
      state.appState = action.payload;
    },
  },
});

export const { login, transition } = appSlice.actions;

export const selectAppState = (state: RootState) => state.app.appState;
export const selectUsername = (state: RootState) => state.app.username;

export default appSlice.reducer;

const getCardRowIndex = (ball: number) => {
  if (ball > 60) return 0;
  if (ball > 45) return 1;
  if (ball > 30) return 2;
  if (ball > 15) return 3;
  return 4;
};

const makeChanceVector = ([x, y]: Vector) => {
  // With back diagonal chance
  if (x === y) return [x, y, 0];
  // With forward diagonal chance
  if (x + y === 4) return [x, y, 1];
  // Without diagonal chance
  return [x, y];
};

export const draw = (): AppThunk => (dispatch, getState) => {
  const state = getState();
  const card = selectSortedCard(state);
  const undrawnBalls = selectUndrawnBalls(state);

  // Draw Ball
  const randomIndex = Math.floor(Math.random() * undrawnBalls.length);
  const drawnBall = undrawnBalls[randomIndex];
  const balls = undrawnBalls.filter((_, i) => i !== randomIndex);
  dispatch(drawBall({ balls, drawnBall }));

  // Check Card
  const rowIndex = getCardRowIndex(drawnBall);
  const columnIndex = card[rowIndex].indexOf(drawnBall);

  // It's a match!
  if (columnIndex > -1) {
    // Rotate vector clockwise 90 degrees
    const vector: Vector = [columnIndex, card[0].length - 1 - rowIndex];
    dispatch(markCard(vector));

    // Store chances
    const chanceVector: ChanceVector = makeChanceVector(vector);
    dispatch(storeChances(chanceVector));

    // Bingo!
    const chances = selectNewChances(getState(), chanceVector);
    if (chances.includes(5)) dispatch(transition(AppState.Bingo));
  }
};
