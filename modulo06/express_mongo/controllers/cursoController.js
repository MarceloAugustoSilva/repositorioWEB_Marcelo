const Curso = require('../models/Curso');

async function listar(req, res) {
  try {
    const cursos = await Curso.find();
    res.json(cursos);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar cursos', detalhe: err.message });
  }
}

async function buscarPorId(req, res) {
  try {
    const curso = await Curso.findById(req.params.id);
    if (!curso) return res.status(404).json({ erro: 'Curso não encontrado' });
    res.json(curso);
  } catch (err) {
    if (err.name === 'CastError') return res.status(400).json({ erro: 'ID inválido' });
    res.status(500).json({ erro: 'Erro ao buscar curso', detalhe: err.message });
  }
}

async function criar(req, res) {
  try {
    const novo = await Curso.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ erro: 'Dados inválidos', detalhes: err.errors });
    }
    if (err.code === 11000) {
      return res.status(409).json({ erro: 'Já existe um curso com esse nome' });
    }
    res.status(500).json({ erro: 'Erro ao criar curso', detalhe: err.message });
  }
}

async function atualizar(req, res) {
  try {
    const atualizado = await Curso.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!atualizado) return res.status(404).json({ erro: 'Curso não encontrado' });
    res.json(atualizado);
  } catch (err) {
    if (err.name === 'CastError') return res.status(400).json({ erro: 'ID inválido' });
    if (err.name === 'ValidationError') {
      return res.status(400).json({ erro: 'Dados inválidos', detalhes: err.errors });
    }
    res.status(500).json({ erro: 'Erro ao atualizar curso', detalhe: err.message });
  }
}

async function remover(req, res) {
  try {
    const removido = await Curso.findByIdAndDelete(req.params.id);
    if (!removido) return res.status(404).json({ erro: 'Curso não encontrado' });
    res.status(204).send();
  } catch (err) {
    if (err.name === 'CastError') return res.status(400).json({ erro: 'ID inválido' });
    res.status(500).json({ erro: 'Erro ao remover curso', detalhe: err.message });
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
