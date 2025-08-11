import mongoose, { mongo } from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    image: [
      {
        type: String,
        default: "",
      },
    ],
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,

      default: "",
    },
    // created_at: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updated_at: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  {
    timestamps: true, // Automatically manage created_at and updated_at fields
  }
);

const Department = mongoose.model("Department", departmentSchema);
export default Department;
