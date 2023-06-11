import axios from "axios";
import {  LoginResponse, LoginUserRequest } from "./login.interface";
import { loginFailure, loginRequest, loginSuccess } from "./login.reducer";
import { API_ENDPOINT, AppThunk } from "../../../store";

const loginRoute = `${API_ENDPOINT}/login`

export const loginUser = (loginData: LoginUserRequest): AppThunk => async (dispatch) => {
   try {
    dispatch(loginRequest());
    const response = await axios.post<LoginResponse>(loginRoute,loginData);
    dispatch(loginSuccess(response.data)); 
   } catch (error: any) {      
     dispatch(loginFailure({
      message: error.response.data.message,
      status: error.response.status
     }));
   }
}