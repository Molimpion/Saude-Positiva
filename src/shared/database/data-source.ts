import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "db", 
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "admin",
  database: process.env.DB_NAME || "saude_positiva",
  synchronize: true,
  logging: false,
  entities: [__dirname + "/../../modules/**/*.entity.{ts,js}"], 
  migrations: [],
  subscribers: [],
});