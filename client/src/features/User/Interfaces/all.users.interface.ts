import { IUser } from "./user.interface";

export interface AllUsersState {
      loading: boolean;
      users: IUser[] | null;
      error: string | null;
}


// All Users by admin
export interface AllUsersResponse{
      success: boolean;
      status: number;
      users: IUser[] | null;     
}