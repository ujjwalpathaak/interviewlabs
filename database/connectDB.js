import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const DB_URL = process.env.DATABASE_URL;

const Connection = () => {
  try {
    mongoose.set("strictQuery", false); 
    mongoose.connect(DB_URL, { useUnifiedTopology: true });
    console.log("database connected");
  } catch (error) {
    console.log("error connecting to database", err.message);
  }
};

export default Connection;
