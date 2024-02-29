import { createSlice } from "@reduxjs/toolkit";

const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState: {
    results: [],
    searchType: "tv",
  },
  reducers: {
    setSearchResults: (state, action) => {
      state.results = action.payload;
    },
    setSearchType: (state, action) => {
      state.searchType = action.payload;
    },
  },
});

export const { setSearchResults, setSearchType } = searchResultsSlice.actions;

export default searchResultsSlice.reducer;
