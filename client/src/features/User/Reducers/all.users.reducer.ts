import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AllUsersResponse, AllUsersState } from "../Interfaces/all.users.interface";
import { ErrorResponse } from "../Interfaces/user.interface";

const initialState: AllUsersState = {
      loading: false,
      users: [],
      error: null,
}

const allUsersSlice = createSlice({
      name: 'allUsers',
      initialState,
      reducers: {
        allUsersRequest: (state) => {
          state.loading = true;
        },
        allUsersSuccess: (state, action: PayloadAction<AllUsersResponse>) => {
          state.loading = false;
          state.users = action.payload.users;
        },
        allUsersFail: (state, action: PayloadAction<ErrorResponse>) => {
          state.loading = false;
          state.error = action.payload.message;
        },
        clearErrors: (state) => {
          state.error = null;
        },
      },
    });
    
export const {
      allUsersRequest,
      allUsersSuccess,
      allUsersFail,
      clearErrors,
    } = allUsersSlice.actions;
    
export default allUsersSlice.reducer;