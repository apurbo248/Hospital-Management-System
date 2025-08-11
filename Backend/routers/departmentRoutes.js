import express from "express";
import { addDepartment } from "../controllers/departmentController.js";

const router = express.Router();

router.post("/add_department", addDepartment);

export default router;
