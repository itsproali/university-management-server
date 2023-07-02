import mongoose from "mongoose";
import config from "../config";
import colors from "colors";

const connectDB = async () => {
  try {
    await mongoose.connect(config.DB_URI);
    console.log(colors.magenta("Database connected"));
  } catch (error: any) {
    console.log(error.message);
  }
};

export default connectDB;
