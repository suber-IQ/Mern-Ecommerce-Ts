import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { LogoutResponse, LogoutState } from "./logout.interface";
import { ErrorResponse } from "../Login/login.interface";

const initialState: LogoutState = {
      loading: false,
      user: null,
      isAuthenticated: false,
      error: null,
      response: null,
}


const logoutSlice = createSlice({
      name: "logout",
      initialState,
      reducers: {
            logoutRequest: (state) => {
                  state.loading = true;
                  state.error = null;
                  state.response = null;
            },
            logoutSuccess: (state, action: PayloadAction<LogoutResponse>) => {
                  state.loading = false;
                  state.response = action.payload;
                  state.user = null;
                  state.isAuthenticated = false;
            },
            logoutFailure: (state, action: PayloadAction<ErrorResponse>) => {
                  state.loading = false;
                  state.error = action.payload.message;
            },
            clearLogoutErrors: (state) => {
                  state.error = null;
                  state.loading = false;
            }

      },
});

export const { logoutRequest, logoutSuccess, logoutFailure,clearLogoutErrors } = logoutSlice.actions;
export default logoutSlice.reducer;