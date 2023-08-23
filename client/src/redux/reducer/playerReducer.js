import { createSlice } from "@reduxjs/toolkit";

const playSlice = createSlice({
  name: "player",
  initialState: {
    show: false,
  },
  reducers: {
    playing: (state) => {
      state.show = true;
    },
  },
});

export const { playing } = playSlice.actions;
export default playSlice.reducer;
