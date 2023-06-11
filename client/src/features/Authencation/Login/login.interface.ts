export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar: object;
  role: string;
  createdAt: string;
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