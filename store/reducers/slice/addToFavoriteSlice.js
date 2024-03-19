import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebaseConfig";

// Async Thunk to add a document to Firestore
export const addToFirestore = createAsyncThunk(
  "favorite/addToFirestore",
  async (payload, thunkAPI) => {
    try {
      const docRef = await addDoc(
        collection(FIREBASE_DB, "favorites"),
        payload
      );
      return docRef.id;
    } catch (error) {
      throw error;
    }
  }
);

// Async Thunk to remove a document from Firestore
export const removeFromFirestore = createAsyncThunk(
  "favorite/removeFromFirestore",
  async (id, thunkAPI) => {
    try {
      const removed = await deleteDoc(doc(FIREBASE_DB, "favorites", id));
      console.log("this item was removed: ", removed);
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
    status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    // Reducer for handling local state update when adding to favorite
    addToFavorite: (state, action) => {
      state.favorite.push(action.payload);
    },
    // Reducer for handling local state update when removing from favorite
    removeFromFavorite: (state, action) => {
      state.favorite = state.favorite.filter(
        (item) => item.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    // Add async thunk reducers
    builder.addCase(addToFirestore.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addToFirestore.fulfilled, (state, action) => {
      state.status = "succeeded";
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
    });
    builder.addCase(removeFromFirestore.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { addToFavorite, removeFromFavorite } = addToFavoriteSlice.actions;
export default addToFavoriteSlice.reducer;
