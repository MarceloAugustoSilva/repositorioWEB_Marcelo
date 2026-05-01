function calcularDesconto() {
    // 1. Pega os valores que estão nos campos de input do HTML
    const nome = document.getElementById('nome').value;
    const precoProduto = Number(document.getElementById('preco').value);
    const percentualDesconto = Number(document.getElementById('desconto').value);

    // 2. Calcula o valor do desconto e o preço final
    const valorDesconto = precoProduto * (percentualDesconto / 100);
    const precoFinal = precoProduto - valorDesconto;

    // 3. Verificações lógicas
    const precoMaiorQue100 = precoProduto > 100;
    const descontoValido = percentualDesconto >= 0 && percentualDesconto <= 100;

    // 4. Monta o bloco de texto HTML com os resultados
    // Usamos crases (template literals) para injetar as variáveis e criar parágrafos <p>
    const resultadoHTML = `
        <p class="linha-codigo">"Olá, ${nome}! O produto custa R$ ${precoProduto.toFixed(2)}"</p>
        <p class="linha-codigo">"Desconto de ${percentualDesconto}%: R$ ${valorDesconto.toFixed(2)}"</p>
        <p class="linha-codigo">"Preço final: R$ ${precoFinal.toFixed(2)}"</p>
        <p class="linha-codigo">"Preço acima de R$ 100? ${precoMaiorQue100}"</p>
        <p class="linha-codigo">"Desconto válido? ${descontoValido}"</p>
    `;

    // 5. Encontra a div de resultado na tela e joga o texto montado lá dentro
    const divResultado = document.getElementById('resultado');
    divResultado.innerHTML = resultadoHTML;
    
    // Faz a div de resultado aparecer (ela estava com display: none no CSS)
    divResultado.style.display = "block";
}