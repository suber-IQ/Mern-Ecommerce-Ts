import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ErrorResponse, ResetPasswordResponse, ResetPasswordState } from "./reset.password.interface";

const initialState: ResetPasswordState = {
      message: null,
      loading: false,
      error: null,
}


const resetPasswordSlice = createSlice({
      name: "resetPassword",
      initialState,
      reducers: {
            resetPasswordRequest: (state) => {
                  state.loading = true;
                  state.error = null;
            },
            resetPasswordSuccess: (state, action: PayloadAction<ResetPasswordResponse>) => {
                  state.loading = false;
                  state.message = action.payload;
            },
            resetPasswordFailure: (state, action: PayloadAction<ErrorResponse>) => {
                  state.loading = false;
                  state.error = action.payload.message;
            },
            clearRessetPasswordErrors: (state) => {
                  state.error = null;
                  state.loading = false;
            }

      },
});

export const { resetPasswordRequest, resetPasswordSuccess, resetPasswordFailure,clearRessetPasswordErrors } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;