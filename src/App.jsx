import React, { useState, useCallback, lazy, Suspense } from "react";
import { data } from "./data/data";

// Toast de erro
import { Toaster } from "react-hot-toast";

// Componentes
// Chama lazy import (melhora carregamento)
const ImcCalc = lazy(() => import("./components/imcCalc/ImcCalc"));
const ImcTable = lazy(() => import("./components/imcTable/ImcTable"));

// Utils
import { normalizeNumber, normalizeHeight } from "./utils/normalizeNumber";
import { calculateImc, classifyImc } from "./utils/imcMath";

function App() {
  const [imc, setImc] = useState(""); // Guarda o IMC calculado
  const [info, setInfo] = useState(""); // Guarda o texto da situação
  const [infoClass, setInfoClass] = useState(""); // Guarda a classe visual

  // Chama o cálculo do IMC
  const calcImc = useCallback((e, heightText, weightText) => {
    e.preventDefault();

    // Normaliza peso (aceita vírgula ou ponto)
    const weight = normalizeNumber(weightText);
    // Normaliza altura com suporte a "175" -> 1.75
    const height = normalizeHeight(heightText);

    // Sai cedo se inválido
    if (!Number.isFinite(weight) || !Number.isFinite(height) || height <= 0) return;

    // Calcula o IMC com 1 casa
    const imcResult = calculateImc(weight, height);
    if (imcResult == null) return;

    setImc(imcResult);

    // Classifica com base nos dados existentes
    const result = classifyImc(imcResult, data);
    if (result) {
      setInfo(result.info);
      setInfoClass(result.infoClass);
    }
  }, []);

  // Chama o reset para voltar ao formulário
  const resetCalc = useCallback((e) => {
    e.preventDefault();
    setImc("");
    setInfo("");
    setInfoClass("");
  }, []);

  return (
    <main role="main">
      <Toaster position="top-right" reverseOrder={false} />

      <section className="container" aria-label="Calculadora de IMC">
        {/* Chama o Suspense para suportar lazy import sem alterar a UX */}
        <Suspense fallback={null}>
          {!imc ? (
            <ImcCalc calcImc={calcImc} />
          ) : (
            <ImcTable
              data={data}
              imc={imc}
              info={info}
              infoClass={infoClass}
              resetCalc={resetCalc}
            />
          )}
        </Suspense>
      </section>
    </main>
  );
}

export default App;