import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "../config/db.js";
import Stream from "../models/Stream.js";
import streams from "../data/streams.seed.js";

dotenv.config();

const seedStreams = async () => {
  try {
    await connectDB();

    console.log("Connected to MongoDB");

    // Remove old data
    await Stream.deleteMany({});

    console.log("Old streams removed");

    // Insert new data
    await Stream.insertMany(streams);

    console.log(`${streams.length} streams inserted successfully.`);

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedStreams();