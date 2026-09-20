// Conecta Social — Experiência Prática III
// Navegação entre as telas da SPA.

import { carregarTemplate } from "./templates.js";

const telasDisponiveis = ["inicio", "projetos", "cadastro"];

export function iniciarNavegacao() {
  const areaConteudo = document.getElementById("conteudo-spa");

  if (!areaConteudo) {
    console.error("Área principal da SPA não encontrada.");
    return;
  }

  async function mostrarTela() {
    const tela = window.location.hash.slice(1) || "inicio";

    // Impede a tentativa de abrir uma tela inexistente.
    if (!telasDisponiveis.includes(tela)) {
      window.location.hash = "inicio";
      return;
    }

    areaConteudo.setAttribute("aria-busy", "true");
    areaConteudo.textContent = "Carregando conteúdo...";

    try {
      // Busca o HTML da tela e insere na área principal.
      const conteudo = await carregarTemplate(tela);
      areaConteudo.innerHTML = conteudo;

      // Atualiza o título exibido na aba do navegador.
      const nomes = {
        inicio: "Início",
        projetos: "Projetos",
        cadastro: "Cadastro"
      };

      document.title = `${nomes[tela]} | Conecta Social`;

      // Identifica qual opção do menu está ativa.
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

  // Troca a tela quando o endereço muda, inclusive
  // ao usar os botões Voltar e Avançar do navegador.
  window.addEventListener("hashchange", mostrarTela);

  // Carrega a tela inicial ao abrir a aplicação.
  mostrarTela();
}
