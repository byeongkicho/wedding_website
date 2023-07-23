import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: { type: String, required: true, trim: true },
  createdAt: { type: Date, required: true, default: Date.now, trim: true },
  createdAt: { type: Date, required: true, default: Date.now, trim: true },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const userModel = mongoose.model("userModel", userSchema);

export default userModel;
