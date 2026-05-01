// Selecionando os elementos do DOM
const form = document.getElementById('form-tarefa');
const inputNovaTarefa = document.getElementById('input-nova-tarefa');
const inputBusca = document.getElementById('input-busca');
const listaUl = document.getElementById('lista-tarefas');

// DESAFIO EXTRA: Recuperar tarefas do localStorage ou iniciar com array vazio
let tarefas = JSON.parse(localStorage.getItem('minhasTarefas')) || [];

// Função responsável por desenhar a lista na tela
function renderizarTarefas(termoFiltro = '') {
    // Limpa a <ul> atual
    listaUl.innerHTML = '';

    // Filtra as tarefas baseando-se no que foi digitado na busca (Passo 6)
    const tarefasFiltradas = tarefas.filter(tarefa => 
        tarefa.texto.toLowerCase().includes(termoFiltro.toLowerCase())
    );

    // 2. Adiciona a tarefa como um <li> na lista
    tarefasFiltradas.forEach((tarefa, indexOriginalArray) => {
        const li = document.createElement('li');
        li.textContent = tarefa.texto;
        
        // Guardamos o index original para facilitar a remoção
        li.dataset.index = tarefas.indexOf(tarefa);

        // Se a tarefa estiver concluída, adiciona a classe CSS
        if (tarefa.concluida) {
            li.classList.add('riscada');
        }

        // 5. Adiciona um botão "X" em cada tarefa
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'X';
        btnExcluir.className = 'btn-excluir';

        // Coloca o botão dentro do <li>, e o <li> dentro da <ul>
        li.appendChild(btnExcluir);
        listaUl.appendChild(li);
    });
}

// 1, 2 e 3. Formulário e adição de tarefas
form.addEventListener('submit', (e) => {
    // 3. Impede o reload da página
    e.preventDefault(); 

    const textoTarefa = inputNovaTarefa.value.trim();

    if (textoTarefa !== '') {
        // Adiciona ao array
        tarefas.push({ texto: textoTarefa, concluida: false });
        
        // Atualiza o localStorage e a tela
        salvarNoStorage();
        renderizarTarefas(inputBusca.value);
        
        // Limpa o input
        inputNovaTarefa.value = '';
    }
});

// 4 e 5. DELEGAÇÃO DE EVENTOS na <ul> (Baseado na imagem "Padrão Avançado")
listaUl.addEventListener('click', (e) => {
    // Se o clique foi exatamente no <li> (Para riscar/desriscar)
    if (e.target.tagName === 'LI') {
        const index = e.target.dataset.index;
        
        // Inverte o status da tarefa no array (true vira false, false vira true)
        tarefas[index].concluida = !tarefas[index].concluida;
        
        // Alterna a classe visualmente
        e.target.classList.toggle('riscada');
        
        salvarNoStorage();
    }
    
    // Se o clique foi no botão "X" (Para remover)
    else if (e.target.tagName === 'BUTTON' && e.target.classList.contains('btn-excluir')) {
        // Encontra o <li> pai do botão clicado
        const liPai = e.target.closest('li');
        const index = liPai.dataset.index;
        
        // Remove 1 item do array na posição daquele index
        tarefas.splice(index, 1);
        
        salvarNoStorage();
        // Re-renderiza a lista mantendo o filtro de busca ativo (se houver)
        renderizarTarefas(inputBusca.value);
    }
});

// 6. Campo de busca em tempo real com evento "input"
inputBusca.addEventListener('input', (e) => {
    // Sempre que o utilizador digitar algo, re-renderiza passando o texto como filtro
    renderizarTarefas(e.target.value);
});

// Função auxiliar para o Desafio Extra
function salvarNoStorage() {
    localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
}

// Executa a primeira vez ao carregar a página para mostrar as tarefas salvas
renderizarTarefas();