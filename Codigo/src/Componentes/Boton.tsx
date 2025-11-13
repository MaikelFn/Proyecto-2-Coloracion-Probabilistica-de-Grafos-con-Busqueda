type BotonProps = {
  texto: string;
  onClick: () => void;
};

function Boton(props: BotonProps) {
  return <button onClick={props.onClick}>{props.texto}</button>;
}

export default Boton;
