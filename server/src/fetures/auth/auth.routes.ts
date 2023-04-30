import express, { Router } from 'express';
import { UserController } from './auth.controllers';
import AuthController from '../../shared/middleware/auth';

class AuthRoutes{
    private router: Router;
    private UserController = new UserController();

    constructor(){
        this.router = express.Router();
    }

    public routes(): Router{

        // 👉 User & password Authentication
        this.router.post('/register',this.UserController.registerUser);
        this.router.post('/login',this.UserController.loginUser);
        this.router.post('/password/forgot',this.UserController.forgotPassword);
        this.router.get('/logout',this.UserController.logoutUser);
        this.router.put('/password/reset/:token',this.UserController.resetPassword);
        this.somePrivateRoutes();

        return this.router;
    }
    private somePrivateRoutes(): void {
        // 👉 User Routes

        this.router.get('/user/me',AuthController.isAuthenticateUser,this.UserController.getUserDetails);
        this.router.put('/user/password/update',AuthController.isAuthenticateUser,this.UserController.updateUserPassword);
        this.router.put('/user/profile/update',AuthController.isAuthenticateUser,this.UserController.updateUserProfile);

        // 👉 Admin User update user

         this.router.get('/admin/users',AuthController.isAuthenticateUser,AuthController.authorizeRoles('admin'),this.UserController.getAllUser);
         
        this.router.route('/admin/user/:id').all(AuthController.isAuthenticateUser,AuthController.authorizeRoles("admin")).get(this.UserController.getSingleUser).put(this.UserController.updateUserRole).delete(this.UserController.deleteUser);
          
    }
    
}

export const userRoutes: AuthRoutes = new AuthRoutes();




