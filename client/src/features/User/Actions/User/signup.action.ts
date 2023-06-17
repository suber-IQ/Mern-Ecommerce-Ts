import axios from "axios";
import { registerUserFail, registerUserRequest, registerUserSuccess } from "../../Reducers/user.reducer";
import { RegisterUserRequest, RegisterUserResponse } from "../../Interfaces/user.interface";
import { API_ENDPOINT, AppThunk } from "../../../../store";

const signUpRoute = `${API_ENDPOINT}/register`

export const register = (signUpData: RegisterUserRequest): AppThunk => async (dispatch) => {
   try {
    dispatch(registerUserRequest());
    const response = await axios.post<RegisterUserResponse>(signUpRoute,signUpData);
    dispatch(registerUserSuccess(response.data)); 
   } catch (error: any) {      
     dispatch(registerUserFail({
      message: error.response.data.message,
      status: error.response.status
     }));
   }
}