import mongoose from "mongoose";
import User from "./userSchema.js";

const appointmentSchema = new mongoose.Schema({
  appointment_id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    unique: true,
  },
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String, // or use Date if storing full datetime
    required: true,
  },
  reason: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "completed"],
    default: "pending",
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
