import axios from "axios";
import { API_ENDPOINT, AppThunk } from "../../../../store";
import { logoutUserFail, logoutUserSuccess } from "../../Reducers/user.reducer";

const logoutRoute = `${API_ENDPOINT}/logout`

export const logoutUser = (): AppThunk => async (dispatch) => {
   try {
      await axios.get(logoutRoute);
    dispatch(logoutUserSuccess()); 
   } catch (error: any) {      
     dispatch(logoutUserFail({
      message: error.response.data.message,
      status: error.response.status
     }));
   }
}