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
    <>
      <a
        href="#conteudo-principal"
        onFocus={(e) => {
          e.currentTarget.style.position = "static";
          e.currentTarget.style.left = "auto";
        }}
        onBlur={(e) => {
          e.currentTarget.style.position = "absolute";
          e.currentTarget.style.left = "-9999px";
        }}
        style={{ position: "absolute", left: "-9999px" }}
      >
        Pular para o conteúdo principal
      </a>

      <main id="conteudo-principal" tabIndex={-1} aria-label="Conteúdo principal">
        {/* Área viva para leitores de tela anunciarem os toasts */}
        <div role="status" aria-live="polite" aria-atomic="true">
          <Toaster position="top-right" reverseOrder={false} />
        </div>

        <section className="container" aria-label="Calculadora de IMC">
          {/* Suspense com fallback acessível */}
          <Suspense
            fallback={
              <div role="status" aria-live="polite" aria-atomic="true">
                Carregando conteúdo…
              </div>
            }
          >
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
    </>
  );
}

export default App;