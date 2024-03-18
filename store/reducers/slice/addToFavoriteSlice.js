import { createSlice } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebaseConfig";

const addToFavoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favorite: [],
  },
  reducers: {
    setFavorite: async (state, action) => {
      const existingItemIndex = state.favorite.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex === -1) {
        try {
          state.favorite.push(action.payload);
          const docRef = await addDoc(
            collection(FIREBASE_DB, "favorites"),
            action.payload
          );
          console.log("Entry written with ID: ", docRef.id);
        } catch (error) {
          console.error("Error adding document: ", error);
        }
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
