export interface IUser {
      _id: string;
      name: string;
      email: string;
      avatar: object;
      role: string;
      createdAt: string;
}

export interface ResetPasswordResponse{
      token: string;
      success: boolean;
      status: number;
      user: IUser
      
    }
    
    export interface ResetPasswordState{
      message: ResetPasswordResponse | null;
      loading: boolean;
      error: string | null;
    }
    
    export interface ResetPasswordRequest{
      token: string | undefined;
      newPassword: string;
      confirmPassword: string;
    }
    
    export interface ErrorResponse{
      message: string;
      status: number | null;
    }