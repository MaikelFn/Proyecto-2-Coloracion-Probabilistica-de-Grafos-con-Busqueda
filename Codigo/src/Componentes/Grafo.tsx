import Nodo from "./Nodo";
import Arista from "./Arista";

type GrafoProps = {
  nodos: Array<[number, string | null]>;
  aristas: Array<[number, number, boolean]>;
};

/**
 * Componente Grafo
 *
 * Renderiza una representación visual simple de un grafo usando:
 * - un grid automático para ubicar nodos (posición calculada a partir del índice),
 * - un <svg> para dibujar las aristas (líneas),
 * - componentes `Nodo` posicionados absolutamente para cada vértice.
 *
 * Notas de implementación:
 * - `nodos`: Array de tuplas [id, color] donde:
 *     - id: number (debe ser único para cada nodo)
 *     - color: string | null (por ejemplo "Azul" | "Amarillo" | "Morado" | null)
 * - `aristas`: Array de tuplas [id1, id2, conflicto] donde:
 *     - id1, id2: números que referencian `id` en `nodos`
 *     - conflicto: boolean que indica si esa arista debe mostrarse en rojo
 */

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
  const width = Math.max(60, maxX - minX + padding * 2);
  const height = Math.max(60, maxY - minY + padding * 2);

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
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        borderRadius: "20px",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
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
