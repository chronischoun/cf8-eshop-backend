import { Schema, model, Document } from "mongoose"; 
import bcrypt from "bcryptjs";
export interface Iusers extends Document { 
  email: string ; 
  password: string; 
  role: "user" | "admin" ; 
  createdAt : Date ; 
  comparePassword(password: string): Promise<boolean>;
}
const UserSchema = new Schema<Iusers>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" }
}, { timestamps: true }); 

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;  //New password or not
  
  this.password = await bcrypt.hash(this.password, 10);
});
// Compare password
UserSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};


export const User = model<Iusers>("User", UserSchema);
