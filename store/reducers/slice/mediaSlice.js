/* eslint-disable no-useless-catch */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { FIREBASE_DB, FIREBASE_AUTH } from "../../../firebaseConfig";

export const addItemToFirestore = createAsyncThunk(
  "media/addItemToFirestore",
  async ({ collectionName, payload }) => {
    try {
      const userData = { ...payload, userId: FIREBASE_AUTH.currentUser.uid };
      const docRef = await addDoc(
        collection(FIREBASE_DB, collectionName),
        userData
      );
      return { entryId: docRef.id, data: payload };
    } catch (error) {
      throw error;
    }
  }
);

export const getListFromFirestore = createAsyncThunk(
  "media/getListFromFirestore",
  async (collectionName) => {
    try {
      const userId = FIREBASE_AUTH.currentUser.uid;
      const mediaQuery = query(
        collection(FIREBASE_DB, collectionName),
        where("userId", "==", userId)
      );
      const mediaSnapshot = await getDocs(mediaQuery);
      const mediaList = mediaSnapshot.docs.map((doc) => ({
        entryId: doc.id,
        data: doc.data(),
      }));
      return mediaList;
    } catch (error) {
      throw error;
    }
  }
);

export const removeItemFromFirestore = createAsyncThunk(
  "media/removeItemFromFirestore",
  async ({ collectionName, id }) => {
    try {
      await deleteDoc(doc(FIREBASE_DB, collectionName, id));
      return id;
    } catch (error) {
      throw error;
    }
  }
);

const mediaSlice = createSlice({
  name: "media",
  initialState: {
    favoriteList: [],
    watchList: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListFromFirestore.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getListFromFirestore.fulfilled, (state, action) => {
      state.status = "succeeded";
      if (action.meta.arg === "favorites") {
        state.favoriteList = action.payload;
      } else if (action.meta.arg === "watchlist") {
        state.watchList = action.payload;
      }
    });
    builder.addCase(getListFromFirestore.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(addItemToFirestore.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addItemToFirestore.fulfilled, (state, action) => {
      state.status = "succeeded";
      if (action.meta.arg === "favorites") {
        state.favoriteList.push(action.payload);
      } else if (action.meta.arg === "watchlist") {
        state.watchList.push(action.payload);
      }
    });
    builder.addCase(addItemToFirestore.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(removeItemFromFirestore.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(removeItemFromFirestore.fulfilled, (state, action) => {
      state.status = "succeeded";
      if (action.meta.arg === "favorites") {
        state.favoriteList = state.favoriteList.filter(
          (item) => item.entryId !== action.payload
        );
      } else if (action.meta.arg === "watchlist") {
        state.watchList = state.watchList.filter(
          (item) => item.entryId !== action.payload
        );
      }
    });
    builder.addCase(removeItemFromFirestore.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default mediaSlice.reducer;
