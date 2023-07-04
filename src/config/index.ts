import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  NODE_ENV: process.env.NODE_ENV || "development",
  isDevelopment: process.env.NODE_ENV === "development" ? true : false,
  PORT: process.env.PORT || 5000,
  DB_URI: process.env.DB_URI || "mongodb://localhost:27017/university",
  DEFAULT_STUDENT_PASS: process.env.DEFAULT_STUDENT_PASS || "student123",
};
