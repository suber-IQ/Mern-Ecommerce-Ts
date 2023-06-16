import axios from "axios";
import { API_ENDPOINT, AppThunk } from "../../../../store";
import { UpdatePasswordRequest, UpdatePasswordResponse } from "../../Interfaces/profile.interface";
import { updatePasswordFail, updatePasswordRequest, updatePasswordSuccess } from "../../Reducers/profile.reducer";

const updatePasswordRoute = `${API_ENDPOINT}/user/password/update`

export const updatePassword = (updatePasswordData: UpdatePasswordRequest): AppThunk => async (dispatch) => {
   try {
    dispatch(updatePasswordRequest());
    const response = await axios.put<UpdatePasswordResponse>(updatePasswordRoute,updatePasswordData);
    dispatch(updatePasswordSuccess(response.data)); 
   } catch (error: any) {      
     dispatch(updatePasswordFail({
      message: error.response.data.message,
      status: error.response.status
     }));
   }
};