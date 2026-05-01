// Captura o container vazio criado no HTML (Passo 1)
const container = document.getElementById('container');

// 2. Crie um array com 5 produtos (nome, preco, categoria)
const produtos = [
    { nome: "Notebock Acer", preco: 2500.00, categoria: "Eletrônicos" },
    { nome: "Camiseta de Dinossauro", preco: 59.90, categoria: "Vestuário" },
    { nome: "Celular", preco: 4500.00, categoria: "Eletrônicos" },
    { nome: "Tênis Esportivo", preco: 299.99, categoria: "Calçados" },
    { nome: "Autografo do professor Leandro", preco: 850.00, categoria: "Premiados" }
];

// Função isolada para criar um único card (facilita o desafio extra)
function criarCardNoDOM(produto) {
    // Cria o elemento da div do card
    const card = document.createElement('div');
    card.classList.add('card');
    
    // Guarda a categoria no próprio elemento HTML para facilitar o filtro depois
    card.dataset.categoria = produto.categoria;

    // 4. Cada card deve mostrar nome, preço formatado (R$) e categoria
    card.innerHTML = `
        <h4>${produto.nome}</h4>
        <p>Categoria: ${produto.categoria}</p>
        <p class="preco">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
    `;

    // Insere o card dentro do container
    container.appendChild(card);
}

// 3. Use forEach para criar um card para cada produto e inserir no container
function renderizarProdutosIniciais() {
    produtos.forEach(produto => {
        criarCardNoDOM(produto);
    });
}

// Chama a função assim que o script carrega para mostrar a lista inicial
renderizarProdutosIniciais();


// ==========================================
// FUNCIONALIDADES DOS BOTÕES
// ==========================================

// 5. Botão "Mostrar só eletrônicos" que filtra usando classList.toggle
function filtrarEletronicos() {
    // Pega todos os cards que estão na tela
    const todosOsCards = document.querySelectorAll('.card');

    todosOsCards.forEach(card => {
        // Verifica se a categoria gravada no card é diferente de "Eletrônicos"
        if (card.dataset.categoria !== "Eletrônicos") {
            // Alterna a classe 'escondido' (se não tiver, coloca; se tiver, tira)
            card.classList.toggle('escondido');
        }
    });
}

// 6. Botão "Limpar" que remove todos os cards
function limparCards() {
    // Esvazia o conteúdo HTML da div container
    container.innerHTML = '';
}

// ==========================================
// DESAFIO EXTRA
// ==========================================

// Função para o input e botão inserirem novos produtos dinamicamente
function adicionarProdutoDinâmico() {
    // Pega os valores digitados nos inputs
    const nome = document.getElementById('inputNome').value;
    const preco = parseFloat(document.getElementById('inputPreco').value);
    const categoria = document.getElementById('inputCategoria').value;

    // Validação básica para não inserir cards vazios ou inválidos
    if (nome === '' || isNaN(preco) || categoria === '') {
        alert("Por favor, preencha todos os campos corretamente.");
        return; 
    }

    // Cria o objeto do novo produto
    const novoProduto = {
        nome: nome,
        preco: preco,
        categoria: categoria
    };

    // Adiciona o novo produto visualmente na tela usando a mesma função do passo 3
    criarCardNoDOM(novoProduto);

    // Limpa os campos de input após adicionar
    document.getElementById('inputNome').value = '';
    document.getElementById('inputPreco').value = '';
    document.getElementById('inputCategoria').value = '';
}