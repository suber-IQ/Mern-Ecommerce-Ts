import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorResponse, LoadUserResponse, LoadUserState } from "./load.user.interface";


const initialState: LoadUserState  = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
}


const loadUserSlice = createSlice({
  name: 'userDetials',
  initialState,
    reducers: {
      loadUserRequest: (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      },
      loadUserSuccess: (state,action: PayloadAction<LoadUserResponse>) => {
         state.loading = false;
         state.isAuthenticated = true;
         state.user = action.payload.user;
      },
      loadUserFailure: (state,action: PayloadAction<ErrorResponse>) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload.message;
      },
      clearloadUserErrors: (state) => {
        state.error = null;
        state.loading = false;
      }
    },
});

export const { loadUserRequest,loadUserSuccess,loadUserFailure, clearloadUserErrors } = loadUserSlice.actions;
export default loadUserSlice.reducer;

