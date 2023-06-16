import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';
import cloudinary, { UploadApiResponse } from 'cloudinary';
import HTTP_STATUS from 'http-status-codes';
import catchAsyncHandler from '../../shared/middleware/catchAsyncError';
import { IUser, RegisterUserRequest, LoginUserRequest, AuthRequest } from './auth.interfaces';
import UserModel from './auth.models';
import sendToken from '../../shared/utils/jwtToken';
import ErrorHandler from '../../shared/global/errorHandler';
import sendEmail from '../../shared/utils/sendEmail';

class UserController {
  //👉 Register User
  public registerUser = catchAsyncHandler(async (req: RegisterUserRequest, res: Response, next: NextFunction): Promise<void> => {
    if (!req.body.avatar) {
      return next(new ErrorHandler('Please provide an image file', HTTP_STATUS.BAD_REQUEST));
    }

    const { secure_url, public_id }: UploadApiResponse = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
      width: 150,
      crop: 'scale'
    });

    const { name, email, password } = req.body;

    const user: IUser | null = await UserModel.create({
      name,
      email,
      password,
      avatar: {
        public_id,
        url: secure_url
      }
    });

    sendToken(user, HTTP_STATUS.CREATED, res);
  });

  //👉 Login User

  public loginUser = catchAsyncHandler(async (req: LoginUserRequest, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    //  checking if user has given password and email both
    if (!email || !password) {
      return next(new ErrorHandler('Please Enter Email & Password', HTTP_STATUS.BAD_REQUEST));
    }

    const user: IUser | null = await UserModel.findOne({ email }).select('+password');

    if (!user) {
      return next(new ErrorHandler('Invalid email or password', HTTP_STATUS.UNAUTHORIZED));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler('Invalid email or password', HTTP_STATUS.UNAUTHORIZED));
    }

    sendToken(user, HTTP_STATUS.OK, res);
  });

  //👉 Logout User

  public logoutUser = catchAsyncHandler(async (req: Request, res: Response) => {
    res.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true
    });
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Logged Out'
    });
  });

  //👉 Forgot Password

  public forgotPassword = catchAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user: IUser | null = await UserModel.findOne<IUser>({ email: req.body.email });

    if (!user) {
      return next(new ErrorHandler('User not found!', HTTP_STATUS.NOT_FOUND));
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Ecommerce Password Recovery',
        message
      });

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: `Email sent to ${user.email} successfully...`
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return next(new ErrorHandler(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR));
    }
  });

  // 👉 reset Password

  public resetPassword = catchAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // creating token hash
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user: IUser | null = await UserModel.findOne<IUser>({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return next(new ErrorHandler('Reset Password Token is invalid or has been expired', HTTP_STATUS.BAD_REQUEST));
    }

    if (req.body.newPassword != req.body.confirmPassword) {
      return next(new ErrorHandler('Password does not match', HTTP_STATUS.BAD_REQUEST));
    }

    user.password = req.body.newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, HTTP_STATUS.OK, res);
  });

  // 👉 Get User Details

  public getUserDetails = catchAsyncHandler(async (req: AuthRequest, res: Response) => {
    const user: IUser | null = await UserModel.findById<IUser>(req.user?.id);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      user
    });
  });

  // 👉 Update User Password

  public updateUserPassword = catchAsyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = (await UserModel.findById<IUser>(req.user?.id).select('+password')) as IUser;
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return next(new ErrorHandler('Old Password is incorrect', HTTP_STATUS.NOT_FOUND));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler('newPassword and confirmPassword does not match!', HTTP_STATUS.BAD_REQUEST));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendToken(user, HTTP_STATUS.OK, res);
  });

  // 👉 Update User Profile
  public updateUserProfile = catchAsyncHandler(async (req: AuthRequest, res: Response) => {
    const newUserData: Partial<IUser> = {
      name: req.body.name,
      email: req.body.email
    };

    // we will add cloudinary
    if (req.body.avatar !== '') {
      const user = await UserModel.findById<IUser>(req.user?.id);

      const imageId = user?.avatar.public_id;
      if (imageId !== undefined) {
        await cloudinary.v2.uploader.destroy(imageId);
      }
      const myCloud: UploadApiResponse = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: 'scale'
      });
      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url
      };
    }

    await UserModel.findByIdAndUpdate<IUser>(req.user?.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Update User Profile Successfully...'
    });
  });

  // 👉 Get all users(admin)

  public getAllUser = catchAsyncHandler(async (req: Request, res: Response) => {
    const users: IUser[] | null = await UserModel.find<IUser>();

    res.status(200).json({
      success: true,
      users
    });
  });

  // 👉 Get Signle User(admin)

  public getSingleUser = catchAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserModel.findById<IUser>(req.params.id);

    if (!user) {
      return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`, HTTP_STATUS.NOT_FOUND));
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      user
    });
  });

  // 👉 Update User Role(admin)

  public updateUserRole = catchAsyncHandler(async (req: Request, res: Response) => {
    const newUserData: Partial<IUser> = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role
    };

    await UserModel.findByIdAndUpdate<IUser>(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Update User Role Successfully...'
    });
  });

  //👉 Delete User(admin)

  public deleteUser = catchAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user: IUser | null = await UserModel.findById(req.params.id);

    if (!user) {
      return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`, HTTP_STATUS.NOT_FOUND));
    }

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    await UserModel.deleteOne({ _id: user._id });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'User Deleted Successfully...'
    });
  });
}

export { UserController };
