import { Schema } from 'mongoose';

export const UserDataSchema = new Schema({
  username: { type: String, required: true, unique: true, minlength: 4 },
  name: { type: String, required: true, minlength: 4 },
  email: { type: String, required: true, unique: true },
  description: { type: String, required: false },
  photo: { type: String, required: false },
  thumbnail: { type: String, required: false },
});

export interface UserData {
  _id: string;
  username: string;
  name: string;
  email: string;
  description: string;
  photo: string;
  thumbnail: string;
}