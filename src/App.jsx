import { data } from './data/data'

import { useState } from 'react'

// Importando o CSS e os Componentes
import ImcCalc from './components/imcCalc/ImcCalc'
import ImcTable from './components/imcTable/ImcTable'

function App() {
  const calcImc = (e, height, weight) => {
    e.preventDefault()

    if(!weight || !height) return

    const weightfloat = +weight.replace(",", ".")
    const heightfloat = +height.replace(",", ".")

    const imcResult = (weightfloat / (heightfloat * heightfloat)).toFixed(1)

    setImc(imcResult)

    data.forEach((item) => {
      if(imcResult >= item.min && imcResult <= item.max){
        setInfo(item.info)
        setInfoClass(item.infoClass)
      }
    })

    if(!info) return
  }

  const resetCalc = (e) => {
    e.preventDefault()
    setImc("")
    setInfo("")
    setInfoClass("")
  }

  const [imc, setImc] = useState("")
  const [info, setInfo] = useState("")
  const[infoClass, setInfoClass] = useState("")

  return (
    <div className='container'>
      {/* Chamando o componente para esta DIV */}
      {!imc ?(
        <ImcCalc calcImc={calcImc}/>
      ) : (
        <ImcTable data={data} imc={imc} info={info} infoClass={infoClass} resetCalc={resetCalc}/>
      )}
    </div>
  )
}

export default App
