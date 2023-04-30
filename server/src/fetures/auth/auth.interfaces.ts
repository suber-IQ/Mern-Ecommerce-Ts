import { Document } from 'mongoose';
import { Request } from 'express';

export interface IUser extends Document{
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
   
    getJWTToken(): string;
    isModified(field: string): boolean;
    comparePassword(password: string) : Promise<boolean>
    getResetPasswordToken(): string;
}


export interface RegisterUserRequest extends Request {
    body: {
        name: string;
        email: string;
        password: string;
        avatar: string;
    }
};

export interface LoginUserRequest extends Request {
   body:{
    email: string;
    password: string;
   }
};


export interface AuthRequest extends Request {
    user?: IUser;
};



