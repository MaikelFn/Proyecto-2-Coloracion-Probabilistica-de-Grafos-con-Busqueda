import React from "react";

type EntradaNumericaProps = {
  minimo?: number;
  maximo?: number;
  defaultValor?: number;
  etiqueta?: string;
  name?: string;
};
function EntradaNumerica(props: EntradaNumericaProps) {
  const [value, setValue] = React.useState(props.defaultValor);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(Number(event.target.value));
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
