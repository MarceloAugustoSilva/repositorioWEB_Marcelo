function validarTarefa(req, res, next) {
  const { titulo, concluida } = req.body;
  const ehCriacao = req.method === 'POST';

  if (ehCriacao) {
    if (!titulo || typeof titulo !== 'string' || titulo.trim() === '') {
      const erro = new Error('O campo "titulo" é obrigatório e deve ser uma string não vazia.');
      erro.status = 400;
      return next(erro);
    }
  } else {
    if (titulo !== undefined && (typeof titulo !== 'string' || titulo.trim() === '')) {
      const erro = new Error('O campo "titulo", quando informado, deve ser uma string não vazia.');
      erro.status = 400;
      return next(erro);
    }
  }

  if (concluida !== undefined && typeof concluida !== 'boolean') {
    const erro = new Error('O campo "concluida" deve ser booleano.');
    erro.status = 400;
    return next(erro);
  }

  next();
}

module.exports = validarTarefa;
