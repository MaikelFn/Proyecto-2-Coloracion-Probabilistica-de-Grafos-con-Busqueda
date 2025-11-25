import { useState } from "react";
import Boton from "../Componentes/Boton";
import EntradaNumerica from "../Componentes/EntradaNumerica";
import { Grafo as GrafoClass } from "../Clases";

type MonteCarloProps = {
  grafo: GrafoClass;
  cambiarPagina: (
    pagina: "menu" | "generarAleatorio" | "previsualizar"
  ) => void;
};

function MonteCarlo({ cambiarPagina }: MonteCarloProps) {
  const [intentos, setIntentos] = useState<number>(1000);

  const ejecutarMonteCarlo = () => {
    // Aquí se ejecutará el algoritmo Monte Carlo
    console.log("Ejecutando Monte Carlo con", intentos, "intentos");
  };

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
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "0.5rem",
            textAlign: "center",
          }}
        >
          Algoritmo Monte Carlo
        </h1>
        <p
          style={{
            color: "#666",
            fontSize: "1rem",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Configura y ejecuta el algoritmo probabilístico
        </p>

        <div style={{ marginBottom: "2rem" }}>
          <EntradaNumerica
            defaultValor={intentos}
            onChange={setIntentos}
            minimo={1}
            etiqueta="Cantidad de Intentos"
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          <Boton texto="Ejecutar" onClick={ejecutarMonteCarlo} />
          <Boton
            texto="Volver"
            onClick={() => cambiarPagina("previsualizar")}
          />
        </div>
      </div>
    </div>
  );
}

export default MonteCarlo;
