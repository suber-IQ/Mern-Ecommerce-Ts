import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorResponse, ForgotPasswordResponse, ForgotPasswordState } from "./forgot.password.interface";


const initialState: ForgotPasswordState = {
      loading: false,
      error: null,
      success: false,
      message: null,
}


const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
    reducers: {
      forgotPasswordRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
      },
      forgotPasswordSuccess: (state,action: PayloadAction<ForgotPasswordResponse>) => {
            state.loading = false;
            state.message = action.payload.message;
            state.success = true;
      },
      forgotPasswordFailure: (state,action: PayloadAction<ErrorResponse>) => {
            state.loading = false;
            state.error = action.payload.message;
            state.success = false;
      },
      clearForgotPasswordState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
      }
    },
});

export const {   forgotPasswordRequest,
      forgotPasswordSuccess,
      forgotPasswordFailure,
      clearForgotPasswordState, } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;