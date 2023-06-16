import { IUser } from "./user.interface";

export interface ProfileState {
   loading: boolean;
   isUpdated: boolean;
   isDeleted: boolean;
   message: string | null;
   error: string | null;
}




// Update Profile
export interface UpdateProfileRequest {
      name: string;
      email: string;
      avatar: string;
}
export interface UpdateProfileResponse {
      status: number
      success: boolean;
      message: string;
}

// Update Password
export interface UpdatePasswordRequest {
       oldPassword: string;
       newPassword: string;
       confirmPassword: string;
}
export interface UpdatePasswordResponse {
      token: string | null;
      success: boolean;
      status: number;
      user: IUser | null;
}

// Update User by Admin
export interface UpdateUserRequest {
   id: string | undefined;
   name: string;
   email: string;
   role: string;
}

export interface UpdateUserResponse {
      status: number
      success: boolean;
      message: string;     
}

// Delete User by Admin 
export interface DeleteUserRequest {
      id: string | undefined;
}

export interface DeleteUserResponse {
      status: number
      success: boolean;
      message: string; 
}          