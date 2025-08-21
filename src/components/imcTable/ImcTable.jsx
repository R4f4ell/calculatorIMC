import React, { memo } from "react";
import "./imcTable.scss";
import Button from "../button/Button";

const ImcTable = ({ data, imc, info, infoClass, resetCalc }) => {
  return (
    <div id="result-container" aria-labelledby="result-title">
      <h2 id="result-title">Resultado do IMC</h2>

      {/* Dica lida por leitor de tela sobre os resultados */}
      <p id="imc-result-hint" style={{ position: "absolute", left: "-9999px" }}>
        O valor do IMC e a situação abaixo são calculados automaticamente a
        partir dos dados informados.
      </p>

      <p id="imc-number" aria-describedby="imc-result-hint">
        Seu IMC:{" "}
        <output
          id="imc-value"
          className={infoClass}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {imc}
        </output>
      </p>

      <p id="imc-info" aria-describedby="imc-result-hint">
        Situação atual:{" "}
        <output
          id="imc-info-value"
          className={infoClass}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {info}
        </output>
      </p>

      <h3 id="table-title">Classificações:</h3>

      {/* Chama a grade que simula tabela */}
      <div
        id="imc-table"
        role="table"
        aria-labelledby="table-title"
        aria-describedby="table-hint"
      >
        <div className="table-header" role="row">
          <div role="columnheader">IMC</div>
          <div role="columnheader">Classificação</div>
          <div role="columnheader">Obesidade</div>
        </div>

        {data.map(({ classification, info, obesity }) => (
          // Usa key estável baseada no valor único 'classification'
          <div className="table-data" role="row" key={classification}>
            <p role="cell">{classification}</p>
            <p role="cell">{info}</p>
            <p role="cell">{obesity}</p>
          </div>
        ))}
      </div>

      {/* Dica lida por leitor de tela sobre a tabela */}
      <p id="table-hint" style={{ position: "absolute", left: "-9999px" }}>
        A tabela mostra faixas de IMC, a classificação correspondente e o grau
        de obesidade.
      </p>

      <div role="group" aria-label="Ações">
        <Button id="back-btn" text="voltar" action={resetCalc} />
      </div>
    </div>
  );
};

export default memo(ImcTable);