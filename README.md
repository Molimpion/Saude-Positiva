# Repositório do Backend da Aplicação Saúde Positiva

---

*Projeto da Residência Tecnológica do Porto Digital.*
*Equipe de Desenvolvimento Backend Grupo 01:* Edmael Barreto, Manoel Olímpio, Isabela Chaves e Vinícius Oliveira

## 🛠 Tecnologias e Ferramentas

### Framework e Ambiente Principal
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

### Banco de Dados e ORM
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white) ![TypeORM](https://img.shields.io/badge/TypeORM-FE0803?style=for-the-badge&logo=typeorm&logoColor=white)

### Validação e Qualidade
![Zod](https://img.shields.io/badge/Zod-3068B7?style=for-the-badge&logo=zod&logoColor=white)

### Infraestrutura e Documentação
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

---

## 1. Visão Geral

Este repositório contém o código-fonte do backend da plataforma **Saúde Positiva**.
Trata-se de uma **API RESTful** robusta e modular, projetada para a gestão de clínicas e consultórios, abrangendo pacientes, médicos, prontuários, consultas, diagnósticos e testes aplicados.

**API ao vivo:** [https://saude-positiva.onrender.com](https://saude-positiva.onrender.com)

**Documentação da API:** [https://saude-positiva.onrender.com/docs](https://saude-positiva.onrender.com/docs)

## 2. Estado do Projeto

A implementação das funcionalidades principais do backend foi concluída, com foco na modularização e boas práticas.

* [x] **Autenticação:** Login e Registo de Utilizadores (com JWT e bcrypt).
* [x] **Gestão de Pacientes:** CRUD completo e Histórico Clínico detalhado.
* [x] **Gestão de Médicos:** Cadastro e listagem de profissionais.
* [x] **Prontuários Eletrônicos:** Criação e manutenção de registos médicos.
* [x] **Agendamento de Consultas:** Gestão de horários e motivos de consulta.
* [x] **Diagnósticos e Testes:** Registo de resultados e avaliações.
* [x] **Gestão de Documentos:** Upload e controlo de ficheiros médicos.
* [x] **Documentação Automática:** Swagger/OpenAPI com interface moderna Scalar.
* [x] **Validação de Requisições:** Testes manuais via REST Client.

## 3. Arquitetura e Tecnologias

A aplicação segue uma arquitetura modular, onde cada entidade do domínio (ex: Pacientes, Médicos) possui o seu próprio módulo com `controlador`, `serviço`, `entidade`, `rotas` e `schema` de validação.

* **Framework Web:** Express.js
* **Linguagem:** TypeScript
* **Banco de Dados:** PostgreSQL
* **ORM:** TypeORM
* **Autenticação:** JWT (`jsonwebtoken`)
* **Validação:** Zod
* **Documentação:** Swagger (`swagger-jsdoc`) + Scalar (`@scalar/express-api-reference`)

### Ambiente de Desenvolvimento Padronizado

O projeto utiliza **Dev Containers** (`.devcontainer`) para garantir um ambiente de desenvolvimento consistente. Através do `docker-compose.yml`, são orquestrados:
* **app:** O container da aplicação Node.js (onde roda o VS Code server).
* **db:** O banco de dados PostgreSQL.

## 4. Como Executar o Projeto Localmente

### 1. Pré-requisitos

* Git
* Docker e Docker Compose
* VS Code com a extensão **"Dev Containers"**

### 2. Inicialização

1. Clone este repositório.
2. Na raiz do projeto, crie um arquivo `.env` com as configurações do banco e segredos.

**Exemplo de `.env`:**

```env
# Banco de Dados
DB_HOST=db
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=admin
DB_NAME=saude_positiva

# Segurança
JWT_SECRET="sua_chave_secreta_super_segura"
````

3.  Abra a pasta do projeto no VS Code. O editor sugerirá reabrir o projeto em um contêiner — aceite.

### 3\. Dentro do Dev Container

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento (o banco será criado automaticamente pelo TypeORM):

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.

## 5\. Testes e Validação

Para garantir o funcionamento dos fluxos principais, utilizamos testes manuais via requisições HTTP diretas.

O projeto inclui o arquivo **`api-tests.http`** na raiz. Este arquivo contém cenários de teste pré-configurados para todas as rotas.

**Como testar:**

1.  Instale a extensão **REST Client** no VS Code.
2.  Abra o arquivo `.http`.
3.  Clique em **"Send Request"** acima de cada chamada para testar os endpoints (Login, Criar Paciente, Listar Consultas, etc.).

## 6\. Documentação da API

A API é documentada automaticamente. Com o servidor a correr, aceda a:

👉 **[http://localhost:3000/docs](https://www.google.com/search?q=http://localhost:3000/docs)**

Lá encontrará todos os endpoints disponíveis, os schemas de dados e poderá testar as requisições diretamente pelo navegador.

### Principais Endpoints

| Módulo | Prefixo | Descrição |
| :--- | :--- | :--- |
| **Auth** | `/auth` | Login e Registo de administradores. |
| **Pacientes** | `/pacientes` | Gestão de pacientes e histórico (`/pacientes/:id/historico`). |
| **Médicos** | `/medicos` | Gestão do corpo clínico. |
| **Consultas** | `/consultas` | Agendamento e listagem de consultas. |
| **Prontuários** | `/prontuarios` | Registos médicos vinculados a pacientes. |
| **Documentos** | `/documentos` | Gestão de ficheiros anexos. |
