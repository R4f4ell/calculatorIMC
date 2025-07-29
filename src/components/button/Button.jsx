import './button.scss'

const Button = ({ id, text, action }) => {
  return (
    <button id={id} onClick={action}>
      {text}
    </button>
  )
}

export default Button