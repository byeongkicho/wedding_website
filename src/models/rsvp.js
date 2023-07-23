import mongoose from "mongoose";

const rsvpSchema = new mongoose.Schema({
  firstname: { type: String, required: true, trim: true },
  lastname: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  attending: {
    type: String,
    enum: ["Yes", "No"],
    trim: true,
    required: true,
  },
  attendingList: { type: String, trim: true },
  dietary: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
});
const Rsvp = mongoose.model("Rsvp", rsvpSchema);

export default Rsvp;
