import axios from "axios";
import { API_ENDPOINT, AppThunk } from "../../../../store";
import { UpdateProfileRequest, UpdateProfileResponse } from "../../Interfaces/profile.interface";
import { updateProfileFail, updateProfileRequest, updateProfileSuccess } from "../../Reducers/profile.reducer";

const updateProfileRoute = `${API_ENDPOINT}/user/profile/update`

export const updatePofile = (profileData: UpdateProfileRequest): AppThunk => async (dispatch) => {
   try {
    dispatch(updateProfileRequest());
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const response = await axios.put<UpdateProfileResponse>(updateProfileRoute,profileData,config);
    dispatch(updateProfileSuccess(response.data)); 
   } catch (error: any) {      
     dispatch(updateProfileFail({
      message: error.response.data.message,
      status: error.response.status
     }));
   }
};