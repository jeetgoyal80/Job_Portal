import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authslice';
import jobReducer from './jobslice';
import companyReducer from './companySlice';
import applicantReducer from './applicantslice';
import jobFiltersReducer from './jobfilterslice'
  // Import your jobFilters slice reducer

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';

import storage from 'redux-persist/lib/storage'; // localStorage by default

import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'job', 'jobFilters','company','applicant'],  // <-- add jobFilters here
};

const rootReducer = combineReducers({
  auth: authReducer,
  job: jobReducer,
  jobFilters: jobFiltersReducer,
  company: companyReducer ,// <-- add jobFilters slice here
  applicant: applicantReducer // <-- add jobFilters slice here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
