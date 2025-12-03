type AristaProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  conflicto: boolean;
};

/**
 * Componente visual que representa una arista entre dos nodos usando una línea SVG.
 *
 * Nota:
 * - Este componente es "presentacional" y no tiene efectos secundarios ni estado.
 * - Debe renderizarse **dentro** de un elemento <svg> para que las coordenadas y estilos funcionen correctamente.
 * - Se utiliza la prop `conflicto` para cambiar el color del trazo:
 *     - conflicto = true  -> trazo rojo (#ff0000)
 *     - conflicto = false -> trazo gris oscuro (#666)
 */
function Arista(props: AristaProps) {
  return (
    <line
      x1={props.x1}
      y1={props.y1}
      x2={props.x2}
      y2={props.y2}
      stroke={props.conflicto ? "#ff0000" : "#666"}
      strokeWidth="2"
    />
  );
}

export default Arista;
