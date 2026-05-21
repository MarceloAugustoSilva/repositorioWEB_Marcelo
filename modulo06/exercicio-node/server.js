const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <title>Servidor Node.js</title>
        <style>
          body { font-family: Arial, sans-serif; background: #0b1020; color: #fff; text-align: center; padding: 50px; }
          h1 { color: #8b5cf6; }
        </style>
      </head>
      <body>
        <h1>Servidor HTTP com Node.js</h1>
        <p>Servidor rodando na porta ${PORT}</p>
        <p>Exercício prático concluído!</p>
      </body>
    </html>
  `);
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
