import './imcTable.scss'
import Button from '../button/Button'

const ImcTable = ({ data, imc, info, infoClass, resetCalc }) => {
  return (
    <section id="result-container" aria-labelledby="result-title">
      <h2 id="result-title">Resultado do IMC</h2>

      <p id="imc-number">
        Seu IMC: <span className={infoClass}>{imc}</span>
      </p>

      <p id="imc-info">
        Situação atual: <span className={infoClass}>{info}</span>
      </p>

      <h3>Classificações:</h3>

      <div id="imc-table" role="table" aria-label="Tabela de classificação de IMC">
        <div className="table-header" role="row">
          <h4 role="columnheader">IMC</h4>
          <h4 role="columnheader">Classificação</h4>
          <h4 role="columnheader">Obesidade</h4>
        </div>

        {data.map(({ classification, info, obesity }, index) => (
          <div className="table-data" role="row" key={`${classification}-${index}`}>
            <p role="cell">{classification}</p>
            <p role="cell">{info}</p>
            <p role="cell">{obesity}</p>
          </div>
        ))}
      </div>

      <Button id="back-btn" text="voltar" action={resetCalc} />
    </section>
  )
}

export default ImcTable