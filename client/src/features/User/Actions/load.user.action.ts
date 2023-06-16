import axios from "axios";
import { API_ENDPOINT, AppThunk } from "../../../store";
import { LoadUserResponse } from "../Interfaces/user.interface";
import { loadUserFail, loadUserRequest, loadUserSuccess } from "../Reducers/user.reducer";

const loadUserRoute = `${API_ENDPOINT}/user/me`

export const loadUser = (): AppThunk => async (dispatch) => {
   try {
    dispatch(loadUserRequest());
    const response = await axios.get<LoadUserResponse>(loadUserRoute);
    dispatch(loadUserSuccess(response.data)); 
   } catch (error: any) {      
     dispatch(loadUserFail({
      message: error.response.data.message,
      status: error.response.status
     }));
   }
}
