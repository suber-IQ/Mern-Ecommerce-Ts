import axios from "axios";
import { API_ENDPOINT, AppThunk } from "../../../store";
import { LogoutResponse } from "./logout.interface";
import { logoutFailure, logoutRequest, logoutSuccess } from "./logout.reducer";

const logoutRoute = `${API_ENDPOINT}/logout`

export const logoutUser = (): AppThunk => async (dispatch) => {
   try {
    dispatch(logoutRequest());
    const response = await axios.get<LogoutResponse>(logoutRoute);
    dispatch(logoutSuccess(response.data)); 
   } catch (error: any) {      
     dispatch(logoutFailure({
      message: error.response.data.message,
      status: error.response.status
     }));
   }
}