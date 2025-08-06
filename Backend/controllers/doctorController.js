import Doctor from "../models/doctorSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Registration for Doctors
const doctorRegistration = async (req, res, next) => {
  const {
    name,
    email,
    password,
    phone,
    address,
    specialization,
    experience,
    qualification,
    role,
    uniqueID,

    avatar,
  } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !phone ||
    !address ||
    !specialization ||
    !qualification
  ) {
    return res.status(422).json({ msg: "Fill all field !" });
  }

  try {
    const preUser = await Doctor.findOne({ email });

    if (preUser) {
      res.status(422).json({ msg: "User already in present !" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    await Doctor.create({
      uniqueID,
      name,
      email,
      password: hashPassword,
      phone,
      address,
      specialization,
      experience,
      role,
      qualification,
      avatar,
    });

    res.status(201).json({ msg: "New Doctor registration successfully !" });
  } catch (err) {
    console.log(err);
  }
};

//Login for Doctors
const doctorLogin = async (req, res, next) => {
  console.log("Doctor Login");
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ msg: "Fill all field !" });
    }
    const user = await Doctor.findOne({ email });

    if (!user) {
      return res.status(422).json({ msg: "Invalid email/lpassword !" });
    }

    const isPasswordmatch = await bcrypt.compare(password, user.password);

    if (!isPasswordmatch) {
      return res.status(422).json({ msg: "Invalid email/lpassword !" });
    }

    if (user && isPasswordmatch) {
      const token = jwt.sign(
        { id: user._id, email },
        process.env.ACCESS_TOKEN
        // { expiresIn: "1h" }
      );
      return res.status(200).json({ token, user });
    }
  } catch (err) {
    console.log(err);
  }
};

//Get all Doctors
const getAllDoctor = async (req, res) => {
  //if (req.user.role === "admin") {
  try {
    const doctors = await Doctor.find();
    res.status(201).json(doctors);
  } catch (err) {
    console.log(err);
  }
};
// else {
//   res.status(403).json("You are not allow to view all Doctor information...");
// }
//};

//Get individual Doctor information
const getSingleDoctorInfo = async (req, res) => {
  if (req.user.id === req.params.id || req.user.role === "admin") {
    try {
      const doctor = await Doctor.findById(req.params.id).select("-password");
      res.status(201).json(doctor);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(403).json("You can view only your account...");
  }
};

// getSingleUser: async (req, res) => {
//   if (req.user.id === req.params.id || req.user.role === "admin") {
//     try {
//       const user = await User.findById(req.params.id).select("-password");

//       res.status(201).json(user);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(403).json("You can view only your account...");
//   }
// },

// //Update
// update: async (req, res) => {
//   if (req.user.id === req.params.id || req.user.role === "admin") {
//     if (req.body.password) {
//       req.body.password = bcrypt.hashSync(req.body.password, 10);
//     }
//     try {
//       const updateUser = await User.findByIdAndUpdate(
//         req.params.id,
//         {
//           $set: req.body,
//         },
//         { new: true }
//       );
//       res.status(200).json({ success: true, updateUser });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(403).json({ msg: "You can update only your account..." });
//   }
// },

// //delete
// delete: async (req, res) => {
//   if (req.user.id === req.params.id || req.user.role === "admin") {
//     try {
//       const user = await User.findById(req.params.id);
//       if (!user) {
//         return res.status(400).json("User not found...");
//       }
//       await user.remove();
//       res.status(200).json({ success: true });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(403).json("You can delete only your account...");
//   }
// },

// //Get profile
// getProfile: async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     res.status(201).json({ success: true, user });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// },

// logout: async (req, res) => {
//   res.cookie("token", null, {
//     expires: new Date(Date.now()),
//     httpOnly: true,
//   });
//   console.log("logout");
//   res.status(201).json({
//     success: true,
//     message: "Logged out",
//   });
// },

export { doctorRegistration, doctorLogin, getAllDoctor, getSingleDoctorInfo };
