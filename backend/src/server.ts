import "reflect-metadata";
import { Server } from "http";
import { app } from "./app";
import { AppDataSource } from "./config/data-source";
import { env } from "./config/env";

let server: Server | undefined;

async function start() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");

    server = app.listen(env.port, () => {
      console.log(`Server running at http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

async function shutdown() {
  if (server) {
    server.close();
  }

  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }

  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

start();
