import mongoose from "mongoose";

const options = { discriminatorKey: "role", timestamps: true };

const baseUserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    profilePic: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: [
        "admin",
        "doctor",
        "receptionist",
        "patient",
        "nurse",
        "pharmacist",
        "lab_technician",
      ],
      default: "patient",
    },
    gender: {
      type: String,
      default: "",
    },
    blood_type: {
      type: String,

      default: "",
    },

    dateOfBirth: {
      type: Date,
      default: "1900-01-01",
    },
    emergency_contact_name: {
      type: String,
      default: "",
    },
    emergency_contact_phone: {
      type: String,
      default: "",
    },
  },
  options
);

const User = mongoose.model("User", baseUserSchema);
export default User;
