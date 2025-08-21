import { memo } from "react";
import "./button.scss";

// Botão básico
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
  );
};

// Aqui usa o memo para evitar render desnecessário
export default memo(Button);