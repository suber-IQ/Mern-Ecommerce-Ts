import axios from "axios";
import { API_ENDPOINT, AppThunk } from "../../../store";
import { ResetPasswordRequest, ResetPasswordResponse } from "../Component/ResetPassword/reset.password.interface";
import { resetPasswordFailure, resetPasswordRequest, resetPasswordSuccess } from "../Component/ResetPassword/reset.password.reducer";

const resetPasswordRoute = `${API_ENDPOINT}/password/reset`

export const resetPassword = (resetPasswordData: ResetPasswordRequest): AppThunk => async (dispatch) => {
      try {
            dispatch(resetPasswordRequest())
            const response = await axios.put<ResetPasswordResponse>(`${resetPasswordRoute}/${resetPasswordData.token}`,{
                  newPassword: resetPasswordData.newPassword,
                  confirmPassword: resetPasswordData.confirmPassword
            });
            dispatch(resetPasswordSuccess(response.data)); 
      } catch (error: any) {
            dispatch(resetPasswordFailure({
                  message: error.response.data.message,
                  status: error.response.status
            }));
      }
};