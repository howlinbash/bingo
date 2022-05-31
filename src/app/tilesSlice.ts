import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { AppState, transition } from "./appSlice";

export type TilesState = number[][];
export type Vector = [x: number, y: number];

const initialState: TilesState = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];
export const tilesSlice = createSlice({
  name: "tiles",
  initialState,
  reducers: {
    markCard: (state, action: PayloadAction<Vector>) => {
      const [x, y] = action.payload;
      state[x][y] = 1;
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

export const { markCard } = tilesSlice.actions;

export const selectTile = (state: RootState, vector: Vector) =>
  state.tiles[vector[0]][vector[1]];

export default tilesSlice.reducer;
