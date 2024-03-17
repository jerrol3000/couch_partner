import { createSlice } from "@reduxjs/toolkit";

const screensSlice = createSlice({
  name: "screens",
  initialState: {
    currentScreen: null,
  },
  reducers: {
    setCurrentScreen: (state, action) => {
      state.currentScreen = action.payload;
    },
  },
});

export const { setCurrentScreen } = screensSlice.actions;
export default screensSlice.reducer;
