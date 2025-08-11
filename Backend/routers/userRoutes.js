import express from "express";

import { userRegister,userLogin } from "../controllers/usersController.js";
const router = express.Router();

// User registration route
router.post("/user_registration", userRegister);
//user login route
router.post("/user_login", userLogin); 

export default router;
