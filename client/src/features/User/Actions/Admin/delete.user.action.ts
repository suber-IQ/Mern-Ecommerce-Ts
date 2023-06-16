import axios from "axios";
import { API_ENDPOINT, AppThunk } from "../../../../store";
import { DeleteUserRequest, DeleteUserResponse } from "../../Interfaces/profile.interface";
import { deleteUserFail, deleteUserRequest, deleteUserSuccess } from "../../Reducers/profile.reducer";

const deleteUserRoute = `${API_ENDPOINT}/admin/user`

export const deleteUser = (deleteUserData: DeleteUserRequest): AppThunk => async (dispatch) => {
   try {
    dispatch(deleteUserRequest());
    const { data } = await axios.delete<DeleteUserResponse>(`${deleteUserRoute}/${deleteUserData}`);
   dispatch(deleteUserSuccess(data)); 
   } catch (error: any) {      
     dispatch(deleteUserFail({
      message: error.response.data.message,
      status: error.response.status
     }));
   }
};

