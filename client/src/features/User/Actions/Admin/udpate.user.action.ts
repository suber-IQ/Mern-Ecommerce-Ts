import axios from "axios";
import { API_ENDPOINT, AppThunk } from "../../../../store";
import { UpdateUserRequest, UpdateUserResponse } from "../../Interfaces/profile.interface";
import { updateUserFail, updateUserRequest, updateUserSuccess } from "../../Reducers/profile.reducer";

const updateUserRoute = `${API_ENDPOINT}/admin/user`

export const updateUser = (updateUserData: UpdateUserRequest): AppThunk => async (dispatch) => {
   try {
    dispatch(updateUserRequest());
    const { data } = await axios.put<UpdateUserResponse>(`${updateUserRoute}/${updateUserData.id}`,{
       name: updateUserData.name,
       email: updateUserData.email,
       role: updateUserData.role
    });
   dispatch(updateUserSuccess(data)); 
   } catch (error: any) {      
     dispatch(updateUserFail({
      message: error.response.data.message,
      status: error.response.status
     }));
   }
};

