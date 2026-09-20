
 // Conecta Social — Experiência Prática III
 // Eventos e validação do formulário demonstrativo da SPA.

export function iniciarFormulario() {
  const formulario = document.getElementById("formulario-spa");

  // A função só deve atuar quando a tela de Cadastro estiver aberta.
  if (!formulario) {
    return;
  }

  const nome = document.getElementById("nome-spa");
  const email = document.getElementById("email-spa");
  const participacao = document.getElementById("participacao-spa");

  // Cria uma área de feedback abaixo do botão do formulário.
  const feedback = document.createElement("p");
  feedback.id = "feedback-formulario-spa";
  feedback.setAttribute("role", "status");
  feedback.setAttribute("aria-live", "polite");
  feedback.hidden = true;

  formulario.appendChild(feedback);

  // Exibe uma mensagem sem substituir o conteúdo do formulário.
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

  // Impede que um nome composto apenas por espaços seja aceito.
  function validarNome() {
    const nomeDigitado = nome.value.trim();

    if (nomeDigitado.length > 0 && nomeDigitado.length < 3) {
      nome.setCustomValidity("Informe um nome fictício com pelo menos 3 caracteres.");
    } else if (nome.value.length > 0 && nomeDigitado.length === 0) {
      nome.setCustomValidity("O nome não pode conter apenas espaços.");
    } else {
      nome.setCustomValidity("");
    }
  }

  // Evento input: reage enquanto a pessoa digita.
  formulario.addEventListener("input", function (evento) {
    limparMensagem();

    if (evento.target === nome) {
      validarNome();
    }

    // Utiliza os estilos de validação já preparados no CSS.
    if (evento.target.matches("input")) {
      evento.target.classList.add("campo-interagido");
    }
  });

  // Evento change: reage à escolha da modalidade de participação.
  participacao.addEventListener("change", function () {
    limparMensagem();
    participacao.classList.add("campo-interagido");
  });

  // Captura tentativas de envio bloqueadas pela validação HTML5.
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

  // Evento submit: evita o recarregamento e valida o cadastro.
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
      "Cadastro demonstrativo validado com sucesso! Nenhum dado foi enviado ou armazenado.",
      true
    );
  });
}
