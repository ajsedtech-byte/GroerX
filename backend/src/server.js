import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import streamRoutes from "./routes/streamRoutes.js";



const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("GroerX API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/streams", streamRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`GroerX API running on ${port}`);
});