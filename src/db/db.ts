import mongoose from "mongoose";
import { config } from "dotenv";
config();
const connectionUrl = process.env.CONNECTION_URL;

if (!connectionUrl) {
  throw new Error("Missing CONNECTION_URL in environment variables.");
}
export const connectDb = async () => {
  try {
    const connection = await mongoose.connect(connectionUrl);
    console.log(`mongoDB connected :${connection.connection.host}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error connecting to MongoDB: ${error.message}`);
    } else {
      console.error("Unknown error occurred during MongoDB connection.");
    }
    process.exit(1);
  }
};
