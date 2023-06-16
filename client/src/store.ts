import {  Action, configureStore } from '@reduxjs/toolkit';
import thunk, { ThunkAction } from 'redux-thunk';
import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './features/Auth/Login/login.reducer';
import signupReducer from './features/Auth/Signup/signup.reducer';
import forgotPasswordReducer from './features/Auth/ForgotPassword/forgot.password.reducer';
import logoutReducer from './features/Auth/Logout/logout.reducer';
import resetPasswordReducer from './features/Auth/ResetPassword/reset.password.reducer';
import loadUserReducer from './features/User/LoadUser/load.user.reducer';

// Define the login Api endpoint
export const API_ENDPOINT = "http://localhost:8000/api/v1";

const rootReducer = combineReducers({
  login: loginReducer,
  user: loadUserReducer,
  logout: logoutReducer,
  signup: signupReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,

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
