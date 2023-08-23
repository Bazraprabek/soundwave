import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    index: {},
  },
  reducers: {
    setUserData: (state, val) => {
      state.index = val;
    },
  },
});

export const { setUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
