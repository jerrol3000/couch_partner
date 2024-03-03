import { createSlice } from "@reduxjs/toolkit";

const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState: {
    results: [],
    searchType: "tv",
    popular: [],
  },
  reducers: {
    setSearchResults: (state, action) => {
      state.results = action.payload;
    },
    setSearchType: (state, action) => {
      state.searchType = action.payload;
    },
    setPopular: (state, action) => {
      state.popular = action.payload;
    },
  },
});

export const { setSearchResults, setSearchType, setPopular } =
  searchResultsSlice.actions;

export default searchResultsSlice.reducer;
