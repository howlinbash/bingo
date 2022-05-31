import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { AppState, transition } from "./appSlice";

export interface BallsState {
  balls: number[];
  drawnBall: number | null;
}

const initialState: BallsState = {
  balls: [...Array(75)].map((_, i) => i + 1),
  drawnBall: null,
};

export const ballsSlice = createSlice({
  name: "balls",
  initialState,
  reducers: {
    drawBall: (state, action: PayloadAction<BallsState>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(transition, (state, action) => {
      if (action.payload === AppState.Ready) {
        return initialState;
      }
    });
  },
});

export const { drawBall } = ballsSlice.actions;

export const selectBall = (state: RootState) => state.balls.drawnBall;
export const selectUndrawnBalls = (state: RootState) => state.balls.balls;

export default ballsSlice.reducer;
