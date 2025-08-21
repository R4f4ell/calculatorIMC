import { useState, useCallback } from "react";

export default function useImcForm() {
  const [height, setHeight] = useState(""); // Aqui guarda a altura como string
  const [weight, setWeight] = useState(""); // Aqui guarda o peso como string

  // Chama o filtro para permitir apenas números e separadores decimais
  const validDigits = useCallback((text) => {
    // Aqui mantém dígitos, vírgula e ponto
    const raw = String(text ?? "").replace(/[^\d.,]/g, "");
    // Aqui evita dois separadores: mantém só o primeiro
    let seen = false;
    let out = "";
    for (const ch of raw) {
      if (ch === "," || ch === ".") {
        if (!seen) {
          out += ch;
          seen = true;
        }
      } else {
        out += ch;
      }
    }
    return out;
  }, []);

  // Aqui retorna o handler para onChange
  const handleInputChange = useCallback(
    (setter) => (e) => {
      const value = validDigits(e.target.value);
      setter(value);
    },
    [validDigits]
  );

  // Aqui limpa os campos
  const clearForm = useCallback((e) => {
    e?.preventDefault?.();
    setHeight("");
    setWeight("");
  }, []);

  // Aqui retorna tudo que o componente precisa
  return {
    height,
    weight,
    setHeight,
    setWeight,
    handleHeightChange: handleInputChange(setHeight),
    handleWeightChange: handleInputChange(setWeight),
    clearForm,
  };
}