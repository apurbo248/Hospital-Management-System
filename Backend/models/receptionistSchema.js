import mongoose from "mongoose";
import User from "./userSchema.js";

const receptionistSchema = new mongoose.Schema({
  // morning,evening,night
  shift: {
    type: String,
    default: "",
  },
});

const Receptionist = User.discriminator("receptionist", receptionistSchema);
export default Receptionist;
