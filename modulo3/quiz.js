// Variáveis globais
let perguntas = [];
let atual = 0;
let pontos = 0;

// Elementos do DOM
const elInicio = document.getElementById('inicio');
const elQuiz = document.getElementById('quiz');
const elResultado = document.getElementById('resultado');
const btnIniciar = document.getElementById('btnIniciar');

const elProgresso = document.getElementById('progresso');
const elPergunta = document.getElementById('pergunta');
const elOpcoes = document.getElementById('opcoes');

// Passo 2: Buscar perguntas da API
async function buscarPerguntas() {
  // Usando a Open Trivia DB padrão para garantir disponibilidade
  const url = 'https://opentdb.com/api.php?amount=10&type=multiple';
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    perguntas = data.results;
  } catch (erro) {
    console.log('Erro ao buscar perguntas:', erro);
  }
}

// Passo 3: Montando e embaralhando as alternativas
function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

function getAlternativas(pergunta) {
  const todas = [
    ...pergunta.incorrect_answers,
    pergunta.correct_answer
  ];
  return embaralhar(todas);
}

// Passo 4: Exibindo a pergunta no DOM
function exibirPergunta() {
  const p = perguntas[atual];
  const alternativas = getAlternativas(p);

  // Atualizar progresso
  elProgresso.textContent = `${atual + 1} / ${perguntas.length}`;
  
  // Exibir pergunta (usando innerHTML para decodificar entidades HTML da API)
  elPergunta.innerHTML = p.question;

  // Criar botões para cada alternativa
  elOpcoes.innerHTML = '';
  alternativas.forEach((alt) => {
    const btn = document.createElement('button');
    btn.innerHTML = alt; 
    btn.className = 'opcao';
    elOpcoes.appendChild(btn);
  });
}

// Passo 5: Verificando a resposta (Delegação de eventos)
elOpcoes.addEventListener('click', (e) => {
  // Ignora cliques fora dos botões de opção
  if (!e.target.classList.contains('opcao')) return;

  // Desabilita as opções para evitar duplo clique
  const botoes = elOpcoes.querySelectorAll('.opcao');
  botoes.forEach(b => b.disabled = true);

  const resposta = e.target.innerHTML;
  const correta = perguntas[atual].correct_answer;

  // Feedback visual
  if (resposta === correta) {
    pontos++;
    e.target.classList.add('correta');
  } else {
    e.target.classList.add('errada');
  }

  // Avançar após 1 segundo
  setTimeout(() => {
    atual++;
    if (atual < perguntas.length) {
      exibirPergunta();
    } else {
      exibirResultado();
    }
  }, 1000);
});

// Passo 6: Tela de resultado
function exibirResultado() {
  // Esconder quiz, mostrar resultado
  elQuiz.hidden = true;
  elResultado.hidden = false;

  const total = perguntas.length;
  const pct = Math.round((pontos / total) * 100);

  let msg = 'Tente novamente!';
  if (pct >= 80) msg = 'Excelente!';
  else if (pct >= 60) msg = 'Bom trabalho!';

  elResultado.innerHTML = `
    <h2>${msg}</h2>
    <p>Você acertou ${pontos} de ${total} (${pct}%)</p>
    <button id="btnReiniciar">Jogar novamente</button>
  `;

  // Lógica para reiniciar o jogo
  document.getElementById('btnReiniciar').addEventListener('click', () => {
    atual = 0;
    pontos = 0;
    elResultado.hidden = true;
    elInicio.hidden = false;
  });
}

// Inicialização (Evento do botão Iniciar)
btnIniciar.addEventListener('click', async () => {
  btnIniciar.textContent = 'Carregando...';
  btnIniciar.disabled = true;

  await buscarPerguntas();

  if (perguntas.length > 0) {
    elInicio.hidden = true;
    elQuiz.hidden = false;
    exibirPergunta();
  } else {
    alert('Não foi possível carregar as perguntas.');
  }

  // Reseta o botão para a próxima vez que a tela inicial aparecer
  btnIniciar.textContent = 'Iniciar';
  btnIniciar.disabled = false;
});