import axios from "axios";
import { API_ENDPOINT, AppThunk } from "../../../../store";
import { LoginUserRequest, LoginUserResponse } from "../../Interfaces/user.interface";
import { loginUserFail, loginUserRequest, loginUserSuccess } from "../../Reducers/user.reducer";

const loginRoute = `${API_ENDPOINT}/login`

export const loginUser = (loginData: LoginUserRequest): AppThunk => async (dispatch) => {
   try {
    dispatch(loginUserRequest());
    const response = await axios.post<LoginUserResponse>(loginRoute,loginData);
    dispatch(loginUserSuccess(response.data)); 
   } catch (error: any) {      
     dispatch(loginUserFail({
      message: error.response.data.message,
      status: error.response.status
     }));
   }
}
