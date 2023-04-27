import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';
import cloudinary from 'cloudinary';
import HTTP_STATUS from 'http-status-codes';
import catchAsyncHandler from '../../shared/middleware/catchAsyncError';
import { IUser, RegisterUserRequest, LoginUserRequest } from './auth.interfaces';
import UserModel from './auth.models';
import sendToken from '../../shared/utils/jwtToken';
import ErrorHandler from '../../shared/global/errorHandler'
import sendEmail from '../../shared/utils/sendEmail';




class UserController {

  // Register User
  public registerUser =  catchAsyncHandler(async(req: RegisterUserRequest, res: Response, next: NextFunction): Promise<void> => {
    // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //     folder: "avatars",
    //     width: 150,
    //     crop: "scale",
    //   });

      const { name, email, password } = req.body;

      const user: IUser = await UserModel.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'desk-g67372d0a5_1920_uxd0xt',
            url: 'https://res.cloudinary.com/suberiq/image/upload/v1682590677/desk-g67372d0a5_1920_uxd0xt.jpg'
        }
      });

      sendToken(user, HTTP_STATUS.OK, res);
  });

  // Login User

  public loginUser = catchAsyncHandler(async (req: LoginUserRequest,res: Response,next: NextFunction) => {
     const { email , password } = req.body;
     
    //  checking if user has given password and email both
    if(!email || !password){
      return next(new ErrorHandler('Please Enter Email & Password',HTTP_STATUS.BAD_REQUEST));
    }

    const user = await UserModel.findOne({email}).select('+password');

    if(!user){
      return next(new ErrorHandler('Invalid email or password',HTTP_STATUS.UNAUTHORIZED));
    }

   const isPasswordMatched = await user.comparePassword(password);

   if(!isPasswordMatched){
       return next(new ErrorHandler('Invalid email or password',HTTP_STATUS.UNAUTHORIZED));
   }

   sendToken(user,HTTP_STATUS.OK,res);

  });

  // Logout User

  public logoutUser = catchAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly: true
      })
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Logged Out",
      })
  });

  // Forgot Password

 public forgotPassword = catchAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const user: IUser =  await UserModel.findOne({ email: req.body.email });

    if(!user){
      return next(new ErrorHandler('User not found!',HTTP_STATUS.NOT_FOUND));
    }
     
    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}api/v1/password/reset/${resetToken}`;

  const message =   `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;


  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: `Email sent to ${user.email} successfully...`
    })
    
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message,HTTP_STATUS.INTERNAL_SERVER_ERROR))
    
  }

 });

//  reset Password

public resetPassword = catchAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // creating token hash
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user:IUser = await UserModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if(!user){
    return next(new ErrorHandler("Reset Password Token is invalid or has been expired",HTTP_STATUS.BAD_REQUEST));
  }
  
  if(req.body.password != req.body.confirmPassword){
    return next(new ErrorHandler("Password does not match",HTTP_STATUS.BAD_REQUEST))
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user,HTTP_STATUS.OK,res);

})


}


export { UserController };
