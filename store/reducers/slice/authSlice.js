/* eslint-disable no-useless-catch */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDoc, doc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../firebaseConfig";

// Action to fetch the current user object from Firestore
export const fetchCurrentUserFromFirestore = createAsyncThunk(
  "user/fetchCurrentUserFromFirestore",
  async () => {
    try {
      const userDocRef = doc(
        FIREBASE_DB,
        "users",
        FIREBASE_AUTH.currentUser.uid
      );
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        return userDocSnap.data();
      } else {
        throw new Error("User document does not exist");
      }
    } catch (error) {
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchCurrentUserFromFirestore.fulfilled,
      (state, action) => {
        return action.payload;
      }
    );
    builder.addCase(fetchCurrentUserFromFirestore.rejected, (state, action) => {
      console.error("Error fetching current user:", action.error);
    });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
