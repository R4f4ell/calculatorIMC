// Chama o cálculo do IMC
export function calculateImc(weight, height) {
  // Aqui valida entradas numéricas e evita divisão por zero
  if (!Number.isFinite(weight) || !Number.isFinite(height) || height <= 0) return null;
  const imc = weight / (height * height);
  // Aqui retorna com 1 casa decimal 
  return Number(imc.toFixed(1));
}

// Chama a classificação
export function classifyImc(imcValue, data) {
  // Aqui retorna nulo se imc for inválido
  if (typeof imcValue !== "number" || !Number.isFinite(imcValue)) return null;

  // Aqui encontra o intervalo correspondente
  const found = data.find((item) => imcValue >= item.min && imcValue <= item.max);
  if (!found) return null;

  return { info: found.info, infoClass: found.infoClass };
}
