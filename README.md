<h1 align="center">support-tickets</h1>

<div align="center">

[![Product Specification](https://img.shields.io/badge/Product%20Specification-Documentation-0ea5e9?style=for-the-badge)](./docs/product-spec.md)
[![📘 Notas de Estudo](https://img.shields.io/badge/%F0%9F%93%98%20Notas%20de%20Estudo-Documenta%C3%A7%C3%A3o-0ea5e9?style=for-the-badge)](./docs/study-notes.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://github.com/VictorMartinsD/support-tickets/blob/main/LICENSE)

</div>

<a name="sumario"></a>

<div align="center">

## Sumário | Summary

| Português                                                                                                                                                                                                                                                                                                                                               | English                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Sobre o Projeto](#sobre-o-projeto)<br>[Visão de Produto](#visao-de-produto)<br>[Casos de Uso](#casos-de-uso)<br>[Funcionalidades](#funcionalidades)<br>[Tecnologias](#tecnologias)<br>[Arquitetura](#arquitetura)<br>[Como rodar localmente](#como-rodar-localmente)<br>[Limitações conhecidas](#limitacoes-conhecidas)<br>[Aprendizado](#aprendizado) | [About the Project](#about-the-project)<br>[Product Overview](#product-overview)<br>[Use Cases](#use-cases)<br>[Features](#features)<br>[Technologies](#technologies)<br>[Architecture](#architecture)<br>[Running Locally](#running-locally)<br>[Known Limitations](#known-limitations)<br>[Learnings](#learnings) |

</div>

<a name="sobre-o-projeto"></a>

## 📌 Sobre o Projeto

`support-tickets` é uma API para registrar e acompanhar solicitações de suporte técnico. O projeto mantém problemas, estados e soluções em registros consultáveis, apoiando o ciclo entre abertura, atualização, encerramento e remoção.

O foco técnico está na construção de uma API HTTP modular com recursos nativos do Node.js, roteamento por método e caminho, controllers separados e persistência local em arquivo JSON.

<a name="visao-de-produto"></a>

## 🎯 Visão de Produto

O produto centraliza solicitações de suporte em tickets com identificador, equipamento, descrição, nome do solicitante, estado e solução quando o atendimento é encerrado. O público principal são equipes pequenas de suporte técnico, profissionais que acompanham solicitações e estudantes que praticam esse fluxo.

O valor entregue é permitir consultar tickets abertos ou encerrados, corrigir dados operacionais e registrar a solução aplicada sem recriar a solicitação. Para regras de negócio e requisitos detalhados, consulte a [Especificação do Produto](./docs/product-spec.md).

<a name="casos-de-uso"></a>

## 📌 Casos de Uso

- Registrar uma solicitação de suporte para um equipamento com problema.
- Consultar tickets em aberto para identificar atendimentos pendentes.
- Filtrar solicitações encerradas para revisar soluções registradas.
- Corrigir o equipamento ou a descrição de um ticket existente.
- Encerrar um atendimento informando a solução aplicada.
- Remover registros que não precisam mais permanecer disponíveis.

<a name="funcionalidades"></a>

## ✨ Funcionalidades

- Criar tickets com `equipment`, `description` e `user_name`.
- Gerar identificador único e estado inicial `open`.
- Listar tickets e filtrar por `status`.
- Atualizar equipamento e descrição sem alterar o usuário de origem.
- Encerrar tickets com estado `closed` e uma `solution`.
- Remover tickets pelo identificador.
- Persistir alterações no arquivo local de dados.

<a name="tecnologias"></a>

## 🛠️ Tecnologias e Ferramentas

### Core

| Tecnologia                | Versão | Função e impacto na arquitetura                                                                      |
| ------------------------- | ------ | ---------------------------------------------------------------------------------------------------- |
| **Node.js**               | 20+    | Executa a API e fornece módulos nativos para HTTP, sistema de arquivos e geração de identificadores. |
| **JavaScript ES Modules** | Nativo | Organiza o projeto com `import` e `export`, separando rotas, controllers, middlewares e utilitários. |

### Infrastructure / API

| Tecnologia                | Versão | Função e impacto na arquitetura                                                 |
| ------------------------- | ------ | ------------------------------------------------------------------------------- |
| **Node.js `http`**        | Nativo | Cria o servidor HTTP sem framework externo e encaminha requisições ao roteador. |
| **Node.js `fs/promises`** | Nativo | Persiste tickets em `src/database/db.json` por meio da camada `Database`.       |
| **Node.js `crypto`**      | Nativo | Gera identificadores únicos para novos tickets com `randomUUID`.                |

### Tooling

| Tecnologia      | Versão | Função e impacto na arquitetura                                             |
| --------------- | ------ | --------------------------------------------------------------------------- |
| **ESLint**      | 10.3.0 | Analisa os arquivos JavaScript e aplica regras de qualidade e consistência. |
| **Prettier**    | 3.7.4  | Padroniza a formatação do código e da documentação.                         |
| **Husky**       | 9.1.7  | Integra ações de qualidade ao ciclo de trabalho do Git.                     |
| **lint-staged** | 16.2.7 | Define ações de lint e formatação para arquivos JavaScript alterados.       |

<a name="arquitetura"></a>

## 🏗️ Arquitetura e Decisões Técnicas

O projeto usa uma arquitetura modular organizada por responsabilidades. O servidor prepara a requisição com middlewares, o roteador identifica o controller e a camada de persistência concentra as operações sobre os dados.

### Estrutura do projeto

```text
support-tickets/
├── .editorconfig                        # Regras de edição
├── .env.example                         # Modelo de variáveis de ambiente
├── .gitattributes                       # Atributos do Git
├── .gitignore                           # Arquivos ignorados
├── .prettierignore                      # Exclusões do Prettier
├── .prettierrc                          # Configuração do Prettier
├── eslint.config.mjs                    # Configuração do ESLint
├── GITHUB_METADATA.md                   # Metadados temporários do GitHub
├── LICENSE                              # Licença MIT
├── package.json                         # Metadados e scripts npm
├── package-lock.json                    # Lockfile de dependências
├── README.md                            # Documentação principal
├── docs/
│   ├── product-spec.md                  # Visão funcional do produto
│   └── study-notes.md                   # Registro técnico de aprendizado
└── src/
    ├── server.js                        # Inicialização do servidor HTTP
    ├── controllers/
    │   └── tickets/
    │       ├── create.js                # Criação de tickets
    │       ├── index.js                 # Listagem e filtro
    │       ├── remove.js                # Remoção de tickets
    │       ├── update.js                # Atualização de dados
    │       └── updateStatus.js          # Encerramento e solução
    ├── database/
    │   ├── database.js                  # Operações de persistência
    │   └── db.json                      # Dados locais dos tickets
    ├── middlewares/
    │   ├── jsonHandler.js               # Leitura do corpo JSON
    │   └── routeHandler.js              # Resolução de rotas
    ├── routes/
    │   ├── index.js                     # Registro das rotas
    │   └── tickets.js                   # Rotas de tickets
    └── utils/
        ├── extractQueryParams.js        # Parsing de query string
        └── parseRoutePath.js            # Parsing de parâmetros de rota
```

### Rotas disponíveis

| Método   | Caminho              | Responsabilidade                                          |
| -------- | -------------------- | --------------------------------------------------------- |
| `POST`   | `/tickets`           | Cria um ticket.                                           |
| `GET`    | `/tickets`           | Lista tickets; aceita `?status=open` ou `?status=closed`. |
| `PUT`    | `/tickets/:id`       | Atualiza equipamento e descrição.                         |
| `PATCH`  | `/tickets/:id/close` | Fecha o ticket e registra a solução.                      |
| `DELETE` | `/tickets/:id`       | Remove o ticket.                                          |

### Decisões técnicas relevantes

- Usar módulos nativos mantém o escopo da API explícito e reduz abstrações externas.
- Definir rotas como dados separa o registro dos endpoints da execução dos controllers.
- Usar expressões regulares permite extrair parâmetros dinâmicos e query strings sem um framework de roteamento.
- Encapsular a persistência em `Database` evita distribuir operações de leitura e escrita pelos controllers.
- Separar cada operação de ticket em um controller mantém responsabilidades menores e mais legíveis.

<a name="como-rodar-localmente"></a>

## 🚀 Como rodar o projeto localmente

1. Clone o repositório:

```bash
git clone https://github.com/VictorMartinsD/support-tickets.git
```

2. Entre no diretório do projeto:

```bash
cd support-tickets
```

3. Instale as dependências:

```bash
npm ci
```

4. Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

A API será iniciada na porta `3333`.

### Scripts disponíveis

| Script             | Finalidade                                        |
| ------------------ | ------------------------------------------------- |
| `npm run dev`      | Inicia o servidor com reinicialização automática. |
| `npm start`        | Inicia o servidor sem modo de observação.         |
| `npm run lint`     | Executa o ESLint.                                 |
| `npm run lint:fix` | Executa o ESLint com correções automáticas.       |
| `npm run check`    | Executa lint e verifica a formatação.             |
| `npm run format`   | Formata os arquivos com Prettier.                 |
| `npm test`         | Indica que ainda não há testes configurados.      |

<a name="limitacoes-conhecidas"></a>

## ⚠️ Limitações Conhecidas

- Não há autenticação ou autorização.
- Não há validação de campos obrigatórios ou formatos de entrada.
- Não há mensagens específicas para tickets inexistentes ou operações inválidas.
- Não há testes automatizados configurados.
- A persistência é local e baseada em arquivo JSON.
- Não há paginação, ordenação, busca textual ou notificações.
- Não há interface visual própria.

<a name="aprendizado"></a>

## 📚 Aprendizado

O desenvolvimento reforçou a criação de um servidor HTTP com recursos nativos, o tratamento de streams JSON, o roteamento com parâmetros dinâmicos e a separação entre middlewares, rotas, controllers e persistência.

Também consolidou decisões de modelagem para criação, consulta, atualização, encerramento e remoção de registros, além do uso de ESLint, Prettier e scripts npm para manter o fluxo de desenvolvimento consistente. Para o registro técnico completo, consulte as [Notas de Estudo](./docs/study-notes.md).

---

— Desenvolvido por [Victor Martins](https://github.com/VictorMartinsD), Front-End Developer focado em aplicações web modernas e performance.

---

<div align="center">

## ENGLISH VERSION

</div>

<h1 align="center">support-tickets</h1>

<a name="about-the-project"></a>

## 📌 About the Project

`support-tickets` is an API for recording and tracking technical support requests. It keeps problems, states, and solutions in queryable records, supporting a basic lifecycle from creation to update, closure, and removal.

The technical focus is a modular HTTP API built with native Node.js capabilities, method and path routing, separated controllers, and local JSON file persistence.

<a name="product-overview"></a>

## 🎯 Product Overview

The product centralizes support requests in tickets containing an identifier, equipment, description, requester name, state, and a solution when the interaction is closed. Its main audience is small technical support teams, professionals tracking requests, and students practicing this workflow.

The delivered value is the ability to view open or closed tickets, correct operational data, and record the applied solution without recreating the request. For detailed business rules and requirements, see the [Product Specification](./docs/product-spec.md).

<a name="use-cases"></a>

## 📌 Use Cases

- Record a support request for equipment with a problem.
- View open tickets to identify pending interactions.
- Filter closed requests to review recorded solutions.
- Correct the equipment or description of an existing ticket.
- Close an interaction while recording the applied solution.
- Remove records that no longer need to remain available.

<a name="features"></a>

## ✨ Features

- Create tickets with `equipment`, `description`, and `user_name`.
- Generate a unique identifier and the initial `open` state.
- List tickets and filter them by `status`.
- Update equipment and description without changing the original requester.
- Close tickets with the `closed` state and a `solution`.
- Remove tickets by identifier.
- Persist changes in the local data file.

<a name="technologies"></a>

## 🛠️ Technologies and Tools

### Core

| Technology                | Version | Role and architectural impact                                                                                |
| ------------------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| **Node.js**               | 20+     | Runs the API and provides native modules for HTTP, file system access, and identifier generation.            |
| **JavaScript ES Modules** | Native  | Organizes the project with `import` and `export`, separating routes, controllers, middleware, and utilities. |

### Infrastructure / API

| Technology                | Version | Role and architectural impact                                                              |
| ------------------------- | ------- | ------------------------------------------------------------------------------------------ |
| **Node.js `http`**        | Native  | Creates the HTTP server without an external framework and forwards requests to the router. |
| **Node.js `fs/promises`** | Native  | Persists tickets in `src/database/db.json` through the `Database` layer.                   |
| **Node.js `crypto`**      | Native  | Generates unique identifiers for new tickets with `randomUUID`.                            |

### Tooling

| Technology      | Version | Role and architectural impact                                         |
| --------------- | ------- | --------------------------------------------------------------------- |
| **ESLint**      | 10.3.0  | Analyzes JavaScript files and enforces quality and consistency rules. |
| **Prettier**    | 3.7.4   | Standardizes code and documentation formatting.                       |
| **Husky**       | 9.1.7   | Integrates quality actions into the Git workflow.                     |
| **lint-staged** | 16.2.7  | Defines linting and formatting actions for changed JavaScript files.  |

<a name="architecture"></a>

## 🏗️ Architecture and Technical Decisions

The project uses a modular architecture organized by responsibility. The server prepares requests through middleware, the router identifies the controller, and the persistence layer concentrates data operations.

### Project structure

```text
support-tickets/
├── .editorconfig                       # Editor rules
├── .env.example                        # Environment variable template
├── .gitattributes                      # Git attributes
├── .gitignore                          # Ignored files
├── .prettierignore                     # Prettier exclusions
├── .prettierrc                         # Prettier configuration
├── eslint.config.mjs                   # ESLint configuration
├── GITHUB_METADATA.md                  # Temporary GitHub metadata
├── LICENSE                             # MIT License
├── package.json                        # npm metadata and scripts
├── package-lock.json                   # Dependency lockfile
├── README.md                           # Main documentation
├── docs/
│   ├── product-spec.md                 # Product functional vision
│   └── study-notes.md                  # Technical learning record
└── src/
    ├── server.js                       # HTTP server initialization
    ├── controllers/
    │   └── tickets/
    │       ├── create.js               # Ticket creation
    │       ├── index.js                # Listing and filtering
    │       ├── remove.js               # Ticket removal
    │       ├── update.js               # Data update
    │       └── updateStatus.js         # Closure and solution
    ├── database/
    │   ├── database.js                 # Persistence operations
    │   └── db.json                     # Local ticket data
    ├── middlewares/
    │   ├── jsonHandler.js              # JSON body parsing
    │   └── routeHandler.js             # Route resolution
    ├── routes/
    │   ├── index.js                    # Route registration
    │   └── tickets.js                  # Ticket routes
    └── utils/
        ├── extractQueryParams.js       # Query string parsing
        └── parseRoutePath.js           # Route parameter parsing
```

### Available routes

| Method   | Path                 | Responsibility                                             |
| -------- | -------------------- | ---------------------------------------------------------- |
| `POST`   | `/tickets`           | Creates a ticket.                                          |
| `GET`    | `/tickets`           | Lists tickets; accepts `?status=open` or `?status=closed`. |
| `PUT`    | `/tickets/:id`       | Updates equipment and description.                         |
| `PATCH`  | `/tickets/:id/close` | Closes the ticket and records the solution.                |
| `DELETE` | `/tickets/:id`       | Removes the ticket.                                        |

### Relevant technical decisions

- Native modules keep the API scope explicit and reduce external abstractions.
- Defining routes as data separates endpoint registration from controller execution.
- Regular expressions extract dynamic parameters and query strings without a routing framework.
- Encapsulating persistence in `Database` keeps read and write operations out of controllers.
- Separating each ticket operation into a controller keeps responsibilities smaller and more readable.

<a name="running-locally"></a>

## 🚀 Running the project locally

1. Clone the repository:

```bash
git clone https://github.com/VictorMartinsD/support-tickets.git
```

2. Enter the project directory:

```bash
cd support-tickets
```

3. Install dependencies:

```bash
npm ci
```

4. Start the development server:

```bash
npm run dev
```

The API starts on port `3333`.

### Available scripts

| Script             | Purpose                                              |
| ------------------ | ---------------------------------------------------- |
| `npm run dev`      | Starts the server with automatic restarts.           |
| `npm start`        | Starts the server without watch mode.                |
| `npm run lint`     | Runs ESLint.                                         |
| `npm run lint:fix` | Runs ESLint with automatic fixes.                    |
| `npm run check`    | Runs linting and checks formatting.                  |
| `npm run format`   | Formats files with Prettier.                         |
| `npm test`         | Reports that automated tests are not configured yet. |

<a name="known-limitations"></a>

## ⚠️ Known Limitations

- There is no authentication or authorization.
- Required fields and input formats are not validated.
- There are no specific messages for missing tickets or invalid operations.
- Automated tests are not configured.
- Persistence is local and based on a JSON file.
- There is no pagination, sorting, text search, or notification system.
- There is no dedicated visual interface.

<a name="learnings"></a>

## 📚 Learnings

Development reinforced building an HTTP server with native capabilities, handling JSON streams, routing dynamic parameters, and separating middleware, routes, controllers, and persistence.

It also consolidated modeling decisions for creating, querying, updating, closing, and removing records, along with using ESLint, Prettier, and npm scripts to keep the workflow consistent. For the complete technical record, see the [Study Notes](./docs/study-notes.md).

---

— Developed by [Victor Martins](https://github.com/VictorMartinsD), Front-End Developer focused on modern web applications and performance.
