import { IUser } from "../Login/login.interface";

export interface LogoutResponse {
      success: boolean;
      message: string;
      status: number;
}

export interface LogoutState{
      loading: boolean;
      user: IUser | null;
      isAuthenticated: boolean;
      error: string | null;
      response: LogoutResponse | null;
}