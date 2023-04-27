import express, { Router } from 'express';
import { UserController } from './auth.controllers';

class AuthRoutes{
    private router: Router;
    private UserController = new UserController();

    constructor(){
        this.router = express.Router();
    }

    public routes(): Router{
        this.router.post('/register',this.UserController.registerUser);
        this.router.post('/login',this.UserController.loginUser);
        this.router.post('/password/forgot',this.UserController.forgotPassword);
        this.router.get('/logout',this.UserController.logoutUser);
        this.router.put('/password/reset/:token',this.UserController.resetPassword);
        return this.router;
    }
}

export const userRoutes: AuthRoutes = new AuthRoutes();