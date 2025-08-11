import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import { generateSequentialUserId } from "../utils/generateUserId.js";

import Doctor from "../models/doctorSchema.js";
import Receptionist from "../models/receptionistSchema.js";
import Admin from "../models/adminSchema.js";
import Patient from "../models/patientSchema.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      phone,
      address,
      profilePic,
      specialization,
      license_number,
      availability,
      consultation_fee,
      experienceYears,
      appointments,
      shift,
      accessLevel,
      gender,
      blood_type,
      dateOfBirth,
      emergency_contact_name,
      emergency_contact_phone,
      medical_history,
      bio,
      department_id,
    } = req.body;

    console.log(department_id);
    // Basic validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Prepare shared fields
    const hashPassword = await bcrypt.hash(password, 10);
    const userId = await generateSequentialUserId();

    const baseData = {
      userId,
      name,
      email,
      password: hashPassword,
      role,
      phone,
      address,
      profilePic,
      gender,
      blood_type,
      dateOfBirth,
      emergency_contact_name,
      emergency_contact_phone,
    };

    let newUser;

    // Role-specific logic
    switch (role) {
      case "doctor":
        newUser = new Doctor({
          ...baseData,
          department_id,
          bio,
          specialization,
          experienceYears,
          appointments,
          consultation_fee,
          license_number,
          availability,
        });
        break;

      case "receptionist":
        newUser = new Receptionist({
          ...baseData,
          shift,
        });
        break;

      case "admin":
        newUser = new Admin({
          ...baseData,
          accessLevel,
        });
        break;

      case "patient":
      default:
        newUser = new Patient({
          ...baseData,
          medical_history,
        });
        break;
    }

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        userId: newUser.userId,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });

    console.log("✅ Registered:", newUser.email);
  } catch (error) {
    console.error("❌ Registration error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
