import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { AppState, transition } from "./appSlice";

export type CardState = number[][];
export type Vector = [x: number, y: number];

const getRandomIndexes = () => {
  const indexPool = [];
  for (let i = 0; i < 15; i += 1) {
    indexPool.push(i);
  }
  const randomIndexes = [];
  for (let i = 0; i < 5; i += 1) {
    const index = Math.floor(Math.random() * indexPool.length);
    randomIndexes.push(indexPool.splice(index, 1)[0]);
  }
  return randomIndexes;
};

const generateCard = () => {
  const ranges = [75, 60, 45, 30, 15];
  const card: CardState = [];
  ranges.forEach((rangeMax, i) => {
    card.push(getRandomIndexes().map((random) => rangeMax - random));
  });
  card[2][2] = 0;
  return card;
};

const initialState: CardState = generateCard();

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    newCard: (state) => {
      console.log("generate card");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(transition, (state, action) => {
      if (action.payload === AppState.Ready) {
        return generateCard();
      }
    });
  },
});

export const { newCard } = cardSlice.actions;

// rotate matrix anti-clockwise 90 degrees
export const selectVisibleCard = (state: RootState) =>
  state.card[0].map((_, i) => state.card.map((row) => row[i]).reverse());

export const selectSortedCard = (state: RootState) => state.card;

export default cardSlice.reducer;
