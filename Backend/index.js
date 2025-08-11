// Initialize express server
// Import express, cors, dotenv, mongoose, cookie-parser, body-parser
import express from "express";
import { connectedToMongoDB } from "./utils/dbConfig.js";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import userRoutes from "./routers/userRoutes.js";
import departmentRoutes from "./routers/departmentRoutes.js";

dotenv.config();

const port = process.env.PORT || 7000;
const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

app.get("/", (req, res) => {
  res.send("wellcome to Hospital Management System Server :)");
});

app.use("/v1", userRoutes);
app.use("/v1", departmentRoutes);

connectedToMongoDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
