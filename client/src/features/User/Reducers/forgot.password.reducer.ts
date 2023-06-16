import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ForgotPasswordResponse, ForgotPasswordState, ResetPasswordResponse } from "../Interfaces/forgot.password.interface";
import { ErrorResponse } from "../Interfaces/user.interface";


const initialState: ForgotPasswordState = {
      loading: false,
      error: null,
      message: null,
      success: false,
}

const forgotPasswordSlice = createSlice({
      name: 'forgotPassword',
      initialState,
      reducers: {
            forgotPasswordRequest: (state) => {
                  state.loading = true;
                  state.error = null;
                },
                forgotPasswordSuccess: (state, action: PayloadAction<ForgotPasswordResponse>) => {
                  state.loading = false;
                  state.message = action.payload.message;
                },
                forgotPasswordFail: (state, action: PayloadAction<ErrorResponse>) => {
                  state.loading = false;
                  state.error = action.payload.message;
                },
                resetPasswordRequest: (state) => {
                  state.loading = true;
                  state.error = null;
                },
                resetPasswordSuccess: (state, action: PayloadAction<ResetPasswordResponse>) => {
                  state.loading = false;
                  state.success = action.payload.success;
                },
                resetPasswordFail: (state, action: PayloadAction<ErrorResponse>) => {
                  state.loading = false;
                  state.error = action.payload.message;
                },
                clearErrors: (state) => {
                  state.error = null;
                },
      }
});

export const {
      forgotPasswordRequest,
      forgotPasswordSuccess,
      forgotPasswordFail,
      resetPasswordRequest,
      resetPasswordSuccess,
      resetPasswordFail,
      clearErrors,
    } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;