// utils/generateUserId.js

import Counter from "../models/counterSchema.js";

export const generateSequentialUserId = async () => {
  const counter = await Counter.findOneAndUpdate(
    { name: "userId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const paddedNumber = counter.seq.toString().padStart(6, "0");
  return `${paddedNumber}`;
};
