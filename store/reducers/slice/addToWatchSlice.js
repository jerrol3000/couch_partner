import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    watchList: [],
  },
  reducers: {
    addToWatchlist: (state, action) => {
      const existingItemIndex = state.watchList.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex === -1) {
        state.watchList.push(action.payload);
      }
    },
    removeFromWatchList: (state, action) => {
      state.watchList = state.watchList.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addToWatchlist, removeFromWatchList } = watchlistSlice.actions;
export default watchlistSlice.reducer;
