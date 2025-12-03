import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

// Verifica se estamos em produção (O Render define NODE_ENV=production automaticamente)
const isProduction = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
  type: "postgres",
  
  // EM PRODUÇÃO: Usa a URL completa do Neon
  url: isProduction ? process.env.DATABASE_URL : undefined,
  
  // EM DESENVOLVIMENTO: Usa as credenciais locais (Docker)
  host: process.env.DB_HOST || "db",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "admin",
  database: process.env.DB_NAME || "saude_positiva",

  synchronize: true, // Cria as tabelas automaticamente
  logging: !isProduction,
  
  // OBRIGATÓRIO PARA NEON: SSL ativado em produção
  ssl: isProduction ? { rejectUnauthorized: false } : false,

  // Ajusta o caminho das entidades (dist/js em prod, src/ts em dev)
  entities: [isProduction ? "dist/modules/**/*.entity.js" : "src/modules/**/*.entity.ts"],
  
  migrations: [],
  subscribers: [],
});