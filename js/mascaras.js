
/* Conecta Social - Formulario demonstrativo */

const cpf = document.getElementById("cpf");
const telefone = document.getElementById("telefone");
const cep = document.getElementById("cep");
const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");

// Mascara do CPF: 000.000.000-00
cpf.addEventListener("input", function () {
  let numeros = this.value.replace(/\D/g, "").slice(0, 11);

  numeros = numeros.replace(/^(\d{3})(\d)/, "$1.$2");
  numeros = numeros.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
  numeros = numeros.replace(/(\d{3})\.(\d{3})-(\d)/, "$1.$2-$3");
  numeros = numeros.replace(/(\d{3})-(\d)/, "$1-$2");

  this.value = numeros;
});

// Mascara do telefone: (11) 99999-9999
telefone.addEventListener("input", function () {
  const numeros = this.value.replace(/\D/g, "").slice(0, 11);

  if (numeros.length <= 2) {
    this.value = numeros.length ? "(" + numeros : "";
  } else if (numeros.length <= 7) {
    this.value = "(" + numeros.slice(0, 2) + ") " +
      numeros.slice(2);
  } else {
    this.value = "(" + numeros.slice(0, 2) + ") " +
      numeros.slice(2, 7) + "-" + numeros.slice(7);
  }
});

// Mascara do CEP: 00000-000
cep.addEventListener("input", function () {
  const numeros = this.value.replace(/\D/g, "").slice(0, 8);

  this.value = numeros.length > 5
    ? numeros.slice(0, 5) + "-" + numeros.slice(5)
    : numeros;
});

// Cadastro apenas demonstrativo: sem envio de dados
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  if (!formulario.reportValidity()) {
    return;
  }

  resultado.textContent =
    "Formulario validado com sucesso! " +
    "Esta e apenas uma demonstracao academica. " +
    "Nenhum dado foi enviado ou armazenado.";
});
