function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  console.error(`[ERRO] ${req.method} ${req.originalUrl} -> ${status}: ${err.message}`);
  res.status(status).json({
    erro: err.message || 'Erro interno do servidor',
    status
  });
}

module.exports = errorHandler;
