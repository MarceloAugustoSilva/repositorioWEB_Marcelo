# Aula 02 - API de Tarefas (To-Do) com Express

Exercício prático: API REST de tarefas com Express, organizada em estrutura MVC.

## Estrutura de pastas

```
aula02/
├── app.js                       # ponto de entrada
├── routes/
│   └── tarefaRoutes.js          # define as rotas
├── controllers/
│   └── tarefaController.js      # lógica das rotas
├── models/
│   └── tarefaModel.js           # dados em memória + CRUD
└── middlewares/
    ├── logger.js                # log customizado das requisições
    ├── validarTarefa.js         # valida o body (título obrigatório)
    └── errorHandler.js          # tratamento global de erros
```

## Como rodar

```bash
npm install
npm start          # node app.js
npm run dev        # nodemon app.js
```

Servidor em http://localhost:3000.

## Rotas

| Método | Rota            | Descrição                       |
|--------|-----------------|--------------------------------|
| GET    | `/tarefas`      | Lista todas as tarefas         |
| GET    | `/tarefas/:id`  | Busca uma tarefa pelo id       |
| POST   | `/tarefas`      | Cria uma tarefa (valida body)  |
| PUT    | `/tarefas/:id`  | Atualiza uma tarefa            |
| DELETE | `/tarefas/:id`  | Remove uma tarefa              |

## Exemplos com curl

```bash
# listar
curl http://localhost:3000/tarefas

# criar
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d "{\"titulo\":\"Nova tarefa\"}"

# atualizar
curl -X PUT http://localhost:3000/tarefas/1 \
  -H "Content-Type: application/json" \
  -d "{\"concluida\":true}"

# deletar
curl -X DELETE http://localhost:3000/tarefas/1
```

## Desafio extra implementado

- ✅ Middleware de validação (`validarTarefa.js`) — exige `titulo`
- ✅ Tratamento global de erros (`errorHandler.js`) — captura 400, 404 e 500
