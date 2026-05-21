function somar(a, b) {
  return a + b;
}

function multiplicar(a, b) {
  return a * b;
}

function saudacao(nome) {
  return `Olá, ${nome}! Bem-vindo ao Node.js.`;
}

module.exports = { somar, multiplicar, saudacao };
