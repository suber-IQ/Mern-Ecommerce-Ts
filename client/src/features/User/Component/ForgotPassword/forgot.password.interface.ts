    
    export interface ForgotPasswordResponse{
      success: boolean;
      status: number;
      message: string;
      
    }
    
    export interface ForgotPasswordState{
      loading: boolean;
      error: string | null;
      success: boolean;
      message: string | null;
    }
    
    export interface ForgotPasswordUserRequest{
      email: string;
    }
    
    export interface ErrorResponse{
      message: string;
      status: number | null;
    }