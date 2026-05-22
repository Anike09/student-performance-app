import "reflect-metadata";
import fs from "fs";
import path from "path";
import { DataSource } from "typeorm";
import { Student } from "../entities/Student";
import { Grade } from "../entities/Grade";
import { Course } from "../entities/Course";
import { env } from "./env";

const databasePath = path.resolve(process.cwd(), env.dbPath);
fs.mkdirSync(path.dirname(databasePath), { recursive: true });

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: databasePath,
  synchronize: env.typeormSync,
  logging: env.typeormLogging,
  entities: [Student, Grade, Course],
  migrations: [],
  subscribers: [],
});
