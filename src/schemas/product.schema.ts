import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  grossPrice: { type: Number, required: false },
  netPrice: { type: Number, required: false },
  discount: { type: Number, required: false },
  likes: { type: Number, required: false },
  src: { type: String, required: false },
  type: { type: String, required: true },
  imageUrl: { type: String, required: false },
});

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  grossPrice?: number;
  netPrice?: number;
  discount?: number;
  likes?: number;
  src?: string;
  type?: string;
  imageUrl?: string;
}
