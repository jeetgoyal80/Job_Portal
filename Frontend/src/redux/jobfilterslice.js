// src/redux/jobfilterslice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: [],          // array of selected locations
  profile: [],           // array of selected profiles (job titles)
  salaryRange: {         // salary slider values in LPA
    min: 0,
    max: 50,
  },
  searchTerm: '',        // text from HeroSection
};

const jobFiltersSlice = createSlice({
  name: 'jobFilters',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearFilters: () => initialState,
  },
});

export const { setFilter, updateSearchTerm, clearFilters } = jobFiltersSlice.actions;
export default jobFiltersSlice.reducer;
