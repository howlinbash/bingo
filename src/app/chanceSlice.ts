import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { AppState, transition } from "./appSlice";

export type ChanceState = number[][];

export type ChanceVector = number[];

const initialState: ChanceState = [
  [0, 0, 1, 0, 0], // y-axis
  [0, 0, 1, 0, 0], // x-axis
  [1, 1], // diagonals
];

export const chanceSlice = createSlice({
  name: "chance",
  initialState,
  reducers: {
    storeChances: (state, action: PayloadAction<ChanceVector>) => {
      const [x, y, z] = action.payload;
      state[0][x] = state[0][x] += 1;
      state[1][y] = state[1][y] += 1;
      if (z !== undefined) {
        state[2][z] = state[2][z] += 1;
      }
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

export const { storeChances } = chanceSlice.actions;

export const selectNewChances = (state: RootState, vector: ChanceVector) => {
  return state.chance.map((d, i) => d[vector[i]]);
};

export default chanceSlice.reducer;
