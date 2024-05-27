import { FormatoData } from "./enums/FormatoData";

export function formatarData(data: Date, formato: FormatoData = FormatoData.PADRAO): string {
  if (formato === FormatoData.MES_ANO) {
    return data.toLocaleDateString("pt-br", {
      month: "2-digit",
      year: "numeric"
    });
  }
  else if (formato === FormatoData.DIA_MES) {
    return data.toLocaleDateString("pt-br", {
      day: "2-digit",
      month: "2-digit"
    });
  }

  return new Date(data).toLocaleDateString("pt-br");
}

export function gerarHashAleatorio(tamanho: number = 16): string {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let hash = '';

  for (let i = 0; i < tamanho; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    hash += caracteres.charAt(indice);
  }

  // Adiciona um timestamp para tornar o hash mais único
  hash += Date.now().toString();

  return hash;
}