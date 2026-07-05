import fs from "fs";
import os from "os";
import path from "path";
import winston from "winston";

let logDirectory = process.env.LOG_DIR ||
  (process.env.VERCEL
    ? path.join(os.tmpdir(), "enclave-logs")
    : path.join(process.cwd(), "src", "logs"));

try {
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, {
      recursive: true,
    });
  }
} catch (error) {
  logDirectory = path.join(os.tmpdir(), "enclave-logs");

  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, {
      recursive: true,
    });
  }
}

const customFormat = winston.format.printf(
  ({ timestamp, level, message, stack }) => {
    return `${timestamp} [${level.toUpperCase()}] ${
      stack || message
    }`;
  }
);

const logger = winston.createLogger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },

  level: "http",

  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({
      stack: true,
    }),
    customFormat
  ),

  transports: [
    new winston.transports.Console(),

    new winston.transports.File({
      filename: path.join(logDirectory, "combined.log"),
    }),

    new winston.transports.File({
      filename: path.join(logDirectory, "error.log"),
      level: "error",
    }),

    new winston.transports.File({
      filename: path.join(logDirectory, "access.log"),
      level: "http",
    }),
  ],
});

export default logger;