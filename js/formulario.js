
import {
  salvarPreferencia,
  recuperarPreferencia
} from "./armazenamento.js";

// Conecta Social — Experiência Prática III
// Validação e preferência de participação do formulário da SPA.

export function iniciarFormulario() {
  const formulario = document.getElementById("formulario-spa");

  // O formulário só existe quando a tela Participe é carregada.
  if (!formulario) {
    return;
  }

  const nome = document.getElementById("nome-spa");
  const email = document.getElementById("email-spa");
  const participacao = document.getElementById("participacao-spa");

  // Recupera a preferência salva e restaura a seleção no formulário.
  const preferenciaSalva = recuperarPreferencia();

  if (preferenciaSalva) {
    participacao.value = preferenciaSalva;
  }

  // Cria uma área para apresentar mensagens ao usuário.
  const feedback = document.createElement("p");
  feedback.id = "feedback-formulario-spa";
  feedback.setAttribute("role", "status");
  feedback.setAttribute("aria-live", "polite");
  feedback.hidden = true;

  formulario.appendChild(feedback);

  function mostrarMensagem(texto, sucesso = false) {
    feedback.textContent = texto;
    feedback.style.color = sucesso ? "#166534" : "#b91c1c";
    feedback.style.fontWeight = "bold";
    feedback.hidden = false;
  }

  function limparMensagem() {
    feedback.textContent = "";
    feedback.hidden = true;
  }

  function validarNome() {
    const nomeDigitado = nome.value.trim();

    if (nome.value.length > 0 && nomeDigitado.length === 0) {
      nome.setCustomValidity("O nome não pode conter apenas espaços.");
    } else if (nomeDigitado.length > 0 && nomeDigitado.length < 3) {
      nome.setCustomValidity(
        "Informe um nome fictício com pelo menos 3 caracteres."
      );
    } else {
      nome.setCustomValidity("");
    }
  }

  // Reage à digitação e atualiza o estado visual dos campos.
  formulario.addEventListener("input", function (evento) {
    limparMensagem();

    if (evento.target === nome) {
      validarNome();
    }

    if (evento.target.matches("input")) {
      evento.target.classList.add("campo-interagido");
    }
  });

  // Salva somente a modalidade escolhida, nunca nome ou e-mail.
  participacao.addEventListener("change", function () {
    limparMensagem();
    participacao.classList.add("campo-interagido");

    salvarPreferencia(participacao.value);
  });

  // Apresenta orientações quando a validação HTML5 detecta um erro.
  formulario.addEventListener(
    "invalid",
    function (evento) {
      evento.target.classList.add("campo-interagido");

      mostrarMensagem(
        "Confira os campos obrigatórios e os formatos solicitados antes de continuar."
      );
    },
    true
  );

  // Impede o envio tradicional e apresenta o resultado da validação.
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    validarNome();

    if (
      !nome.checkValidity() ||
      !email.checkValidity() ||
      !participacao.checkValidity()
    ) {
      mostrarMensagem(
        "Existem informações que precisam ser corrigidas no formulário."
      );

      formulario.reportValidity();
      return;
    }

    mostrarMensagem(
      "Cadastro demonstrativo validado! Nenhum nome ou e-mail foi enviado ou armazenado. A preferência de participação pode ficar salva neste navegador.",
      true
    );
  });
}
