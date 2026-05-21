# express_mongo - API de Alunos com MongoDB + Autenticação JWT

API REST com Express + Mongoose + dotenv + bcrypt + JWT, conectada ao MongoDB Atlas.

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
│   ├── Curso.js                 # desafio extra
│   └── Usuario.js               # com hash automático (pre save)
├── controllers/
│   ├── alunoController.js
│   ├── cursoController.js
│   └── authController.js        # registrar / login / eu
├── routes/
│   ├── alunoRoutes.js           # protegidas com auth
│   ├── cursoRoutes.js
│   └── authRoutes.js
└── middlewares/
    ├── auth.js                  # verifica JWT (Bearer token)
    └── autorizar.js             # desafio extra: autorização por role
```

## Configuração

1. `npm install`
2. Crie um `.env` baseado em `.env.example`:
   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://USUARIO:SENHA@cluster0.xxxxx.mongodb.net/escola
   JWT_SECRET=uma-string-bem-secreta
   JWT_EXPIRES_IN=1d
   ```
3. `npm run dev`

## Rotas de autenticação

| Método | Rota | Acesso | Descrição |
|--------|------|--------|-----------|
| POST   | `/auth/registrar` | público | cria usuário (campo `role` é ignorado — sempre `user`) |
| POST   | `/auth/login`     | público | retorna `{ usuario, token }` |
| GET    | `/auth/eu`        | 🔒      | retorna dados do usuário do token |

## Rotas protegidas (precisam de Bearer token)

| Método | Rota | Acesso | Descrição |
|--------|------|--------|-----------|
| GET    | `/alunos`     | 🔒 user/admin | lista (filtros `?curso=Web&ativo=true`) |
| GET    | `/alunos/:id` | 🔒 user/admin | busca por id |
| POST   | `/alunos`     | 🔒 user/admin | cria aluno |
| PUT    | `/alunos/:id` | 🔒 user/admin | atualiza |
| DELETE | `/alunos/:id` | 🔒👑 admin    | remove (autorização por role) |

## Fluxo de uso

```bash
# 1. Registrar um usuário (vira role "user")
curl -X POST http://localhost:3000/auth/registrar \
  -H "Content-Type: application/json" \
  -d "{\"nome\":\"Marcelo\",\"email\":\"marcelo@email.com\",\"senha\":\"123456\"}"

# 2. Login -> guarda o token retornado
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"marcelo@email.com\",\"senha\":\"123456\"}"

# 3. Usar o token nas rotas protegidas
curl http://localhost:3000/alunos \
  -H "Authorization: Bearer <SEU_TOKEN_AQUI>"
```

## Como criar um admin

Por segurança, a rota pública `/auth/registrar` **sempre cria usuários com role `user`**.
Para promover alguém a admin, atualize direto no MongoDB Atlas:

```js
db.usuarios.updateOne({ email: 'admin@email.com' }, { $set: { role: 'admin' } })
```

## Schema do Usuário

| Campo | Tipo    | Regras                                  |
|-------|---------|-----------------------------------------|
| nome  | String  | obrigatório, mín. 2 caracteres          |
| email | String  | obrigatório, único, regex de email      |
| senha | String  | obrigatório, mín. 6 chars, hash bcrypt automático no `pre save` |
| role  | String  | enum `'admin' \| 'user'`, default `user` |

## Tratamento de erros

| Status | Quando |
|--------|--------|
| 400 | ValidationError, CastError, body inválido |
| 401 | sem token, token inválido, token expirado, credenciais erradas |
| 403 | autenticado mas sem permissão (role) |
| 404 | recurso não encontrado |
| 409 | e-mail duplicado |
| 500 | erro interno |
