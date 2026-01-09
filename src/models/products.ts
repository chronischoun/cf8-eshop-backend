import { Schema, model, Document } from "mongoose";

export interface IProducts extends Document {
  title: string;
  author: string ; 
  description: string;
  price: number;
  stock: number;
  image: string;
}

const ProductSchema = new Schema<IProducts>({
  title: { type: String, required: true },
  author:{ type: String ,required: true} , 
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  image: String
}, { timestamps: true });

export default model<IProducts>("Products", ProductSchema);