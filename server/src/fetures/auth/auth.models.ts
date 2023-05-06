import mongoose, { Model, Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { IUser } from './auth.interfaces';
import { config } from '../../config/config';


const userSchema: Schema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Please Enter Your Name'],
      maxLength: [30, 'Name cannot exceed 30 characters'],
      minLength: [4, 'Name should have more than 4 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please Enter Your Email'],
      unique: true,
      validate: [validator.isEmail, 'Please Enter a valid Email'],
    },
    password: {
      type: String,
      required: [true, 'Please Enter Your Password'],
      minLength: [8, 'Password should be greater than 8 characters'],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: 'user',
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },

});

// Password hash
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// JWT TOKEN
userSchema.methods.getJWTToken = function (): string {
  if (!config.JWT_SECRET) {
    throw new Error('JWT secret key not found');
  }
  return jwt.sign({ id: this._id }, config.JWT_SECRET, {
     expiresIn: config.JWT_EXPIRE,
  });
};

// Compare Password
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
   return await bcrypt.compare(password,this.password);
};

// Generating Password Rest Token

userSchema.methods.getResetPasswordToken = function (): string {
  // Generating Token
  const resetToken: string = crypto.randomBytes(20).toString('hex');

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

const UserModel: Model<IUser> = mongoose.model<IUser>('User',userSchema);
export default UserModel;

