export interface IUser {
  name: string;
email: string;
password: string;
avatar: {
    public_id: string;
    url: string;
};
role: string;
createdAt: Date;
resetPasswordToken?: string;
resetPasswordExpire?: Date;

}

    
    export interface LoadUserResponse{
      success: boolean;
      status: number;
      user: IUser
    }
    
    export interface LoadUserState{
      user: IUser | null;
      isAuthenticated: boolean;
      loading: boolean;
      error: string | null;
    }
    
    export interface ErrorResponse{
      message: string;
      status: number | null;
    }