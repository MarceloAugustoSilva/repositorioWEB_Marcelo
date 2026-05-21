const Aluno = require('../models/Aluno');

async function listar(req, res) {
  try {
    const filtro = {};
    if (req.query.curso) filtro.curso = req.query.curso;
    if (req.query.ativo !== undefined) filtro.ativo = req.query.ativo === 'true';

    const alunos = await Aluno.find(filtro).populate('cursoRef');
    res.json(alunos);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar alunos', detalhe: err.message });
  }
}

async function buscarPorId(req, res) {
  try {
    const aluno = await Aluno.findById(req.params.id).populate('cursoRef');
    if (!aluno) {
      return res.status(404).json({ erro: 'Aluno não encontrado' });
    }
    res.json(aluno);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ erro: 'ID inválido' });
    }
    res.status(500).json({ erro: 'Erro ao buscar aluno', detalhe: err.message });
  }
}

async function criar(req, res) {
  try {
    const novo = await Aluno.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ erro: 'Dados inválidos', detalhes: err.errors });
    }
    if (err.code === 11000) {
      return res.status(409).json({ erro: 'E-mail já cadastrado' });
    }
    res.status(500).json({ erro: 'Erro ao criar aluno', detalhe: err.message });
  }
}

async function atualizar(req, res) {
  try {
    const atualizado = await Aluno.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!atualizado) {
      return res.status(404).json({ erro: 'Aluno não encontrado' });
    }
    res.json(atualizado);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ erro: 'ID inválido' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ erro: 'Dados inválidos', detalhes: err.errors });
    }
    res.status(500).json({ erro: 'Erro ao atualizar aluno', detalhe: err.message });
  }
}

async function remover(req, res) {
  try {
    const removido = await Aluno.findByIdAndDelete(req.params.id);
    if (!removido) {
      return res.status(404).json({ erro: 'Aluno não encontrado' });
    }
    res.status(204).send();
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ erro: 'ID inválido' });
    }
    res.status(500).json({ erro: 'Erro ao remover aluno', detalhe: err.message });
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
