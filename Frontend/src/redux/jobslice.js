import AppliedJobs from '@/components/custom/AppliedJobs';
import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
  name: 'job',
  initialState: {
    jobs: [],
    job: null,
    savedJobs: [],
    AppliedJobs: [] ,
    AdminJobs:[]// ✅ added to store saved jobs
  },
  reducers: {
    setjobs: (state, action) => {
      state.jobs = action.payload;
    },
    setjob: (state, action) => {
      state.job = action.payload;
    },
    saveJob: (state, action) => {
      const jobToSave = action.payload;
      const exists = state.savedJobs.some(job => job._id === jobToSave._id);
      if (!exists) {
        state.savedJobs.push(jobToSave);
      }
    },
    setAppliedJobs: (state, action) => {
      state.AppliedJobs = action.payload;
    },
    setAdminjobs: (state, action) => {
      state.AdminJobs = action.payload;
    }
  }
});

export const { setjobs, setjob, saveJob,setAppliedJobs,setAdminjobs } = jobSlice.actions;
export default jobSlice.reducer;
