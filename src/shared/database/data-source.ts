import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

// Verifica se estamos em ambiente de produção
const isProduction = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
  type: "postgres",
  
  // Em produção (Render), usa a URL completa. Localmente, usa as credenciais individuais.
  url: process.env.DATABASE_URL, 
  
  host: process.env.DB_HOST || "db",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "admin",
  database: process.env.DB_NAME || "saude_positiva",

  // Cuidado com synchronize: true em produção real (apaga dados se mudar schemas), 
  // mas é útil para este MVP/Residência.
  synchronize: true, 
  logging: !isProduction,
  
  // O Neon exige conexão segura (SSL)
  ssl: isProduction ? { rejectUnauthorized: false } : false,

  // Em produção roda os .js da pasta dist. Em dev roda os .ts da pasta src.
  entities: [isProduction ? "dist/modules/**/*.entity.js" : "src/modules/**/*.entity.ts"],
  
  migrations: [],
  subscribers: [],
});