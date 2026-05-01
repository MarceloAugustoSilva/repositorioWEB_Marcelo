// 1. Crie um array de objetos com 5 alunos (nome, nota1, nota2)
const alunos = [
    { nome: "Ana", nota1: 8.5, nota2: 7.0 },
    { nome: "Bruno", nota1: 5.0, nota2: 4.5 },
    { nome: "Carlos", nota1: 9.0, nota2: 9.5 },
    { nome: "Daniela", nota1: 6.0, nota2: 6.0 },
    { nome: "Eduardo", nota1: 4.0, nota2: 7.0 }
];

// 2. Crie uma função calcularMedia que recebe nota1 e nota2 e retorna a média
function calcularMedia(nota1, nota2) {
    return (nota1 + nota2) / 2;
}

// 3. Use map() para adicionar a propriedade media a cada aluno
const alunosComMedia = alunos.map(aluno => {
    return {
        nome: aluno.nome,
        nota1: aluno.nota1,
        nota2: aluno.nota2,
        media: calcularMedia(aluno.nota1, aluno.nota2)
    };
});

// Desafio extra: ordene os alunos por média usando sort()
// Decidi ordenar do maior para o menor (ordem decrescente)
alunosComMedia.sort((a, b) => b.media - a.media);

// 4. Use filter() para separar aprovados (media >= 6) e reprovados
const alunosAprovados = alunosComMedia.filter(aluno => aluno.media >= 6);
const alunosReprovados = alunosComMedia.filter(aluno => aluno.media < 6);

// 5. Use reduce() para calcular a média geral da turma
// O '0' no final é o valor inicial do acumulador
const somaMedias = alunosComMedia.reduce((acumulador, aluno) => acumulador + aluno.media, 0);
const mediaGeralTurma = somaMedias / alunosComMedia.length;

// 6. Exiba tudo no console com template literals formatados
console.log("=== RELATÓRIO DO GERENCIADOR DE ALUNOS ===");

console.log("\n📚 Lista de Alunos (Ordenada por Média):");
alunosComMedia.forEach(aluno => {
    console.log(`Aluno: ${aluno.nome} | Notas: ${aluno.nota1} e ${aluno.nota2} | Média Final: ${aluno.media.toFixed(1)}`);
});

console.log("\n Alunos Aprovados:");
alunosAprovados.forEach(aluno => {
    console.log(`- ${aluno.nome} (Média: ${aluno.media.toFixed(1)})`);
});

console.log("\n Alunos Reprovados:");
alunosReprovados.forEach(aluno => {
    console.log(`- ${aluno.nome} (Média: ${aluno.media.toFixed(1)})`);
});

console.log(`\n📊 Média Geral da Turma: ${mediaGeralTurma.toFixed(2)}`);