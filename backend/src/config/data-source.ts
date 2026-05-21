import "reflect-metadata";
import { getRepository } from "typeorm";
import { Student } from "../entities/Student";
import { Grade } from "../entities/Grade";

export const AppDataSource = {
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Student, Grade],
  migrations: [],
  subscribers: [],
  getRepository,
};
