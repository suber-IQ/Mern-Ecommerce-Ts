import { AppThunk } from "../../../../store";
import { clearUserErrors } from "../../Reducers/user.reducer";

export const clearErrors = (): AppThunk => async (dispatch) => {
    dispatch(clearUserErrors);
};