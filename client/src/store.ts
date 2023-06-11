import {  Action, configureStore } from '@reduxjs/toolkit';
import thunk, { ThunkAction } from 'redux-thunk';
import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './features/User/Login/login.reducer';
import signupReducer from './features/User/Signup/signup.reducer';
import forgotPasswordReducer from './features/User/ForgotPassword/forgot.password.reducer';

// Define the login Api endpoint
export const API_ENDPOINT = "http://localhost:8000/api/v1";

const rootReducer = combineReducers({
  login: loginReducer,
  signup: signupReducer,
  forgotPassword: forgotPasswordReducer

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
