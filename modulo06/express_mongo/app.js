require('dotenv').config();
const express = require('express');
const conectarDB = require('./config/database');
const alunoRoutes = require('./routes/alunoRoutes');
const cursoRoutes = require('./routes/cursoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.get('/', (req, res) => {
  res.json({
    mensagem: 'API de Alunos com MongoDB - Módulo 06 / express_mongo',
    rotas: {
      'GET    /alunos': 'lista alunos (filtros: ?curso=Web&ativo=true)',
      'GET    /alunos/:id': 'busca aluno pelo id',
      'POST   /alunos': 'cria aluno',
      'PUT    /alunos/:id': 'atualiza aluno',
      'DELETE /alunos/:id': 'remove aluno',
      'GET    /cursos': 'lista cursos',
      'POST   /cursos': 'cria curso (desafio extra)'
    }
  });
});

app.use('/alunos', alunoRoutes);
app.use('/cursos', cursoRoutes);

app.use((req, res) => {
  res.status(404).json({ erro: `Rota não encontrada: ${req.method} ${req.originalUrl}` });
});

async function iniciar() {
  await conectarDB();
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
}

iniciar();
