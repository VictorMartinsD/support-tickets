# API de Tickets de Suporte

> **Status: Em desenvolvimento**
>
> Este projeto ainda está em desenvolvimento. A estrutura atualmente presente
> no repositório é a casca inicial da API de tickets de suporte, e as rotas de
> tickets ainda não foram implementadas.

API para gerenciar tickets de suporte técnico. Na versão planejada, será
possível criar tickets solicitando suporte, atualizar as informações dos
tickets, listar tickets com filtro opcional por status, fechar tickets e
excluir tickets.

## API planejada

As rotas a seguir descrevem o comportamento pretendido para a API e poderão
ser alteradas durante o desenvolvimento do projeto.

### Criar um ticket

Cria um novo ticket de suporte.

**Método:** `POST`
**URL:** `/tickets`

**Corpo da requisição (JSON):**

| Campo         | Tipo   | Obrigatório | Descrição                                 |
| ------------- | ------ | ----------- | ----------------------------------------- |
| `equipment`   | string | Sim         | Nome do equipamento, como um computador   |
| `description` | string | Sim         | Descrição do problema                     |
| `user_name`   | string | Sim         | Nome do usuário que está criando o ticket |

### Obter tickets

Retorna todos os tickets de suporte.

**Método:** `GET`
**URL:** `/tickets`

**Parâmetro de consulta opcional:**

- `status` (string): filtra os tickets pelos status `open` ou `closed`.

### Atualizar um ticket

Atualiza as informações de um ticket específico. O nome do usuário não pode
ser alterado por essa rota.

**Método:** `PUT`
**URL:** `/tickets/:id`

**Parâmetro da rota:**

- `id` (UUID): identificador do ticket.

**Corpo da requisição (JSON):**

| Campo         | Tipo   | Obrigatório | Descrição                           |
| ------------- | ------ | ----------- | ----------------------------------- |
| `equipment`   | string | Sim         | Nome atualizado do equipamento      |
| `description` | string | Sim         | Descrição atualizada do problema    |
| `user_name`   | -      | -           | Não pode ser alterado por essa rota |

### Fechar um ticket

Atualiza o status de um ticket para `closed`.

**Método:** `PATCH`
**URL:** `/tickets/:id/status`

**Parâmetro da rota:**

- `id` (UUID): identificador do ticket.

### Excluir um ticket

Exclui um ticket específico.

**Método:** `DELETE`
**URL:** `/tickets/:id`

**Parâmetro da rota:**

- `id` (UUID): identificador do ticket.

## Casca atual do projeto

O repositório atualmente contém a configuração inicial da API Node.js:

- Node.js com o módulo nativo `node:http`;
- módulos ES;
- ESLint e Prettier;
- Husky e lint-staged;
- um endpoint `GET /health` para uma verificação básica de disponibilidade.

As rotas de tickets, as validações, a persistência dos dados e os testes
automatizados serão adicionados conforme o desenvolvimento avançar.

## Requisitos

- Node.js 20 ou superior;
- npm.

## Como começar

Instale as dependências:

```bash
npm ci
```

Inicie a API em modo de desenvolvimento:

```bash
npm run dev
```

Por padrão, o servidor será executado em `http://localhost:3333`. Para usar
outra porta, defina a variável de ambiente `PORT` antes de iniciar a
aplicação.

PowerShell:

```powershell
$env:PORT = "3333"
npm run dev
```

Bash:

```bash
PORT=3333 npm run dev
```

## Comandos disponíveis

| Comando            | Descrição                                                      |
| ------------------ | -------------------------------------------------------------- |
| `npm run dev`      | Inicia a API com o modo de observação do Node.js.              |
| `npm start`        | Inicia a API sem o modo de observação.                         |
| `npm run lint`     | Verifica os arquivos JavaScript com o ESLint.                  |
| `npm run lint:fix` | Corrige problemas do ESLint com correção segura.               |
| `npm run check`    | Executa o ESLint e verifica a formatação com o Prettier.       |
| `npm run format`   | Formata o projeto com o Prettier.                              |
| `npm test`         | Placeholder até que os testes automatizados sejam adicionados. |

## Licença

MIT. Consulte o arquivo [LICENSE](LICENSE).

## Créditos

Desenvolvido por [Victor Martins Dias](https://github.com/VictorMartinsD).
