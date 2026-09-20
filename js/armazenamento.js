// Conecta Social — Experiência Prática III
// Armazena somente a preferência de participação.
// Não salva nome, e-mail ou outros dados pessoais.

const CHAVE_PREFERENCIA = "conectaSocialPreferencia";

// Salva a preferência em formato JSON (string).
export function salvarPreferencia(participacao) {
  const opcoesPermitidas = ["doacao", "voluntariado"];

  if (!opcoesPermitidas.includes(participacao)) {
    return false;
  }

  const dados = {
    participacao: participacao
  };

  try {
    localStorage.setItem(
      CHAVE_PREFERENCIA,
      JSON.stringify(dados)
    );

    return true;
  } catch (erro) {
    console.warn("Não foi possível salvar a preferência.", erro);
    return false;
  }
}

// Recupera a string, converte para objeto e verifica seu conteúdo.
export function recuperarPreferencia() {
  try {
    const dadosSalvos = localStorage.getItem(CHAVE_PREFERENCIA);

    if (!dadosSalvos) {
      return null;
    }

    const dados = JSON.parse(dadosSalvos);

    if (
      dados &&
      ["doacao", "voluntariado"].includes(dados.participacao)
    ) {
      return dados.participacao;
    }

    return null;
  } catch (erro) {
    console.warn("Não foi possível recuperar a preferência.", erro);
    return null;
  }
}
