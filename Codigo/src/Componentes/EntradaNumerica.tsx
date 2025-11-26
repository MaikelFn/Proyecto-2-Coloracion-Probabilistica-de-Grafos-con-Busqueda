import { useState } from "react";

type EntradaNumericaProps = {
  minimo?: number;
  maximo?: number;
  defaultValor?: number;
  etiqueta?: string;
  name?: string;
  soloEnteros?: boolean;   // 🔹 NUEVO
  onChange?: (valor: number) => void;
};

function EntradaNumerica(props: EntradaNumericaProps) {
  const [value, setValue] = useState<number | "">(props.defaultValor ?? "");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const texto = event.target.value;

    if (texto === "") {
      setValue("");
      return;
    }

    let nuevoValor = Number(texto);

    if (isNaN(nuevoValor)) return;

    if (props.soloEnteros) {
      nuevoValor = Math.trunc(nuevoValor);
    }

    if (props.minimo !== undefined && nuevoValor < props.minimo) {
      nuevoValor = props.minimo;
    }

    if (props.maximo !== undefined && nuevoValor > props.maximo) {
      nuevoValor = props.maximo;
    }

    setValue(nuevoValor);
    props.onChange?.(nuevoValor);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <label
        style={{
          color: "#333",
          fontWeight: "600",
          fontSize: "0.95rem",
        }}
      >
        {props.etiqueta}
      </label>
      <input
        name={props.name}
        value={value}
        type="number"
        step={props.soloEnteros ? "1" : "any"}   // 🔹 Control de decimales
        onChange={handleChange}
        min={props.minimo}
        max={props.maximo}
        style={{
          padding: "10px 15px",
          fontSize: "1rem",
          border: "2px solid #e0e0e0",
          borderRadius: "8px",
          outline: "none",
          transition: "border-color 0.3s ease",
          color: "#333",
          backgroundColor: "#fff",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#667eea";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#e0e0e0";
        }}
      />
    </div>
  );
}

export default EntradaNumerica;
