import { configureStore } from "@reduxjs/toolkit";
import searchResultsReducer from "./reducers/slice/searchResultsSlice";

export const store = configureStore({
  reducer: {
    media: searchResultsReducer,
  },
});
