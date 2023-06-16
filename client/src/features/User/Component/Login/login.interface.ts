

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

export interface LoginResponse{
  token: string;
  success: boolean;
  status: number;
  user: IUser
  
}

export interface LoginState{
  user: IUser | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface LoginUserRequest{
  email: string;
  password: string;
}

export interface ErrorResponse{
  message: string;
  status: number | null;
}