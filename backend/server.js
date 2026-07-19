import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import careerRoutes from "./src/routes/careerRoutes.js";
import testRoutes from "./src/routes/testRoutes.js";
import adminQuestionRoutes from "./src/routes/adminQuestionRoutes.js";
import reportRoutes from "./src/routes/reportRoutes.js";
import streamRoutes from "./src/routes/streamRoutes.js";
import class10Routes from "./src/routes/class10Routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "20mb" }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "GroerX Career Engine API running without MongoDB temporarily",
  });
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "GroerX API is healthy",
    database: "temporarily disabled",
  });
});

app.use("/api/tests", testRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/admin/questions", adminQuestionRoutes);
app.use("/api/streams", streamRoutes);
app.use("/api/class10", class10Routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("MongoDB connection is temporarily disabled.");
});