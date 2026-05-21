const express = require('express');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const tarefaRoutes = require('./routes/tarefaRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.json({
    mensagem: 'API de Tarefas - Módulo 06 / Aula 02',
    rotas: {
      'GET    /tarefas': 'lista todas as tarefas',
      'GET    /tarefas/:id': 'busca uma tarefa pelo id',
      'POST   /tarefas': 'cria uma nova tarefa (body: { titulo, concluida? })',
      'PUT    /tarefas/:id': 'atualiza uma tarefa',
      'DELETE /tarefas/:id': 'remove uma tarefa'
    }
  });
});

app.use('/tarefas', tarefaRoutes);

app.use((req, res, next) => {
  const erro = new Error(`Rota não encontrada: ${req.method} ${req.originalUrl}`);
  erro.status = 404;
  next(erro);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
