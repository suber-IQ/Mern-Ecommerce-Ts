import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {  DeleteUserResponse, ProfileState,  UpdatePasswordResponse,  UpdateProfileResponse, UpdateUserResponse } from "../Interfaces/profile.interface";
import { ErrorResponse } from "../Interfaces/user.interface";

const initialState : ProfileState = {
      loading: false,
      isUpdated: false,
      isDeleted: false,
      message: null,
      error: null,
} 


const profileSlice = createSlice({
      name: 'profile',
      initialState,
      reducers: {
            updateProfileRequest: (state) => {
                  state.loading = true;
                },
                updateProfileSuccess: (state, action: PayloadAction<UpdateProfileResponse>) => {
                  state.loading = false;
                  state.isUpdated = action.payload.success;
                },
                updateProfileFail: (state, action: PayloadAction<ErrorResponse>) => {
                  state.loading = false;
                  state.error = action.payload.message;
                },
                updateProfileReset: (state) => {
                  state.isUpdated = false;
                },
                updatePasswordRequest: (state) => {
                  state.loading = true;
                },
                updatePasswordSuccess: (state, action: PayloadAction<UpdatePasswordResponse>) => {
                  state.loading = false;
                  state.isUpdated = action.payload.success;
                },
                updatePasswordFail: (state, action: PayloadAction<ErrorResponse>) => {
                  state.loading = false;
                  state.error = action.payload.message;
                },
                updatePasswordReset: (state) => {
                  state.isUpdated = false;
                },
                updateUserRequest: (state) => {
                  state.loading = true;
                },
                updateUserSuccess: (state, action: PayloadAction<UpdateUserResponse>) => {
                  state.loading = false;
                  state.isUpdated = action.payload.success;
                },
                updateUserFail: (state, action: PayloadAction<ErrorResponse>) => {
                  state.loading = false;
                  state.error = action.payload.message;
                },
                updateUserReset: (state) => {
                  state.isUpdated = false;
                },
                deleteUserRequest: (state) => {
                  state.loading = true;
                },
                deleteUserSuccess: (state, action: PayloadAction<DeleteUserResponse>) => {
                  state.loading = false;
                  state.isDeleted = action.payload.success;
                  state.message = action.payload.message;
                },
                deleteUserFail: (state, action: PayloadAction<ErrorResponse>) => {
                  state.loading = false;
                  state.error = action.payload.message;
                },
                deleteUserReset: (state) => {
                  state.isDeleted = false;
                },
                clearErrors: (state) => {
                  state.error = null;
                },
      }
});

export const {
      updateProfileRequest,
      updateProfileSuccess,
      updateProfileFail,
      updateProfileReset,
      updatePasswordRequest,
      updatePasswordSuccess,
      updatePasswordFail,
      updatePasswordReset,
      updateUserRequest,
      updateUserSuccess,
      updateUserFail,
      updateUserReset,
      deleteUserRequest,
      deleteUserSuccess,
      deleteUserFail,
      deleteUserReset,
      clearErrors,
    } = profileSlice.actions;
    
export default profileSlice.reducer;