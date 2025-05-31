// redux/slice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'company',
  initialState: {
   companies :[],
   curcompany :null
  },
  reducers: {
  
    setcompanies: (state, action) => {
      state.companies = action.payload;
    },
    setcurcompany: (state, action) => {
      state.curcompany = action.payload;
    },
  },
});

export const { setcompanies,setcurcompany } = authSlice.actions;
export default authSlice.reducer;
