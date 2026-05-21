# express_mongo - API de Alunos com MongoDB

API REST com Express + Mongoose + dotenv conectada ao MongoDB Atlas.

## Estrutura

```
express_mongo/
├── app.js
├── .env                         # (criar a partir do .env.example)
├── .env.example
├── config/
│   └── database.js              # conexão com MongoDB Atlas
├── models/
│   ├── Aluno.js                 # schema com validações
│   └── Curso.js                 # desafio extra
├── controllers/
│   ├── alunoController.js       # CRUD + try/catch
│   └── cursoController.js
└── routes/
    ├── alunoRoutes.js
    └── cursoRoutes.js
```

## Configuração

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Crie um arquivo `.env` baseado em `.env.example`:
   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://USUARIO:SENHA@cluster0.xxxxx.mongodb.net/escola
   ```

3. Inicie o servidor:
   ```bash
   npm run dev     # com nodemon
   npm start       # node app.js
   ```

## Rotas

### Alunos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET    | `/alunos` | lista todos (filtros: `?curso=Web&ativo=true`) |
| GET    | `/alunos/:id` | busca por id |
| POST   | `/alunos` | cria aluno |
| PUT    | `/alunos/:id` | atualiza |
| DELETE | `/alunos/:id` | remove |

### Cursos (desafio extra)
| Método | Rota | Descrição |
|--------|------|-----------|
| GET    | `/cursos` | lista cursos |
| GET    | `/cursos/:id` | busca por id |
| POST   | `/cursos` | cria curso |
| PUT    | `/cursos/:id` | atualiza |
| DELETE | `/cursos/:id` | remove |

## Exemplos (Thunder Client / curl)

```bash
# Criar aluno
curl -X POST http://localhost:3000/alunos \
  -H "Content-Type: application/json" \
  -d "{\"nome\":\"Marcelo\",\"email\":\"marcelo@email.com\",\"idade\":22,\"curso\":\"Web\"}"

# Listar alunos do curso Web
curl http://localhost:3000/alunos?curso=Web

# Criar curso e relacionar com aluno (passar cursoRef com o _id retornado)
curl -X POST http://localhost:3000/cursos \
  -H "Content-Type: application/json" \
  -d "{\"nome\":\"Web Full Stack\",\"cargaHoraria\":200}"
```

## Schema do Aluno

| Campo      | Tipo     | Regras                                      |
|------------|----------|---------------------------------------------|
| nome       | String   | obrigatório, mín. 2 caracteres              |
| email      | String   | obrigatório, único, formato válido          |
| idade      | Number   | 1–120                                       |
| curso      | String   | obrigatório                                 |
| cursoRef   | ObjectId | referência para `Curso` (desafio extra)     |
| ativo      | Boolean  | default `true`                              |

## Tratamento de erros

Todo controller usa `try/catch` e retorna:
- **400** para `ValidationError` e `CastError` (id inválido)
- **404** para registros não encontrados
- **409** para e-mail duplicado (índice único)
- **500** para erros inesperados
