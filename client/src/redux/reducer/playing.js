import { createSlice } from "@reduxjs/toolkit";

const playingSlice = createSlice({
  name: "playing",
  initialState: {
    play: false,
  },
  reducers: {
    playin: (state) => {
      state.play = true;
    },
    pausein: (state) => {
      state.play = false;
    },
  },
});

export const { pausein, playin } = playingSlice.actions;
export default playingSlice.reducer;
