import { memo } from "react";
import "./button.scss";

// Botão básico
const Button = ({ id, text, action }) => {
  return (
    <button
      id={id}
      onClick={action}
      type="button"
      aria-controls={
        id === "calc-btn" || id === "clear-btn"
          ? "imc-form"
          : id === "back-btn"
          ? "result-container"
          : undefined
      }
      aria-describedby={
        id === "calc-btn" || id === "clear-btn"
          ? "form-hint"
          : id === "back-btn"
          ? "table-hint"
          : undefined
      }
    >
      {text}
    </button>
  );
};

// Aqui usa o memo para evitar render desnecessário
export default memo(Button);