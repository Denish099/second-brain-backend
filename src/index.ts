import express from "express";
import { config } from "dotenv";
import authRoutes from "./routes/authRoutes";
import contentRoutes from "./routes/contentRoutes";
import shareRoutes from "./routes/shareRoutes";
import { connectDb } from "./lib/db";
import cookieParser from "cookie-parser";
import cors from "cors";

config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/content", contentRoutes);
app.use("/api/v1", shareRoutes);

app.listen(PORT, () => {
  connectDb();
  console.log(`Listening on port ${PORT}`);
});
