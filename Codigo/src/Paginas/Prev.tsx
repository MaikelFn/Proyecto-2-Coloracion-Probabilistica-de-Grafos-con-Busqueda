import Grafo from "../Componentes/Grafo";
import Boton from "../Componentes/Boton";
import { useState } from "react";
import EntradaNumerica from "../Componentes/EntradaNumerica";

type PrevisualizarProps = {
  nodos: Array<[number, string | null]>;
  aristas: Array<[number, number, boolean]>;
};
function Previsualizar({ nodos, aristas }: PrevisualizarProps) {
  const [NumIteraciones, setNumIteraciones] = useState<number>(1000);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        paddingRight: "50px",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Previsualización del Grafo</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <Grafo nodos={nodos} aristas={aristas} />
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <EntradaNumerica
            etiqueta="Número de Iteraciones:"
            minimo={1000}
            defaultValor={1000}
            onChange={(value) => setNumIteraciones(value)}
          />
          <Boton
            texto={`Ejecutar Monte Carlo (${NumIteraciones} iteraciones)`}
            onClick={() => {}}
          />
          <Boton texto="Ejecutar La Vegas" onClick={() => {}} />
          <Boton
            texto="Volver al menú"
            onClick={() => window.location.reload()}
          />
        </div>
      </div>
    </div>
  );
}

export default Previsualizar;
