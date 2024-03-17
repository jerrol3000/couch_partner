import { createSlice } from "@reduxjs/toolkit";

const addToFavoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favorite: [],
  },
  reducers: {
    setFavorite: (state, action) => {
      const existingItemIndex = state.favorite.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex === -1) {
        state.favorite.push(action.payload);
      }
    },
    removeFromFavorite: (state, action) => {
      state.favorite = state.favorite.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { setFavorite, removeFromFavorite } = addToFavoriteSlice.actions;
export default addToFavoriteSlice.reducer;
