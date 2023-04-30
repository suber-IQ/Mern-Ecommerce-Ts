import { Request, Response, NextFunction} from 'express';
import HTTP_STATUS from 'http-status-codes'
import Jwt from 'jsonwebtoken';
import catchAsyncHandler from './catchAsyncError';
import ErrorHandler from '../global/errorHandler';
import { config } from '../../config/config';
import UserModel from '../../fetures/auth/auth.models';
import { AuthRequest, IUser } from '../../fetures/auth/auth.interfaces';



class AuthController{
    public static isAuthenticateUser = catchAsyncHandler(async (req: AuthRequest,res: Response, next: NextFunction) => {
        const { token } = req.cookies;

        if(!token){
            return next(new ErrorHandler('Please Login to access this resource',HTTP_STATUS.UNAUTHORIZED));
        }
        const decodeData = await Jwt.verify(token, config.JWT_SECRET) as {id: string};
        req.user = await UserModel.findById(decodeData.id) as IUser;

        next();
    });




    public static authorizeRoles(...roles: string[]) {
        return (
          req: AuthRequest,
          res: Response<any, Record<string, any>>,
          next: NextFunction
        ) => {
          const userRole = req.user?.role;
    
          if (!userRole || !roles.includes(userRole)) {
            return res.status(HTTP_STATUS.FORBIDDEN).json({
              status: 'failed',
              message: `Role: ${userRole} is not allowed to access this resource`,
            });
          }
    
          next();
        };
      }
      

}



export default AuthController;



