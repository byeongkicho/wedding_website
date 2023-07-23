import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  token: { type: String, required: true },
});

const Guest = mongoose.model("Guest", guestSchema);

export default Guest;
