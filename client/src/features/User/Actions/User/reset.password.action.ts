import axios from "axios";
import { API_ENDPOINT, AppThunk } from "../../../../store";
import { ResetPasswordRequest, ResetPasswordResponse } from "../../Interfaces/forgot.password.interface";
import { resetPasswordFail, resetPasswordRequest, resetPasswordSuccess } from "../../Reducers/forgot.password.reducer";

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
            dispatch(resetPasswordFail({
                  message: error.response.data.message,
                  status: error.response.status
            }));
      }
};