import { IUser } from "./user.interface";

export interface ForgotPasswordState {
      loading: boolean;
      error: string | null;
      message: string | null;
      success: boolean;
}



// Forgot Password
export interface ForgotPasswordRequest {
      email: string;
}

export interface ForgotPasswordResponse{
      success: boolean;
      status: number;
      message: string;      
}


//Reset Password 
export interface ResetPasswordRequest{
       token: string | null;
       newPassword: string;
       confirmPassword: string;          
}

export interface ResetPasswordResponse{
      token: string | null;
      success: boolean;
      status: number;
      user: IUser | null;     
}