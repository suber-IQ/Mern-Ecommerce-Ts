import axios from "axios";
import { API_ENDPOINT, AppThunk } from "../../../store";
import { SignUpResponse, SignUpUserRequest } from "./signup.interface";
import { signUpFailure, signUpRequest, signUpSuccess } from "./signup.reducer";

const signUpRoute = `${API_ENDPOINT}/register`

export const signUpUser = (signUpData: SignUpUserRequest): AppThunk => async (dispatch) => {
   try {
    dispatch(signUpRequest());
    const response = await axios.post<SignUpResponse>(signUpRoute,signUpData);
    dispatch(signUpSuccess(response.data)); 
   } catch (error: any) {      
     dispatch(signUpFailure({
      message: error.response.data.message,
      status: error.response.status
     }));
   }
}