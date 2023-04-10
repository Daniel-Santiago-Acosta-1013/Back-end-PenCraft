import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: false },
});

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}
