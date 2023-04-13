import { Schema } from 'mongoose';

export const EmployeeSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  privileges: { type: String, required: true },
});

export interface EmployeeSchema {
  _id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  privileges: string;
}
