export interface IUser {
      _id: string;
      name: string;
      email: string;
      avatar: object;
      role: string;
      createdAt: string;
    }
    
    export interface SignUpResponse{
      token: string;
      success: boolean;
      status: number;
      user: IUser
      
    }
    
    export interface SignUpState{
      user: IUser | null;
      loading: boolean;
      error: string | null;
      isAuthenticated: boolean;
    }
    
    export interface SignUpUserRequest{
      name: string;
      email: string;
      password: string;
      avatar: string;
    }
    
    export interface ErrorResponse{
      message: string;
      status: number | null;
    }