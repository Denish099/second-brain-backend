import express, { Express } from "express";
import { config } from "dotenv";
import authRoutes from "./routes/authRoutes";
import { connectDb } from "./db/db";

config();
const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  connectDb();
});
