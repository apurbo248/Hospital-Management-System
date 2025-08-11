// configaration/dbConfig.js

import mongoose from "mongoose";

export const connectedToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
