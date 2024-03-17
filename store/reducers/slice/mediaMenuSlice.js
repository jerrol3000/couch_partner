import { createSlice } from "@reduxjs/toolkit";
const mediaMenuSlice = createSlice({
  name: "openMenuId",
  initialState: {
    openMenuId: null,
    showCheckMark: false,
  },
  reducers: {
    setOpenMenuId: (state, action) => {
      state.openMenuId = action.payload;
    },
    setShowCheckMark: (state, action) => {
      state.showCheckMark = action.payload;
    },
  },
});

export const { setOpenMenuId, setShowCheckMark } = mediaMenuSlice.actions;
export default mediaMenuSlice.reducer;
