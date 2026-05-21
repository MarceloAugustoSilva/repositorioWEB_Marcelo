let tarefas = [
  { id: 1, titulo: 'Estudar Node.js', concluida: false },
  { id: 2, titulo: 'Praticar Express', concluida: false }
];

let proximoId = 3;

function listar() {
  return tarefas;
}

function buscarPorId(id) {
  return tarefas.find(t => t.id === Number(id));
}

function criar(dados) {
  const nova = {
    id: proximoId++,
    titulo: dados.titulo,
    concluida: dados.concluida ?? false
  };
  tarefas.push(nova);
  return nova;
}

function atualizar(id, dados) {
  const tarefa = buscarPorId(id);
  if (!tarefa) return null;
  if (dados.titulo !== undefined) tarefa.titulo = dados.titulo;
  if (dados.concluida !== undefined) tarefa.concluida = dados.concluida;
  return tarefa;
}

function remover(id) {
  const index = tarefas.findIndex(t => t.id === Number(id));
  if (index === -1) return false;
  tarefas.splice(index, 1);
  return true;
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
