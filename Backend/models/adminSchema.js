import mongoose from "mongoose";
import User from "./userSchema.js";

const adminSchema = new mongoose.Schema({
  accessLevel: {
    type: String,
    enum: ["super", "moderate"],
    default: "moderate",
  },
});

const Admin = User.discriminator("admin", adminSchema);
export default Admin;
