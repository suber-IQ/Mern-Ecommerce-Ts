import { Response } from 'express';
import { config } from '../../config/config';
import { IUser } from '../../fetures/auth/auth.interfaces';

const sendToken = (user: IUser,statusCode: number, res: Response)=> {
    const token = user.getJWTToken();

    // options for cookie

    const options = {
        expires: new Date(
            Date.now() + Number(config.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token
    });
}

export default sendToken;