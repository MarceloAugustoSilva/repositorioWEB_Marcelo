const tarefaModel = require('../models/tarefaModel');

function listar(req, res) {
  res.json(tarefaModel.listar());
}

function buscarPorId(req, res) {
  const tarefa = tarefaModel.buscarPorId(req.params.id);
  if (!tarefa) {
    const erro = new Error('Tarefa não encontrada');
    erro.status = 404;
    throw erro;
  }
  res.json(tarefa);
}

function criar(req, res) {
  const nova = tarefaModel.criar(req.body);
  res.status(201).json(nova);
}

function atualizar(req, res) {
  const tarefa = tarefaModel.atualizar(req.params.id, req.body);
  if (!tarefa) {
    const erro = new Error('Tarefa não encontrada');
    erro.status = 404;
    throw erro;
  }
  res.json(tarefa);
}

function remover(req, res) {
  const ok = tarefaModel.remover(req.params.id);
  if (!ok) {
    const erro = new Error('Tarefa não encontrada');
    erro.status = 404;
    throw erro;
  }
  res.status(204).send();
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
