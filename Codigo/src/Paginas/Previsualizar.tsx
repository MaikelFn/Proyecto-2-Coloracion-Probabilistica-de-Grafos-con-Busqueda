import React from "react";
import Nodo from "../Componentes/Nodo";
type Color = "Azul" | "Amarillo" | "Morado";

type PrevisualizarProps = {
  nodos: Array<[number, Color]>;
};

function Previsualizar({ nodos }: PrevisualizarProps) {
  const nodosRenderizados = [];
  for (let i = 0; i < 3; i++) {
    nodosRenderizados.push(
      <Nodo
        key={i}
        id={i + 1}
        color={i === 0 ? "Azul" : i === 1 ? "Amarillo" : "Morado"}
        x={100 + i * 200}
        y={100}
      />
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Grafo</h1>
      <div
        style={{
          position: "relative",
          width: "800px",
          height: "600px",
          border: "1px solid black",
        }}
      >
        {nodosRenderizados}
      </div>
    </div>
  );
}

export default Previsualizar;
