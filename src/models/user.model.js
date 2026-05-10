import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  passwordHash: String,
  role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
  isActive: { type: Boolean, default: true },
  otpCode: String,
  otpExpire: Date,
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });


export default mongoose.model("User", userSchema);