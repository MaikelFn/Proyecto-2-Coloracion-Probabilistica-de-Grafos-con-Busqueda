import { useState } from "react";

type EntradaNumericaProps = {
  minimo?: number;
  maximo?: number;
  defaultValor?: number;
  etiqueta?: string;
  name?: string;
  soloEnteros?: boolean;   
  onChange?: (valor: number) => void;
};

/**
 * Componente EntradaNumerica
 *
 * Componente controlado para ingresar valores numéricos con opciones de:
 * - mínimo / máximo
 * - valor por defecto
 * - permitir solo enteros (props.soloEnteros)
 * - callback onChange con el número final
 *
 * Notas generales:
 * - Mantiene el estado interno `value` que puede ser `""` (campo vacío) o un número.
 * - Convierte la entrada a Number() y valida NaN; si `soloEnteros` está activado se trunca
 *   el valor con Math.trunc().
 * - Aplica "clamping" al rango [minimo, maximo] si se proporcionan esas props.
 * - Llama `props.onChange` con el valor numérico únicamente cuando la entrada es válida.
 */

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
