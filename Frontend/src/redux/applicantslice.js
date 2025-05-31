// redux/slice.js
import { createSlice } from '@reduxjs/toolkit';

const applicantSlice = createSlice({
  name: 'applicant',
  initialState: {
    applicants:[]
  },
  reducers: {
   
    setapplicant: (state, action) => {
      state.applicants = action.payload;
    },
  },
});

export const { setapplicant } = applicantSlice.actions;
export default applicantSlice.reducer;
