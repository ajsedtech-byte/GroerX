import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import class10Routes from "./routes/class10Routes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://groer-x-one.vercel.app",
      "https://groer-x-blx5dosxl-ajsedtech-bytes-projects.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "GroerX API running",
  });
});

app.use("/api/class10", class10Routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`GroerX API running on ${PORT}`);
  console.log("Your service is live 🎉");
});