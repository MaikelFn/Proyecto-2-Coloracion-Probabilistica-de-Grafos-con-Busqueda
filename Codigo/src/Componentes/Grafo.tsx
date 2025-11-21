import Nodo from "./Nodo";
import Arista from "./Arista";

type GrafoProps = {
  nodos: Array<[number, string | null]>;
  aristas: Array<[number, number, boolean]>;
};

function Grafo({ nodos, aristas }: GrafoProps) {
  const posiciones: { [key: number]: { x: number; y: number } } = {};
  const nodosRenderizados = [];

  let minX = Infinity,
    maxX = -Infinity;
  let minY = Infinity,
    maxY = -Infinity;

  for (let i = 0; i < nodos.length; i++) {
    const [id, color] = nodos[i];

    const nodosPorFila = Math.ceil(Math.sqrt(nodos.length));
    const fila = Math.floor(i / nodosPorFila);
    const columna = i % nodosPorFila;

    const espacioX = 80;
    const espacioY = 80;
    const offsetX = (fila % 2) * (espacioX / 2);

    const x = 100 + columna * espacioX + offsetX;
    const y = 100 + fila * espacioY;

    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);

    posiciones[id] = { x, y };
    nodosRenderizados.push(
      <Nodo
        key={id}
        id={id}
        color={color as "Azul" | "Amarillo" | "Morado" | null}
        x={x}
        y={y}
      />
    );
  }

  const padding = 100;
  const width = Math.max(900, maxX - minX + padding * 2);
  const height = Math.max(900, maxY - minY + padding * 2);

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
    <div
      style={{
        position: "relative",
        width: `${width}px`,
        height: `${height}px`,
        border: "1px solid black",
        backgroundColor: "#3b3b3bff",
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
  );
}

export default Grafo;
