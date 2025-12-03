import "reflect-metadata";
import { AppDataSource } from "../database/data-source";
import { app } from "./app";

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de Dados conectado com sucesso!");
    
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      console.log(`Server rodando na porta ${port}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar no Banco de Dados:", error);
  });