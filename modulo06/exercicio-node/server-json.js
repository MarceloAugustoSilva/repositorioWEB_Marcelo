const http = require('http');
const fs = require('fs');

const PORT = 3001;

const server = http.createServer((req, res) => {
  fs.readFile('dados.json', 'utf-8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ erro: 'Erro ao ler o arquivo JSON' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor JSON rodando em http://localhost:${PORT}`);
});
