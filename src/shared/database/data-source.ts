import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

console.log("--- [DEBUG] CONFIGURAÇÃO DO BANCO ---");
console.log("Ambiente:", isProduction ? "PRODUÇÃO (Render)" : "DESENVOLVIMENTO (Local)");

let dbOptions: DataSourceOptions;

if (isProduction) {
  // --- CONFIGURAÇÃO DE PRODUÇÃO (Neon / Render) ---
  // Aqui NÃO definimos 'host', 'username', etc. Apenas a URL.
  console.log("Usando DATABASE_URL do ambiente.");
  
  dbOptions = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: ["dist/modules/**/*.entity.js"], // Pasta dist em produção
    migrations: [],
    subscribers: [],
    ssl: { rejectUnauthorized: false }, // Obrigatório para Neon
    synchronize: true, // Cria tabelas automaticamente
    logging: false,
  };
} else {
  // --- CONFIGURAÇÃO LOCAL (Docker) ---
  console.log("Usando credenciais locais (Docker).");
  
  dbOptions = {
    type: "postgres",
    host: process.env.DB_HOST || "db", // O nome do serviço no docker-compose
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || "admin",
    password: process.env.DB_PASSWORD || "admin",
    database: process.env.DB_NAME || "saude_positiva",
    entities: ["src/modules/**/*.entity.ts"], // Pasta src em desenvolvimento
    migrations: [],
    subscribers: [],
    synchronize: true,
    logging: true,
  };
}

export const AppDataSource = new DataSource(dbOptions);