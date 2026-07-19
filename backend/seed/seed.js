import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import connectDB from "../src/config/db.js";
import Question from "../src/models/Question.js";
import QuestionMapping from "../src/models/QuestionMapping.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questions = JSON.parse(
  fs.readFileSync(path.join(__dirname, "questions.json"), "utf-8")
);

const mappings = JSON.parse(
  fs.readFileSync(path.join(__dirname, "mappings.json"), "utf-8")
);

await connectDB();
console.log("Seed DB Name:", mongoose.connection.name);
await Question.deleteMany({});
await QuestionMapping.deleteMany({});

await Question.insertMany(questions);
await QuestionMapping.insertMany(mappings);

console.log(`Seeded ${questions.length} questions`);
console.log(`Seeded ${mappings.length} mappings`);

process.exit();