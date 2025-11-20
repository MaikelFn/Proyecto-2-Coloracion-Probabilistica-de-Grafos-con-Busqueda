import { useState } from "react";

type EntradaNumericaProps = {
  minimo?: number;
  maximo?: number;
  defaultValor?: number;
  etiqueta?: string;
  name?: string;
  onChange?: (valor: number) => void;
};

function EntradaNumerica(props: EntradaNumericaProps) {
  const [value, setValue] = useState(props.defaultValor);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const nuevoValor = Number(event.target.value);
    setValue(nuevoValor);
    props.onChange?.(nuevoValor);
  };

  return (
    <div>
      <label>{props.etiqueta}</label>
      <input
        name={props.name}
        value={value}
        type="number"
        onChange={handleChange}
        min={props.minimo}
        max={props.maximo}
      />
    </div>
  );
}
export default EntradaNumerica;
