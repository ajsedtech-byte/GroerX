import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "../config/db.js";
import Career from "../models/Career.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const careersFolder = path.join(__dirname, "../data/careers");

const loadCareers = () => {
  const files = fs.readdirSync(careersFolder).filter((file) => file.endsWith(".json"));

  let allCareers = [];

  files.forEach((file) => {
    const filePath = path.join(careersFolder, file);
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    if (!Array.isArray(data)) {
      throw new Error(`${file} must contain an array`);
    }

    allCareers = [...allCareers, ...data];
  });

  return allCareers;
};

const seedCareers = async () => {
  try {
    await connectDB();

    const careers = loadCareers();

    await Career.deleteMany({});
    await Career.insertMany(careers);

    console.log(`${careers.length} careers seeded successfully`);
    process.exit();
  } catch (error) {
    console.error("Career seed failed:", error);
    process.exit(1);
  }
};

seedCareers();