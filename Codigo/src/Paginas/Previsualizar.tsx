import Nodo from "../Componentes/Nodo";
type Color = "Azul" | "Amarillo" | "Morado";

type PrevisualizarProps = {
  nodos: Array<[number, Color]>;
};

function Previsualizar({ nodos }: PrevisualizarProps) {
  const nodosRenderizados = [];
  for (let i = 0; i < nodos.length; i++) {
    const [id, color] = nodos[i];
    nodosRenderizados.push(<Nodo key={id} id={id} color={color} />);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Grafo</h1>
      <div
        style={{
          // Estilo para el contenedor del grafo y para que los nodos sean horizontales
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          padding: "20px",
          border: "1px solid black",
        }}
      >
        {nodosRenderizados}
      </div>
    </div>
  );
}

export default Previsualizar;
