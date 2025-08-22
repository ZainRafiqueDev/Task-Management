import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
 import { v4 as uuidv4 } from "uuid";

const roles = ['admin', 'teamlead', 'employee'];

// Define schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "teamlead", "employee"], default: "employee" },
  
}, { timestamps: true });


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};


export const User = mongoose.model('User', userSchema);
export const ROLES = roles;
