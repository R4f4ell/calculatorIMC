import { useState } from 'react'
import { data } from './data/data'

// Componentes
import ImcCalc from './components/imcCalc/ImcCalc'
import ImcTable from './components/imcTable/ImcTable'

function App() {
  const [imc, setImc] = useState("")
  const [info, setInfo] = useState("")
  const [infoClass, setInfoClass] = useState("")

  const calcImc = (e, height, weight) => {
    e.preventDefault()

    if (!weight || !height) return

    const weightFloat = parseFloat(weight.replace(",", "."))
    const heightFloat = parseFloat(height.replace(",", "."))

    if (isNaN(weightFloat) || isNaN(heightFloat)) return

    const imcResult = (weightFloat / (heightFloat * heightFloat)).toFixed(1)
    setImc(imcResult)

    const found = data.find((item) => imcResult >= item.min && imcResult <= item.max)
    if (found) {
      setInfo(found.info)
      setInfoClass(found.infoClass)
    }
  }

  const resetCalc = (e) => {
    e.preventDefault()
    setImc("")
    setInfo("")
    setInfoClass("")
  }

  return (
    <main role="main">
      <section className="container" aria-label="Calculadora de IMC">
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
      </section>
    </main>
  )
}

export default App