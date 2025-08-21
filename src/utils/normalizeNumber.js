// normalizar números vindos de inputs
export function normalizeNumber(text) {
  // Chama o replace para manter apenas dígitos, vírgula e ponto
  const cleaned = String(text ?? "")
    .replace(/[^\d.,]/g, "")
    // Aqui troca vírgula por ponto para padronizar decimal
    .replace(",", ".");

  // Aqui garante que só exista um ponto decimal
  const parts = cleaned.split(".");
  if (parts.length > 2) {
    // Aqui junta tudo antes do último ponto como inteiro
    const last = parts.pop();
    const integer = parts.join("");
    // Aqui retorna o número com um único ponto decimal
    return parseFloat(`${integer}.${last}`);
  }

  // Aqui retorna o número final (ou NaN se não der)
  return parseFloat(cleaned);
}

// Chama regra para aceitar "175" como 1.75 (metros)
export function normalizeHeight(text) {
  const raw = String(text ?? "").trim();

  // Aqui aceita somente dígitos sem separador como caso especial
  const onlyDigits = /^[0-9]+$/.test(raw);
  if (onlyDigits) {
    // Aqui converte para número inteiro
    const n = parseInt(raw, 10);
    // Aqui aplica a conversão apenas se for um valor plausível em centímetros (>= 100)
    if (Number.isFinite(n) && n >= 100) {
      return n / 100; // 175 -> 1.75
    }
    // Aqui, para valores menores que 100, assume que o usuário já digitou em metros (ex.: "1", "2")
    // Retorna como número (ex.: "2" -> 2)
    return Number(n);
  }

  // Aqui retorna a normalização padrão quando há vírgula/ponto
  return normalizeNumber(raw);
}