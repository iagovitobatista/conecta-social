
import { carregarTemplate } from "./templates.js";
import { renderizarProjetos } from "./componentes.js";

const telasDisponiveis = ["inicio", "projetos", "cadastro"];

export function iniciarNavegacao() {
  const areaConteudo = document.getElementById("conteudo-spa");

  if (!areaConteudo) {
    console.error("Área principal da SPA não encontrada.");
    return;
  }

  async function mostrarTela() {
    const tela = window.location.hash.slice(1) || "inicio";

    if (!telasDisponiveis.includes(tela)) {
      window.location.hash = "inicio";
      return;
    }

    areaConteudo.setAttribute("aria-busy", "true");
    areaConteudo.textContent = "Carregando conteúdo...";

    try {
      // Busca o HTML da tela selecionada.
      const conteudo = await carregarTemplate(tela);

      // Insere o conteúdo na área principal da SPA.
      areaConteudo.innerHTML = conteudo;

      // Gera os cartões após inserir a tela de Projetos no DOM.
      if (tela === "projetos") {
        renderizarProjetos();
      }

      const nomes = {
        inicio: "Início",
        projetos: "Projetos",
        cadastro: "Cadastro"
      };

      document.title = `${nomes[tela]} | Conecta Social`;

      document.querySelectorAll("[data-rota]").forEach((link) => {
        if (link.dataset.rota === tela) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    } catch (erro) {
      console.error("Erro ao carregar a tela:", erro);
      areaConteudo.textContent =
        "Não foi possível carregar esta tela. Tente novamente.";
    } finally {
      areaConteudo.removeAttribute("aria-busy");
    }
  }

  window.addEventListener("hashchange", mostrarTela);

  mostrarTela();
}
