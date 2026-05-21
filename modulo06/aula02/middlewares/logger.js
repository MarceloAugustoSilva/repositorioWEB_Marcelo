function logger(req, res, next) {
  const agora = new Date().toISOString();
  console.log(`[${agora}] ${req.method} ${req.originalUrl}`);
  next();
}

module.exports = logger;
