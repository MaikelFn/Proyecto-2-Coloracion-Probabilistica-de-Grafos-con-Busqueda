import Nodo from "../Componentes/Nodo";
import Arista from "../Componentes/Arista";
type Color = "Azul" | "Amarillo" | "Morado";

type PrevisualizarProps = {
  nodos: Array<[number, Color]>;
  aristas: Array<[number, number, boolean]>;
};

function Previsualizar({ nodos, aristas }: PrevisualizarProps) {
  const posiciones: { [key: number]: { x: number; y: number } } = {};
  const nodosRenderizados = [];

  for (let i = 0; i < nodos.length; i++) {
    const [id, color] = nodos[i];
    const x = 100 + i * 200;
    const y = 100;

    posiciones[id] = { x, y };
    nodosRenderizados.push(<Nodo key={id} id={id} color={color} x={x} y={y} />);
  }

  const aristasRenderizadas = [];
  for (let i = 0; i < aristas.length; i++) {
    const [id1, id2, conflicto] = aristas[i];

    const pos1 = posiciones[id1];
    const pos2 = posiciones[id2];

    if (pos1 && pos2) {
      aristasRenderizadas.push(
        <Arista
          key={`arista-${id1}-${id2}`}
          x1={pos1.x + 25}
          y1={pos1.y + 25}
          x2={pos2.x + 25}
          y2={pos2.y + 25}
          conflicto={conflicto}
        />
      );
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Grafo</h1>
      <div
        style={{
          position: "relative",
          width: "1800px",
          height: "600px",
          border: "1px solid black",
        }}
      >
        <svg
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          {aristasRenderizadas}
        </svg>
        {nodosRenderizados}
      </div>
    </div>
  );
}

export default Previsualizar;
