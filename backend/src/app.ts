import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";
import { env } from "./config/env";

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.corsOrigin ? env.corsOrigin.split(",") : true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (env.nodeEnv !== "test") {
  app.use(morgan("dev"));
}

app.get("/", (_req, res) => {
  res.json({ message: "Student Performance API is running" });
});

app.use("/api", routes);
