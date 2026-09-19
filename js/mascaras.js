/*
  CONECTA SOCIAL
  Experiência Prática II

  Navegação responsiva
  Máscaras de entrada
  Validação e componentes de feedback
*/

document.addEventListener("DOMContentLoaded", function () {

  // ====================================
  // 1. MENU RESPONSIVO
  // ====================================

  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#menu-principal");
  const submenuToggle = document.querySelector(".submenu-toggle");
  const itemSubmenu = document.querySelector(".item-submenu");

  function fecharSubmenu() {
    if (!submenuToggle || !itemSubmenu) return;

    itemSubmenu.classList.remove("submenu-aberto");
    submenuToggle.setAttribute("aria-expanded", "false");
  }

  function fecharMenu() {
    if (!menu || !menuToggle) return;

    menu.classList.remove("menu-aberto");
    menuToggle.setAttribute("aria-expanded", "false");

    fecharSubmenu();
  }

  if (menuToggle && menu) {

    menuToggle.addEventListener("click", function () {

      const aberto = menu.classList.toggle("menu-aberto");

      menuToggle.setAttribute(
        "aria-expanded",
        String(aberto)
      );

    });

  }

  if (submenuToggle && itemSubmenu) {

    submenuToggle.addEventListener("click", function () {

      const aberto = itemSubmenu.classList.toggle(
        "submenu-aberto"
      );

      submenuToggle.setAttribute(
        "aria-expanded",
        String(aberto)
      );

    });

  }

  document.addEventListener("keydown", function (evento) {

    if (evento.key === "Escape") {
      fecharMenu();
      menuToggle?.focus();
    }

  });

  document.addEventListener("click", function (evento) {

    if (!evento.target.closest(".topo")) {
      fecharMenu();
    }

  });


  // ====================================
  // 2. CAMPOS DO FORMULÁRIO
  // ====================================

  const formulario = document.getElementById("formulario");

  if (!formulario) return;

  const cpf = document.getElementById("cpf");
  const telefone = document.getElementById("telefone");
  const cep = document.getElementById("cep");

  const resultado = document.getElementById("resultado");
  const erroCadastro = document.getElementById("erro-cadastro");
  const fecharToast = document.getElementById("fechar-toast");


  // ====================================
  // 3. MÁSCARA DO CPF
  // ====================================

  // Formato: 000.000.000-00

  function formatarCPF(valor) {

    const numeros = valor.replace(/\D/g, "").slice(0, 11);

    if (numeros.length > 9) {

      return (
        numeros.slice(0, 3) + "." +
        numeros.slice(3, 6) + "." +
        numeros.slice(6, 9) + "-" +
        numeros.slice(9)
      );

    }

    if (numeros.length > 6) {

      return (
        numeros.slice(0, 3) + "." +
        numeros.slice(3, 6) + "." +
        numeros.slice(6)
      );

    }

    if (numeros.length > 3) {

      return (
        numeros.slice(0, 3) + "." +
        numeros.slice(3)
      );

    }

    return numeros;

  }

  if (cpf) {

    cpf.addEventListener("input", function () {

      this.value = formatarCPF(this.value);

    });

  }


  // ====================================
  // 4. MÁSCARA DO TELEFONE
  // ====================================

  // Formato: (11) 99999-9999

  function formatarTelefone(valor) {

    const numeros = valor.replace(/\D/g, "").slice(0, 11);

    if (numeros.length === 0) {
      return "";
    }

    if (numeros.length <= 2) {
      return "(" + numeros;
    }

    if (numeros.length <= 7) {

      return (
        "(" + numeros.slice(0, 2) + ") " +
        numeros.slice(2)
      );

    }

    return (
      "(" + numeros.slice(0, 2) + ") " +
      numeros.slice(2, 7) + "-" +
      numeros.slice(7)
    );

  }

  if (telefone) {

    telefone.addEventListener("input", function () {

      this.value = formatarTelefone(this.value);

    });

  }


  // ====================================
  // 5. MÁSCARA DO CEP
  // ====================================

  // Formato: 00000-000

  function formatarCEP(valor) {

    const numeros = valor.replace(/\D/g, "").slice(0, 8);

    if (numeros.length > 5) {

      return (
        numeros.slice(0, 5) + "-" +
        numeros.slice(5)
      );

    }

    return numeros;

  }

  if (cep) {

    cep.addEventListener("input", function () {

      this.value = formatarCEP(this.value);

    });

  }


  // ====================================
  // 6. FEEDBACK DOS CAMPOS
  // ====================================

  const campos = formulario.querySelectorAll(
    "input, select, textarea"
  );

  campos.forEach(function (campo) {

    campo.addEventListener("blur", function () {

      campo.classList.add("campo-interagido");

    });

    campo.addEventListener("input", function () {

      esconderToast();

      if (erroCadastro) {
        erroCadastro.hidden = true;
      }

    });

  });


  // ====================================
  // 7. TOAST DE CONFIRMAÇÃO
  // ====================================

  function esconderToast() {

    if (!resultado) return;

    resultado.classList.remove("visivel");
    resultado.hidden = true;

  }

  function mostrarToast(mensagem) {

    if (!resultado) return;

    const mensagemToast = resultado.querySelector(
      ".toast-mensagem"
    );

    if (mensagemToast) {
      mensagemToast.textContent = mensagem;
    }

    resultado.hidden = false;
    resultado.classList.add("visivel");

  }

  if (fecharToast) {

    fecharToast.addEventListener("click", esconderToast);

  }


  // ====================================
  // 8. VALIDAÇÃO DO FORMULÁRIO
  // ====================================

  formulario.addEventListener("invalid", function (evento) {

    evento.target.classList.add("campo-interagido");

    if (erroCadastro) {
      erroCadastro.hidden = false;
    }

    esconderToast();

  }, true);


  formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    if (!formulario.reportValidity()) {
      return;
    }

    if (erroCadastro) {
      erroCadastro.hidden = true;
    }

    mostrarToast(
      "Cadastro demonstrativo validado com sucesso! " +
      "Nenhum dado foi enviado ou armazenado."
    );

  });


  // ====================================
  // 9. LIMPAR FORMULÁRIO
  // ====================================

  formulario.addEventListener("reset", function () {

    esconderToast();

    if (erroCadastro) {
      erroCadastro.hidden = true;
    }

    campos.forEach(function (campo) {

      campo.classList.remove("campo-interagido");

    });

  });

});
