# Exercício Node.js - Módulo 06

Exercício prático de primeiros passos com Node.js.

## Conteúdo

- `utils.js` — módulo com funções exportadas (`somar`, `multiplicar`, `saudacao`)
- `app.js` — importa as funções de `utils.js` e salva o resultado em `resultado.txt`
- `server.js` — servidor HTTP simples que responde com HTML
- `server-json.js` — desafio extra: servidor que lê um arquivo JSON e retorna como resposta HTTP
- `dados.json` — arquivo de dados usado pelo servidor JSON

## Como executar

```bash
# Instalar dependências
npm install

# Rodar o app principal (gera resultado.txt)
npm start

# Rodar em modo desenvolvimento (com nodemon)
npm run dev

# Rodar o servidor HTTP (porta 3000)
node server.js

# Rodar o servidor JSON (porta 3001)
node server-json.js
```

## Requisitos

- Node.js instalado (`node --version`)
- npm instalado (`npm --version`)
