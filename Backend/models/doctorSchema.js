import mongoose from "mongoose";

const doctor = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    specialization: {
      type: [String],
      default: [],
    },
    experience: {
      type: Number,
    },
    qualification: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "Doctor",
    },
    avatar: {
      url: {
        type: String,
        required: true,
        default:
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.seekpng.com%2Fipng%2Fu2y3q8t4t4o0a9a9_my-profile-icon-blank-profile-image-circle%2F&psig=AOvVaw00W4yGBjOAtjBlxWWW2Cly&ust=1653141986799000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCIi4q_uf7vcCFQAAAAAdAAAAABAD",
      },
    },
  },
  {
    timestamps: true,
  }
);
const Doctor = mongoose.model("Doctors", doctor);
export default Doctor;
