/* eslint-disable no-useless-catch */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebaseConfig";

export const addToFirestore = createAsyncThunk(
  "favorite/addToFirestore",
  async (payload) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const docRef = await addDoc(
        collection(FIREBASE_DB, "favorites"),
        payload
      );
      return { entryId: docRef.id, data: payload };
    } catch (error) {
      throw error;
    }
  }
);

// Async Thunk to remove a document from Firestore
export const removeFromFirestore = createAsyncThunk(
  "favorite/removeFromFirestore",
  async (id) => {
    try {
      const favorites = await getDocs(collection(FIREBASE_DB, "favorites"));
      for (let favorite of favorites.docs) {
        if (favorite.id === id) {
          await deleteDoc(doc(FIREBASE_DB, "favorites", id));
        }
      }
      return id;
    } catch (error) {
      throw error;
    }
  }
);

const addToFavoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favorite: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add async thunk reducers
    builder.addCase(addToFirestore.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addToFirestore.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.favorite.push(action.payload);
    });
    builder.addCase(addToFirestore.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(removeFromFirestore.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(removeFromFirestore.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.favorite = state.favorite.filter(
        (item) => item.id !== action.payload
      );
    });
    builder.addCase(removeFromFirestore.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default addToFavoriteSlice.reducer;
