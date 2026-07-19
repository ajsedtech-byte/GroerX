import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import class10Routes from "./routes/class10Routes.js";

dotenv.config();

const app = express();

/*
  Public CORS fix:
  This allows your Vercel frontend to call the backend from any device.
*/
app.use(
  cors({
    origin: true,
    credentials: false,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "GroerX API running",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    message: "GroerX backend is live",
  });
});

app.use("/api/class10", class10Routes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);

  res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`GroerX API running on ${PORT}`);
  console.log("Your service is live 🎉");
});