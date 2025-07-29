import './button.scss'

const Button = ({ id, text, action }) => {
  return (
    <button
      id={id}
      onClick={action}
      type="button"
      aria-label={text}
    >
      {text}
    </button>
  )
}

export default Button