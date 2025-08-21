import React, { useCallback, memo, useRef } from "react";
import { toast } from "react-hot-toast";
import "./imcCalc.scss";
import Button from "../button/Button";
import useImcForm from "../../hooks/useImcForm";

const ImcCalc = ({ calcImc }) => {
  // Chama o hook para controlar altura e peso
  const {
    height,
    weight,
    handleHeightChange,
    handleWeightChange,
    clearForm,
  } = useImcForm();

  // Container principal: refs do form e dos campos (para foco/validação)
  const formRef = useRef(null);
  const heightRef = useRef(null);
  const weightRef = useRef(null);

  // Cria handler estável para calcular (evita recriar função inline a cada render)
  const handleCalc = useCallback(
    (e) => {
      // Aqui valida presença dos dois campos antes de chamar calcImc
      const missingHeight = !height || !height.trim();
      const missingWeight = !weight || !weight.trim();

      if (missingHeight || missingWeight) {
        // Chama o reportValidity do form para mostrar as mensagens nativas
        formRef.current?.reportValidity?.();

        // Aqui foca no primeiro campo inválido
        if (missingHeight && heightRef.current) heightRef.current.focus();
        else if (missingWeight && weightRef.current) weightRef.current.focus();

        // Aqui dispara o toast global (fora do container)
        toast.error("Preencha altura e peso para calcular o IMC.");

        // Aqui interrompe o fluxo padrão sem calcular
        e.preventDefault();
        return;
      }

      // Aqui segue o fluxo padrão do app
      calcImc(e, height, weight);
    },
    [calcImc, height, weight]
  );

  // Aqui retorna o markup do formulário
  return (
    <section id="calc-container" aria-labelledby="calc-title">
      <h2 id="calc-title">Calculadora de IMC</h2>

      {/* Chama o form básico */}
      <form id="imc-form" ref={formRef}>
        <div className="form-inputs">
          {/* Controla a altura */}
          <div className="form-control">
            <label htmlFor="height">Altura:</label>
            <input
              type="text"
              name="height"
              id="height"
              placeholder="Exemplo: 1,75"
              inputMode="decimal"
              aria-label="Altura"
              ref={heightRef}
              required
              onChange={handleHeightChange}
              value={height}
            />
          </div>

          {/* Controla o peso */}
          <div className="form-control">
            <label htmlFor="weight">Peso:</label>
            <input
              type="text"
              name="weight"
              id="weight"
              placeholder="Exemplo: 70.5"
              inputMode="decimal"
              aria-label="Peso"
              ref={weightRef}
              required
              onChange={handleWeightChange}
              value={weight}
            />
          </div>
        </div>

        {/* Ações */}
        <div className="action-control">
          <Button id="calc-btn" text="Calcular" action={handleCalc} />
          <Button id="clear-btn" text="Limpar" action={clearForm} />
        </div>
      </form>
    </section>
  );
};

export default memo(ImcCalc);