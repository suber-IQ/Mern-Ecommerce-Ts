import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorResponse, LoadUserResponse, LoginUserResponse, RegisterUserResponse, UserState } from "../Interfaces/user.interface";


const initialState: UserState = {
  user: null,
  error: null,
  isAuthenticated: false,
  loading: false,
}


const userSlice = createSlice({
      name: 'user',
      initialState,
      reducers: {
            loginUserRequest: (state) => {
                  state.loading = true;
                  state.isAuthenticated = false;
            },
            registerUserRequest: (state) => {
                  state.loading = true;
                  state.isAuthenticated = false;
            },
            loadUserRequest: (state) => {
                  state.loading = true;
                  state.isAuthenticated = false;
            },
            loginUserSuccess: (state, action: PayloadAction<LoginUserResponse>) => {
                  state.loading = false;
                  state.isAuthenticated = true;
                  state.user = action.payload.user;
            },
            registerUserSuccess: (state, action: PayloadAction<RegisterUserResponse>) => {
                  state.loading = false;
                  state.isAuthenticated = true;
                  state.user = action.payload.user;
            },
            loadUserSuccess: (state, action: PayloadAction<LoadUserResponse>) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
            },
            logoutUserSuccess: (state) => {
                  state.loading = false;
                  state.user = null;
                  state.isAuthenticated = false;
            },
            loginUserFail: (state, action: PayloadAction<ErrorResponse>) => {
                  state.loading = false;
                  state.isAuthenticated = false;
                  state.user = null;
                  state.error = action.payload.message;
            },
            registerUserFail: (state, action: PayloadAction<ErrorResponse>) => {
                  state.loading = false;
                  state.isAuthenticated = false;
                  state.user = null;
                  state.error = action.payload.message;
            },
            loadUserFail: (state, action: PayloadAction<ErrorResponse>) => {
                  state.loading = false;
                  state.isAuthenticated = false;
                  state.user = null;
                  state.error = action.payload.message;
            },
            logoutUserFail: (state, action: PayloadAction<ErrorResponse>) => {
                  state.loading = false;
                  state.error = action.payload.message;
            },
            clearUserErrors: (state) => {
                  state.error = null;
            }

      }
}); 

export const {
      loginUserRequest,
      registerUserRequest,
      loadUserRequest,
      loginUserSuccess,
      registerUserSuccess,
      loadUserSuccess,
      loginUserFail,
      registerUserFail,
      loadUserFail,
      logoutUserFail,
      clearUserErrors
} = userSlice.actions;

export default userSlice.reducer;