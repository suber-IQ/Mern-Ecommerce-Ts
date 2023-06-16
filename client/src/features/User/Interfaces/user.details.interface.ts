import { IUser } from "./user.interface";

export interface UserDetailsState {
      loading: boolean;
      user: IUser | null;
      error: string | null;
}

// User Details
export interface UserDetailsRequest{
      id: string;
}

export interface UserDetailsResponse {
      status: number;
      success: boolean;
      user: IUser | null;
}