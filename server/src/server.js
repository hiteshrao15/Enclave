import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import logger from "./utils/logger.js";

const PORT = process.env.PORT || 8888;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      logger.info(
        `Server running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

startServer();