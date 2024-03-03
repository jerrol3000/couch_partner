import { configureStore } from "@reduxjs/toolkit";
import searchResultsReducer from "./reducers/slice/searchResultsSlice";
import detailSlice from "./reducers/slice/detailSlice";

export const store = configureStore({
  reducer: {
    media: searchResultsReducer,
    details: detailSlice,
  },
});
