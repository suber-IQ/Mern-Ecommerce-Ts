import {  Action, configureStore } from '@reduxjs/toolkit';
import thunk, { ThunkAction } from 'redux-thunk';
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './features/User/Reducers/user.reducer';
import profileReducer from './features/User/Reducers/profile.reducer';
import forgotPasswordReducer from './features/User/Reducers/forgot.password.reducer';
import allUsersReducer from './features/User/Reducers/all.users.reducer';
import userDetailsReducer from './features/User/Reducers/user.details.reducer';

// Define the login Api endpoint
export const API_ENDPOINT = "http://localhost:8000/api/v1";

const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  allUsers: allUsersReducer,
  userDetials: userDetailsReducer

});

// Check if the DevTools extension is available


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,RootState,unknown,Action<string>>;

export default store;
