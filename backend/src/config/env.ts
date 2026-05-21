import dotenv from "dotenv";

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  corsOrigin: process.env.CORS_ORIGIN,
  dbPath: process.env.DB_PATH || "data/dev.sqlite",
  typeormSync: process.env.TYPEORM_SYNC !== "false",
  typeormLogging: process.env.TYPEORM_LOGGING === "true",
  jwtSecret: process.env.JWT_SECRET || "change-me",
};
