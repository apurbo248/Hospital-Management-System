import express from "express";
import authenticateToken from "../middlewares/authentication.js";
import {
  doctorRegistration,
  doctorLogin,
  getAllDoctor,
  getSingleDoctorInfo,
} from "../controllers/doctorController.js";

const doctorRouter = express.Router();

doctorRouter.post("/Doctor/Registration", doctorRegistration);
doctorRouter.post("/Doctor/Login", doctorLogin);

doctorRouter.get("/Doctor/All", getAllDoctor);
doctorRouter.get("/Doctor/:id", authenticateToken, getSingleDoctorInfo);

export default doctorRouter;
