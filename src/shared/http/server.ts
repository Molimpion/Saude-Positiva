import "reflect-metadata";
import { AppDataSource } from "../database/data-source";
import { app } from "./app";

// Inicializa o Banco primeiro, depois sobe a API
AppDataSource.initialize()
  .then(() => {
    console.log("Banco de Dados conectado com sucesso!");
    
    app.listen(3000, () => {
      console.log("Server rodando na porta 3000");
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar no Banco de Dados:", error);
  });