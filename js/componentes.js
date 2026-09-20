// Conecta Social — Experiência Prática III
// Dados e template reutilizável dos cartões de projetos.

// Dados fictícios utilizados na demonstração acadêmica.
const projetos = [
  {
    titulo: "Campanhas de doação",
    categoria: "Doações",
    classeBadge: "badge-doacao",
    descricao: "Arrecadação demonstrativa de alimentos, roupas e itens de higiene.",
    imagem: "imagens/projeto-doacoes-se.jpg",
    textoAlternativo: "Ilustração de uma campanha comunitária de doações.",
    textoBotao: "Quero doar"
  },
  {
    titulo: "Oportunidades de voluntariado",
    categoria: "Voluntariado",
    classeBadge: "badge-voluntariado",
    descricao: "Iniciativa demonstrativa de apoio a atividades comunitárias.",
    imagem: "imagens/projeto-voluntariado-se.jpg",
    textoAlternativo: "Ilustração de pessoas participando de uma ação comunitária.",
    textoBotao: "Quero ser voluntário"
  }
];

// Cria o HTML de um cartão a partir dos dados recebidos.
function criarCartao(projeto) {
  return `
    <article class="cartao">
      <img
        class="imagem"
        src="${projeto.imagem}"
        alt="${projeto.textoAlternativo}"
        loading="lazy"
      >

      <div class="cartao-conteudo">
        <span class="badge ${projeto.classeBadge}">
          ${projeto.categoria}
        </span>

        <h2>${projeto.titulo}</h2>

        <p>${projeto.descricao}</p>

        <div class="acoes">
          <a class="botao" href="#cadastro">
            ${projeto.textoBotao}
          </a>
        </div>
      </div>
    </article>
  `;
}

// Insere todos os cartões na área de projetos.
export function renderizarProjetos() {
  const listaProjetos = document.getElementById("lista-projetos");

  if (!listaProjetos) {
    return;
  }

  listaProjetos.innerHTML = projetos.map(criarCartao).join("");
}
