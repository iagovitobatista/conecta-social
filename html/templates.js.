// Relaciona cada tela ao seu arquivo HTML.
const telas = {
  inicio: "html/inicio.html",
  projetos: "html/projetos.html",
  cadastro: "html/cadastro.html"
};

// Carrega o conteúdo da tela escolhida.
export async function carregarTemplate(nomeTela) {
  const caminho = telas[nomeTela];

  if (!caminho) {
    throw new Error("Tela não encontrada.");
  }

  const resposta = await fetch(caminho);

  if (!resposta.ok) {
    throw new Error("Não foi possível carregar a tela.");
  }

  return await resposta.text();
}
