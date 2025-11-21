import { useState } from "react";
import Boton from "../Componentes/Boton";
import EntradaNumerica from "../Componentes/EntradaNumerica";
import "../logica";

type GenerarGrafoAleatorioProps = {
  GenerarGrafoA: (numNodos: number, probabilidadArista: number) => void;
  cambiarPagina: (
    pagina: "menu" | "generarAleatorio" | "previsualizar"
  ) => void;
};
function GenerarGrafoAleatorio({
  GenerarGrafoA,
  cambiarPagina,
}: GenerarGrafoAleatorioProps) {
  const [CantNodos, setCantNodos] = useState<number>(60);
  const [ProbConex, setProbConex] = useState<number>(0.02);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "20px",
          padding: "3rem",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "800",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "0.5rem",
            textAlign: "center",
          }}
        >
          Configuración
        </h1>
        <p
          style={{
            color: "#666",
            fontSize: "1rem",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Parámetros del grafo aleatorio
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <EntradaNumerica
            etiqueta="Número de nodos"
            onChange={(value) => setCantNodos(value)}
            name="numNodos"
            minimo={60}
            maximo={120}
            defaultValor={60}
          />
          <EntradaNumerica
            etiqueta="Probabilidad de conexión:"
            onChange={(value) => setProbConex(value)}
            name="probabilidad"
            minimo={0}
            maximo={1}
            defaultValor={0.02}
          />
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "1rem",
            }}
          >
            <Boton
              texto="Generar Grafo"
              onClick={() => GenerarGrafoA(CantNodos, ProbConex)}
            />
            <Boton texto="Volver" onClick={() => cambiarPagina("menu")} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerarGrafoAleatorio;
