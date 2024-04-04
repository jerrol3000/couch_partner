import { configureStore } from "@reduxjs/toolkit";
import searchResultsReducer from "./reducers/slice/searchResultsSlice";
import detailSlice from "./reducers/slice/detailSlice";
import mediaMenuSlice from "./reducers/slice/mediaMenuSlice";
import screensSlice from "./reducers/slice/screensSlice";
import authSlice from "./reducers/slice/authSlice";
import mediaSlice from "./reducers/slice/mediaSlice";

export const store = configureStore({
  reducer: {
    media: searchResultsReducer,
    details: detailSlice,
    openMenuId: mediaMenuSlice,
    screens: screensSlice,
    firestore: mediaSlice,
    user: authSlice,
  },
});
