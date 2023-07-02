import connectDB from "./utils/connectDB";
import app from "./app";
import colors from "colors";
import config from "./config";

// Run the server
const run = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Start the server
    app.listen(config.PORT, () => {
      console.log(colors.blue(`Server listening on port: ${config.PORT}`));
    });
  } catch (error: any) {
    console.log(error.message);
  }
};

run();
