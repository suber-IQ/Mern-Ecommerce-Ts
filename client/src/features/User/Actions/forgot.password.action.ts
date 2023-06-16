import axios from "axios";
import { API_ENDPOINT, AppThunk } from "../../../store";
import { ForgotPasswordResponse, ForgotPasswordUserRequest } from "../Component/ForgotPassword/forgot.password.interface";
import { forgotPasswordFailure, forgotPasswordRequest, forgotPasswordSuccess } from "../Component/ForgotPassword/forgot.password.reducer";

const forgotPasswordRoute = `${API_ENDPOINT}/password/forgot`

export const forgotPasswordUser = (forgotPasswordData: ForgotPasswordUserRequest): AppThunk => async (dispatch) => {
   try {
    dispatch(forgotPasswordRequest());
    const response = await axios.post<ForgotPasswordResponse>(forgotPasswordRoute,forgotPasswordData);
    dispatch(forgotPasswordSuccess(response.data)); 
   } catch (error: any) {      
     dispatch(forgotPasswordFailure({
      message: error.response.data.message,
      status: error.response.status
     }));
   }
}