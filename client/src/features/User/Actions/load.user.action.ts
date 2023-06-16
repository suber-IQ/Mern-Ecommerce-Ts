import axios from "axios";
import { API_ENDPOINT, AppThunk } from "../../../store";
import { LoadUserResponse } from "../Component/LoadUser/load.user.interface";
import { loadUserFailure, loadUserRequest, loadUserSuccess } from "../Component/LoadUser/load.user.reducer";

const loadUserRoute = `${API_ENDPOINT}/user/me`

export const loadUser = (): AppThunk => async (dispatch) => {
   try {
    dispatch(loadUserRequest());
    const response = await axios.get<LoadUserResponse>(loadUserRoute);
    dispatch(loadUserSuccess(response.data)); 
   } catch (error: any) {      
     dispatch(loadUserFailure({
      message: error.response.data.message,
      status: error.response.status
     }));
   }
}
