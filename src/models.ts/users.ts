import { Schema, model, Document } from "mongoose"; 

export interface Iusers extends Document { 
  email: string ; 
  password: string; 
  role: "user" | "admin" ; 
  createdAt : Date ; 
}
const UserSchema = new Schema<Iusers>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" }
}, { timestamps: true });

