import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, minlength: 4 },
  password: { type: String, required: true, minlength: 8 },
});

export interface User {
  _id: string;
  username: string;
  password: string;
}
