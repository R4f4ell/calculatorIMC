import './imcTable.scss'
import Button from '../button/Button'

const ImcTable = ({ data, imc, info, infoClass, resetCalc }) => {
  return (
    <div id="result-container">
      <p id="imc-number">
        Seu IMC: <span className={infoClass}>{imc}</span>
      </p>

      <p id="imc-info">
        Situação atual: <span className={infoClass}>{info}</span>
      </p>

      <h3>Confira as classificações:</h3>

      <div id="imc-table">
        <div className="table-header">
          <h4>IMC</h4>
          <h4>Classificação</h4>
          <h4>Obesidade</h4>
        </div>

        {data.map(({ classification, info, obesity }, index) => (
          <div className="table-data" key={`${classification}-${index}`}>
            <p>{classification}</p>
            <p>{info}</p>
            <p>{obesity}</p>
          </div>
        ))}
      </div>

      <Button id="back-btn" text="voltar" action={resetCalc} />
    </div>
  )
}

export default ImcTable