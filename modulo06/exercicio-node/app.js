const fs = require('fs');
const { somar, multiplicar, saudacao } = require('./utils');

const resultadoSoma = somar(10, 5);
const resultadoMult = multiplicar(4, 6);
const mensagem = saudacao('Marcelo');

const conteudo = `${mensagem}
Soma de 10 + 5 = ${resultadoSoma}
Multiplicação de 4 * 6 = ${resultadoMult}
`;

console.log(conteudo);

fs.writeFileSync('resultado.txt', conteudo);
console.log('Arquivo resultado.txt criado com sucesso!');
