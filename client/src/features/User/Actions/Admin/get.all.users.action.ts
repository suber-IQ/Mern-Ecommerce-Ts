import axios from "axios";
import { API_ENDPOINT, AppThunk } from "../../../../store";
import { AllUsersResponse } from "../../Interfaces/all.users.interface";
import { allUsersFail, allUsersRequest, allUsersSuccess } from "../../Reducers/all.users.reducer";

const getAllUsersRoute = `${API_ENDPOINT}/admin/users`

export const getAllUsers = (): AppThunk => async (dispatch) => {
   try {
    dispatch(allUsersRequest());
    const { data } = await axios.get<AllUsersResponse>(getAllUsersRoute);
   dispatch(allUsersSuccess(data)); 

   } catch (error: any) {      
     dispatch(allUsersFail({
      message: error.response.data.message,
      status: error.response.status
     }));
   }
};

