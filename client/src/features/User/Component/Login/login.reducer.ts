import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginState,LoginResponse, ErrorResponse } from "./login.interface";


const initialState: LoginState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
}


const loginSlice = createSlice({
  name: 'login',
  initialState,
    reducers: {
      loginRequest: (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      },
      loginSuccess: (state,action: PayloadAction<LoginResponse>) => {
         state.loading = false;
         state.user = action.payload.user;
         state.isAuthenticated = true;
      },
      loginFailure: (state,action: PayloadAction<ErrorResponse>) => {
        state.loading = false;
        state.error = action.payload.message;
        state.isAuthenticated = false;
      },
      clearErrors: (state) => {
        state.error = null;
        state.loading = false;
      }
    },
});

export const { loginRequest, loginSuccess, loginFailure, clearErrors } = loginSlice.actions;
export default loginSlice.reducer;

