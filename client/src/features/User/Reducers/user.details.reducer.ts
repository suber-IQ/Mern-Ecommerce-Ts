import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserDetailsResponse, UserDetailsState } from "../Interfaces/user.details.interface";
import { ErrorResponse } from "../Interfaces/user.interface";


const initialState: UserDetailsState ={
       loading: false,
       user: null,
       error: null,
}

const userDetailsSlice = createSlice({
      name: 'userDetails',
      initialState,
      reducers: {
            userDetailsRequest: (state) => {
                  state.loading = true;
                },
                userDetailsSuccess: (state, action: PayloadAction<UserDetailsResponse>) => {
                  state.loading = false;
                  state.user = action.payload.user;
                },
                userDetailsFail: (state, action: PayloadAction<ErrorResponse>) => {
                  state.loading = false;
                  state.error = action.payload.message;
                },
                clearErrors: (state) => {
                  state.error = null;
                },
      }
});

export const {
      userDetailsRequest,
      userDetailsSuccess,
      userDetailsFail,
      clearErrors,
} = userDetailsSlice.actions;
    
export default userDetailsSlice.reducer;