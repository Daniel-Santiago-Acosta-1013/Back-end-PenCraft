import { Schema } from 'mongoose';

export const CompanySchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export interface CompanySchema {
  _id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  date: Date;
}
