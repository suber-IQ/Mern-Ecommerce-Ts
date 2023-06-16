import axios from "axios";
import { API_ENDPOINT, AppThunk } from "../../../../store";
import { UserDetailsRequest, UserDetailsResponse } from "../../Interfaces/user.details.interface";
import { userDetailsFail, userDetailsRequest, userDetailsSuccess } from "../../Reducers/user.details.reducer";

const getUserDetailsRoute = `${API_ENDPOINT}/admin/user`

export const getUserDetails = (userDetailsData: UserDetailsRequest): AppThunk => async (dispatch) => {
   try {
    dispatch(userDetailsRequest());
    const { data } = await axios.get<UserDetailsResponse>(`${getUserDetailsRoute}/${userDetailsData}`);
   dispatch(userDetailsSuccess(data)); 
   } catch (error: any) {      
     dispatch(userDetailsFail({
      message: error.response.data.message,
      status: error.response.status
     }));
   }
};

