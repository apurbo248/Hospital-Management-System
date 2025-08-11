import mongoose from "mongoose";
import User from "./userSchema.js";

const patientSchema = new mongoose.Schema({
  medical_history: {
    type: String,
    default: "",
  },
});

const Patient = User.discriminator("patient", patientSchema);
export default Patient;
