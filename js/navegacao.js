
import { carregarTemplate } from "./templates.js";
import { renderizarProjetos } from "./componentes.js";
import { iniciarFormulario } from "./formulario.js";

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
      // Busca o HTML da tela escolhida.
      const conteudo = await carregarTemplate(tela);

      // Coloca o conteúdo na área principal da SPA.
      areaConteudo.innerHTML = conteudo;

      // Inicializa as funcionalidades específicas de cada tela.
      if (tela === "projetos") {
        renderizarProjetos();
      }

      if (tela === "cadastro") {
        iniciarFormulario();
      }

      // Atualiza o título da aba.
      const nomes = {
        inicio: "Início",
        projetos: "Projetos",
        cadastro: "Cadastro"
      };

      document.title = `${nomes[tela]} | Conecta Social`;

      // Indica visualmente a opção ativa no menu.
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

  // Reage às mudanças de rota e ao histórico do navegador.
  window.addEventListener("hashchange", mostrarTela);

  // Mostra a tela inicial ao abrir a aplicação.
  mostrarTela();
}
