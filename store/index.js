import { configureStore } from "@reduxjs/toolkit";
import searchResultsReducer from "./reducers/slice/searchResultsSlice";
import detailSlice from "./reducers/slice/detailSlice";
import addToFavoriteSlice from "./reducers/slice/addToFavoriteSlice";
import addToWatchSlice from "./reducers/slice/addToWatchSlice";
import mediaMenuSlice from "./reducers/slice/mediaMenuSlice";
import screensSlice from "./reducers/slice/screensSlice";
import authSlice from "./reducers/slice/authSlice";

export const store = configureStore({
  reducer: {
    media: searchResultsReducer,
    details: detailSlice,
    favoriteList: addToFavoriteSlice,
    watchList: addToWatchSlice,
    openMenuId: mediaMenuSlice,
    screens: screensSlice,
    user: authSlice,
  },
});
