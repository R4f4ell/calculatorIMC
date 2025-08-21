import React, { useCallback, memo, useRef } from "react";
import { toast } from "sonner";
import "./imcCalc.scss";
import Button from "../button/Button";
import useImcForm from "../../hooks/useImcForm";

const ImcCalc = ({ calcImc }) => {
  const {
    height,
    weight,
    handleHeightChange,
    handleWeightChange,
    clearForm,
  } = useImcForm();

  const formRef = useRef(null);
  const heightRef = useRef(null);
  const weightRef = useRef(null);

  const lastToastIdRef = useRef(null);

  const dismissIfBothFilled = useCallback(
    (h, w) => {
      const hasBoth = h && h.trim() && w && w.trim();
      if (hasBoth && lastToastIdRef.current) {
        toast.dismiss(lastToastIdRef.current);
        lastToastIdRef.current = null;
      }
    },
    []
  );

  const onHeightChange = useCallback(
    (e) => {
      handleHeightChange(e);
      dismissIfBothFilled(e.target.value, weight);
    },
    [handleHeightChange, weight, dismissIfBothFilled]
  );

  const onWeightChange = useCallback(
    (e) => {
      handleWeightChange(e);
      dismissIfBothFilled(height, e.target.value);
    },
    [handleHeightChange, height, dismissIfBothFilled]
  );

  const handleCalc = useCallback(
    (e) => {
      e.preventDefault();

      const missingHeight = !height || !height.trim();
      const missingWeight = !weight || !weight.trim();

      if (missingHeight || missingWeight) {
        if (missingHeight && heightRef.current) heightRef.current.focus();
        else if (missingWeight && weightRef.current) weightRef.current.focus();

        const id = toast.error("Preencha os campos", {
          duration: 3500,
          className: "imc-toast",
        });
        lastToastIdRef.current = id;
        return;
      }

      if (lastToastIdRef.current) {
        toast.dismiss(lastToastIdRef.current);
        lastToastIdRef.current = null;
      }

      calcImc(e, height, weight);
    },
    [calcImc, height, weight]
  );

  return (
    <div id="calc-container" aria-labelledby="calc-title">
      <h2 id="calc-title">Calculadora de IMC</h2>

      <form
        id="imc-form"
        ref={formRef}
        role="form"
        aria-describedby="form-hint"
        onSubmit={handleCalc}
        noValidate
      >
        <p id="form-hint" style={{ position: "absolute", left: "-9999px" }}>
          Informe altura em metros, por exemplo 1,75, e peso em quilogramas, por
          exemplo 70,5.
        </p>

        <div
          className="form-inputs"
          role="group"
          aria-labelledby="inputs-legend"
          aria-describedby="form-hint"
        >
          <span
            id="inputs-legend"
            style={{ position: "absolute", left: "-9999px" }}
          >
            Dados necessários para calcular o IMC
          </span>

          <div className="form-control">
            <label htmlFor="height">Altura:</label>
            <input
              type="text"
              name="height"
              id="height"
              placeholder="Exemplo: 1,75"
              inputMode="decimal"
              aria-label="Altura"
              aria-describedby="height-hint form-hint"
              ref={heightRef}
              onChange={onHeightChange}
              value={height}
              autoComplete="off"
              enterKeyHint="done"
            />
            <span
              id="height-hint"
              style={{ position: "absolute", left: "-9999px" }}
            >
              Altura em metros. Aceita vírgula ou ponto.
            </span>
          </div>

          <div className="form-control">
            <label htmlFor="weight">Peso:</label>
            <input
              type="text"
              name="weight"
              id="weight"
              placeholder="Exemplo: 70,5"
              inputMode="decimal"
              aria-label="Peso"
              aria-describedby="weight-hint form-hint"
              ref={weightRef}
              onChange={onWeightChange}
              value={weight}
              autoComplete="off"
              enterKeyHint="done"
            />
            <span
              id="weight-hint"
              style={{ position: "absolute", left: "-9999px" }}
            >
              Peso em quilogramas. Aceita vírgula ou ponto.
            </span>
          </div>
        </div>

        <div className="action-control">
          <Button id="calc-btn" text="Calcular" action={handleCalc} />
          <Button id="clear-btn" text="Limpar" action={clearForm} />
        </div>
      </form>
    </div>
  );
};

export default memo(ImcCalc);