/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import schemaReducer from '../reducers/schema';
import featureFlagsReducer from '../reducers/featureFlags';

export const store = configureStore({
  reducer: {
    schema: schemaReducer,
    featureFlags: featureFlagsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
