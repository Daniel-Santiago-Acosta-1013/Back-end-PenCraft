import { prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';

export class User {
  @prop({ required: true, unique: true, minlength: 4 })
  username: string;

  @prop({ required: true, minlength: 8 })
  password: string;
}

export const UserSchema = new Schema(User);
