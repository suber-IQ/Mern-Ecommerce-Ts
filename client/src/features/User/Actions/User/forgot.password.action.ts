import axios from "axios";
import { API_ENDPOINT, AppThunk } from "../../../../store";
import { ForgotPasswordRequest, ForgotPasswordResponse } from "../../Interfaces/forgot.password.interface";
import { forgotPasswordFail, forgotPasswordRequest, forgotPasswordSuccess } from "../../Reducers/forgot.password.reducer";

const forgotPasswordRoute = `${API_ENDPOINT}/password/forgot`

export const forgotPasswordUser = (forgotPasswordData: ForgotPasswordRequest): AppThunk => async (dispatch) => {
   try {
    dispatch(forgotPasswordRequest());
    const response = await axios.post<ForgotPasswordResponse>(forgotPasswordRoute,forgotPasswordData);
    dispatch(forgotPasswordSuccess(response.data)); 
   } catch (error: any) {      
     dispatch(forgotPasswordFail({
      message: error.response.data.message,
      status: error.response.status
     }));
   }
}