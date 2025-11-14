<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">Saúde Positiva - API</h1>

<p align="center">
  API desenvolvida com NestJS para o sistema de prontuários eletrônicos Saúde Positiva.
</p>

## Descrição

Esta é a API backend para o projeto Saúde Positiva, construída com [NestJS](https://github.com/nestjs/nest), um framework Node.js progressivo para a construção de aplicações server-side eficientes e escaláveis. A API gerencia pacientes, médicos, prontuários e a autenticação de usuários.

## 1. Configuração do Ambiente de Desenvolvimento

Antes de rodar o projeto, você precisa configurar o banco de dados PostgreSQL. A maneira mais fácil é usando Docker.

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Passos para Configuração

1.  **Clone o repositório (se ainda não o fez):**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd Saude-Positiva
    ```

2.  **Instale as dependências do Node.js:**
    ```bash
    npm install
    ```

4.  **Crie o arquivo de variáveis de ambiente (`.env`):**
    Também na raiz do projeto, crie um arquivo chamado `.env`. A aplicação usará este arquivo para obter as credenciais do banco de dados. Cole o seguinte conteúdo nele:
    ```
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=user
    DB_PASSWORD=password
    DB_NAME=saude_positiva
    ```
    > **Nota:** O arquivo `.env` já está no `.gitignore`, então suas credenciais não serão enviadas para o repositório.

## 2. Rodando a Aplicação

Com o ambiente configurado, você pode iniciar a aplicação.

```bash
# Modo de desenvolvimento com watch (reinicia a cada alteração)
npm run start:dev

# Modo de produção
npm run start:prod
```

A aplicação estará rodando em http://localhost:3000.

## 3. API e Autenticação (Swagger)

A documentação interativa da API está disponível via Swagger. Com a aplicação rodando, acesse:

- **Link da API:** [http://localhost:3000/api](http://localhost:3000/api)

### Como usar a autenticação

Para acessar endpoints protegidos, você precisa de um token de autenticação. Siga os passos:

1.  **Cadastre um Paciente:**
    -   Vá para a seção `auth` e abra o endpoint `POST /auth/signup`.
    -   Clique em **Try it out**, preencha o JSON de exemplo e clique em **Execute**.

2.  **Faça Login para Obter o Token:**
    -   Abra o endpoint `POST /auth/login`.
    -   Clique em **Try it out**, preencha com o `email` e `password` que você acabou de cadastrar e clique em **Execute**.
    -   Na resposta, copie o valor do `access_token`.

3.  **Autorize suas Requisições:**
    -   No topo da página, clique no botão **Authorize**.
    -   Na janela que abrir, cole o token no campo "Value", adicionando o prefixo `Bearer ` (com um espaço). Deve ficar assim:
        ```
        Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
        ```
    -   Clique em **Authorize** e depois em **Close**.

Pronto! Agora todas as suas requisições feitas pelo Swagger estarão autenticadas.