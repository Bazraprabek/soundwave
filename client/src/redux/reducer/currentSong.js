import { createSlice } from "@reduxjs/toolkit";

const currentSongSlice = createSlice({
  name: "currentSong",
  initialState: {
    index: "0",
  },
  reducers: {
    setIndex: (state, val) => {
      state.index = val;
    },
  },
});

export const { setIndex } = currentSongSlice.actions;
export default currentSongSlice.reducer;
