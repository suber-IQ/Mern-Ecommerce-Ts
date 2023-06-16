import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorResponse, SignUpResponse, SignUpState } from "./signup.interface";


const initialState: SignUpState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
}


const signUpSlice = createSlice({
  name: 'login',
  initialState,
    reducers: {
      signUpRequest: (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      },
      signUpSuccess: (state,action: PayloadAction<SignUpResponse>) => {
         state.loading = false;
         state.user = action.payload.user;
         state.isAuthenticated = true;
      },
      signUpFailure: (state,action: PayloadAction<ErrorResponse>) => {
        state.loading = false;
        state.error = action.payload.message;
        state.isAuthenticated = false;
      },
      clearErrors: (state) => {
        state.error = null;
      }
    },
});

export const { signUpRequest, signUpSuccess, signUpFailure, clearErrors } = signUpSlice.actions;
export default signUpSlice.reducer;