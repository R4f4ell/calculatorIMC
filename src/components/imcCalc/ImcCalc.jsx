import { useState } from 'react'
import './imcCalc.scss'
import Button from '../button/Button'

const ImcCalc = ({ calcImc }) => {
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")

  const clearForm = (e) => {
    e.preventDefault()
    setHeight("")
    setWeight("")
  }

  const validDigits = (text) => text.replace(/[^0-9,]/g, "")

  const handleInputChange = (e, setter) => {
    const value = validDigits(e.target.value)
    setter(value)
  }

  return (
    <section id="calc-container" aria-labelledby="calc-title">
      <h2 id="calc-title">Calculadora de IMC</h2>
      <form id="imc-form">
        <div className="form-inputs">
          <div className="form-control">
            <label htmlFor="height">Altura:</label>
            <input
              type="text"
              name="height"
              id="height"
              placeholder="Exemplo: 1,75"
              inputMode='decimal'
              aria-label='Altura'
              onChange={(e) => handleInputChange(e, setHeight)}
              value={height}
            />
          </div>

          <div className="form-control">
            <label htmlFor="weight">Peso:</label>
            <input
              type="text"
              name="weight"
              id="weight"
              placeholder="Exemplo: 70.5"
              inputMode="decimal"
              aria-label="Peso"
              onChange={(e) => handleInputChange(e, setWeight)}
              value={weight}
            />
          </div>
        </div>

        <div className="action-control">
          <Button id="calc-btn" text="Calcular" action={(e) => calcImc(e, height, weight)} />
          <Button id="clear-btn" text="Limpar" action={clearForm} />
        </div>
      </form>
    </section>
  )
}

export default ImcCalc