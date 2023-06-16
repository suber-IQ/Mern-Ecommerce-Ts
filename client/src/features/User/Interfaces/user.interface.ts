
export interface IUser{
      name: string;
      email: string;
      password?: string;
      avatar: {
          public_id: string;
          url: string;
      };
      role: string;
      createdAt: Date;
      resetPasswordToken?: string;
      resetPasswordExpire?: Date;
}
  
export interface UserState{
      loading: boolean;
      isAuthenticated: boolean;
      user: IUser | null;
      error: string | null;
}

export interface ErrorResponse{
      message: string;
      status: number | null;
}

// Login Request and Response
export interface LoginUserRequest{
      email: string;
      password: string;
}

export interface LoginUserResponse{
      token: string | null;
      success: boolean;
      status: number;
      user: IUser | null;
}

// Register Request and Response
export interface RegisterUserRequest{
      name: string;
      email: string;
      password: string;
      avatar: string;
}

export interface RegisterUserResponse{
      token: string | null;
      success: boolean;
      status: number;
      user: IUser | null;
}   

// LoadUser  Response
export interface LoadUserResponse{
      success: boolean;
      status: number;
      user: IUser | null;
}

// Logout Response
export interface LogoutResponse {
      success: boolean;
      message: string | null;
      status: number;
}
