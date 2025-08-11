import mongoose from "mongoose";
import User from "./userSchema.js";

const doctorSchema = new mongoose.Schema({
  department_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
  ],
  bio: {
    type: String,
    default: "",
  },
  specialization: {
    type: [String],
    required: [true, "At least one specialization is required"],
    default: [],
  },
  experienceYears: {
    type: Number,
    min: 0,
    default: 0,
  },
  license_number: {
    type: String,
    unique: true,
    required: true,
  },
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
  availability: {
    type: [String],
    enum: ["available", "unavailable"],
    default: [],
  },
  consultation_fee: {
    type: Number,
    min: 0,
    default: 0,
  },
});

const Doctor = User.discriminator("doctor", doctorSchema);
export default Doctor;
