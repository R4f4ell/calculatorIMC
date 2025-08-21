import React, { useState, useCallback, lazy, Suspense } from "react";
import { data } from "./data/data";

// Toast (Sonner)
import { Toaster } from "sonner";

// Componentes
const ImcCalc = lazy(() => import("./components/imcCalc/ImcCalc"));
const ImcTable = lazy(() => import("./components/imcTable/ImcTable"));

// Utils
import { normalizeNumber, normalizeHeight } from "./utils/normalizeNumber";
import { calculateImc, classifyImc } from "./utils/imcMath";

function App() {
  const [imc, setImc] = useState("");
  const [info, setInfo] = useState("");
  const [infoClass, setInfoClass] = useState("");

  const calcImc = useCallback((e, heightText, weightText) => {
    e.preventDefault();

    const weight = normalizeNumber(weightText);
    const height = normalizeHeight(heightText);

    if (!Number.isFinite(weight) || !Number.isFinite(height) || height <= 0) return;

    const imcResult = calculateImc(weight, height);
    if (imcResult == null) return;

    setImc(imcResult);

    const result = classifyImc(imcResult, data);
    if (result) {
      setInfo(result.info);
      setInfoClass(result.infoClass);
    }
  }, []);

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
        <div role="status" aria-live="polite" aria-atomic="true">
          <Toaster
            position="top-right"
            richColors
            closeButton={false}
            className="imc-toaster"
          />
        </div>

        <section className="container" aria-label="Calculadora de IMC">
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