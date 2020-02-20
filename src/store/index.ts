import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
  ThunkAction,
  Action
} from '@reduxjs/toolkit';
// We'll use redux-logger just as an example of adding another middleware
import logger from 'redux-logger';
// basically f your state was a counter, redux-batch would convert two calls to INCREMENT into one call of INCREMENT_2
import { reduxBatch } from '@manaflair/redux-batch';

import devices from './devices';

const rootReducer = combineReducers({
  devices: devices.reducer
});
const middleware = [...getDefaultMiddleware(), logger];

export const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [reduxBatch]
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
