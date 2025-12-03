import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

// Verifica se estamos em produção
const isProduction = process.env.NODE_ENV === "production";

// --- LOGS DE DEPURAÇÃO (Para vermos no Render) ---
console.log("--- [DEBUG] INICIANDO DATA SOURCE ---");
console.log("1. Estamos em produção?", isProduction);
console.log("2. DATABASE_URL existe?", !!process.env.DATABASE_URL); // Não mostra a senha, só true/false
console.log("3. Valor do DB_HOST (se houver):", process.env.DB_HOST); 
console.log("-------------------------------------");

export const AppDataSource = new DataSource({
  type: "postgres",
  
  // Prioriza a URL do Neon em produção
  url: isProduction ? process.env.DATABASE_URL : undefined,
  
  // Se não estiver em produção (ou se a URL falhar), tenta o fallback
  host: process.env.DB_HOST || "db",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "admin",
  database: process.env.DB_NAME || "saude_positiva",

  synchronize: true, 
  logging: !isProduction,
  
  // Configuração SSL Obrigatória para Neon
  ssl: isProduction ? { rejectUnauthorized: false } : false,

  entities: [isProduction ? "dist/modules/**/*.entity.js" : "src/modules/**/*.entity.ts"],
  
  migrations: [],
  subscribers: [],
});