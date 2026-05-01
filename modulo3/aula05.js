// Seleção de elementos
const inputPokemon = document.getElementById('input-pokemon');
const btnBuscar = document.getElementById('btn-buscar');
const pokedexCard = document.getElementById('pokedex-card');
const btnAnterior = document.getElementById('btn-anterior');
const btnProximo = document.getElementById('btn-proximo');

// Variável para o Desafio Extra (guardar o número atual)
let idAtual = 1;

// Mapeamento de cores sólidas para alterar o fundo do card base principal
const coresCard = {
    normal: '#8f8e61', fire: '#c45e12', water: '#3d6cdb', electric: '#c9a512',
    grass: '#58a12e', ice: '#67b3b0', fighting: '#9c1c17', poison: '#822880',
    ground: '#ba983a', flying: '#8064d1', psychic: '#d63366', bug: '#849607',
    rock: '#8f7d23', ghost: '#563a7a', dragon: '#4c1ad6', dark: '#4f3c2f',
    steel: '#8c8c9e', fairy: '#b36189'
};

// 2. Função principal para consultar a PokeAPI usando fetch
async function buscarPokemon(query) {
    // 4. Mostre "Carregando..." enquanto busca
    pokedexCard.innerHTML = '<div class="mensagem">Carregando dados... ⏳</div>';
    pokedexCard.style.backgroundColor = '#252a41'; // Reseta cor de fundo

    try {
        // A API exige que as strings estejam em letras minúsculas
        const formatoBusca = query.toString().toLowerCase();
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${formatoBusca}`);

        // 4. Trate erros (Pokémon não encontrado)
        if (!resposta.ok) {
            throw new Error("Pokémon não encontrado na base de dados.");
        }

        const dadosPokemon = await resposta.json();
        
        // Atualiza o ID atual para os botões "Anterior/Próximo"
        idAtual = dadosPokemon.id; 
        
        renderizarPokemonNaTela(dadosPokemon);

    } catch (erro) {
        pokedexCard.innerHTML = `<div class="mensagem" style="color: #e74c3c;">❌ Erro: <br> ${erro.message}</div>`;
    }
}

// 3 e 5. Função para desenhar os dados recebidos na tela
function renderizarPokemonNaTela(pokemon) {
    // Pegamos o primeiro tipo (índice 0) para definir a cor principal do card
    const tipoPrincipal = pokemon.types[0].type.name;
    
    // 5. Estiliza o card usando a cor do tipo mapeada
    pokedexCard.style.backgroundColor = coresCard[tipoPrincipal] || '#252a41';

    // Cria os elementos visuais dos tipos (Badges)
    const HTMLTipos = pokemon.types.map(tipoObj => 
        `<span class="type-badge tipo-${tipoObj.type.name}">${tipoObj.type.name}</span>`
    ).join('');

    // Cria a lista de estatísticas base (Stats)
    const HTMLEstatisticas = pokemon.stats.map(statObj => 
        `<div class="stat-linha">
            <span class="stat-nome">${statObj.stat.name.toUpperCase()}</span>
            <span class="stat-valor">${statObj.base_stat}</span>
        </div>`
    ).join('');

    // Pegamos a melhor imagem oficial (se não existir, usamos a sprite padrão)
    const urlImagem = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;

    // 3. Exibe o nome, imagem, tipo(s) e estatísticas injetando HTML
    pokedexCard.innerHTML = `
        <div class="img-container">
            <img src="${urlImagem}" alt="${pokemon.name}">
        </div>
        <h2 class="pokemon-nome">
            ${pokemon.name} <span class="pokemon-id">#${pokemon.id}</span>
        </h2>
        <div class="types-container">
            ${HTMLTipos}
        </div>
        <div class="stats-container">
            ${HTMLEstatisticas}
        </div>
    `;
}

// =====================================
// OUVINTES DE EVENTOS (EVENT LISTENERS)
// =====================================

// Evento ao clicar no botão buscar
btnBuscar.addEventListener('click', () => {
    const valorDigitado = inputPokemon.value.trim();
    if (valorDigitado !== '') {
        buscarPokemon(valorDigitado);
        inputPokemon.value = ''; // Limpa o campo após a busca
    }
});

// Evento para permitir buscar apertando "Enter" no teclado
inputPokemon.addEventListener('keypress', (evento) => {
    if (evento.key === 'Enter') {
        btnBuscar.click();
    }
});

// =====================================
// DESAFIO EXTRA: NAVEGAÇÃO
// =====================================

btnAnterior.addEventListener('click', () => {
    // Garante que não vamos buscar o Pokémon 0 ou negativo
    if (idAtual > 1) {
        buscarPokemon(idAtual - 1);
    }
});

btnProximo.addEventListener('click', () => {
    buscarPokemon(idAtual + 1);
});

// Opcional: Carregar o Bulbasaur (#1) direto ao iniciar a página!
buscarPokemon(1);