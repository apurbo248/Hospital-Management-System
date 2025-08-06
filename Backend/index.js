// Initialize express server
// Import express, cors, dotenv, mongoose, cookie-parser, body-parser
import express from "express";
import connectedToMongoDB from "./configaration/dbConfig.js";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import doctorRouter from "./routers/doctorRoutes.js";

dotenv.config();

const port = process.env.PORT || 7000;
const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

app.get("/", (req, res) => {
  res.send("Hello server world");
});

app.use("/v1", doctorRouter);

connectedToMongoDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
