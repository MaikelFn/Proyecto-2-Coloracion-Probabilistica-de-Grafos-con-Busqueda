import Grafo from "../Componentes/Grafo";
import Boton from "../Componentes/Boton";

type PrevisualizarProps = {
  nodos: Array<[number, string | null]>;
  aristas: Array<[number, number, boolean]>;
  cambiarPagina: (
    pagina:
      | "menu"
      | "generarAleatorio"
      | "previsualizar"
      | "monteCarlo"
      | "lasVegas"
  ) => void;
};

/**
 * Componente `Previsualizar`.
 *
 * Pantalla de inspección previa del grafo generado.
 *
 * Funciones:
 * - Renderizar el grafo usando el componente `Grafo`.
 * - Brindar acceso a selección de algoritmos.
 * - Permitir volver al menú principal.
 *
 * No ejecuta algoritmos,
 * solo visualiza la estructura actual del grafo.
 */
function Previsualizar({ nodos, aristas, cambiarPagina }: PrevisualizarProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "800",
          color: "white",
          marginBottom: "2rem",
          textShadow: "0 2px 10px rgba(0,0,0,0.2)",
        }}
      >
        Previsualización del Grafo
      </h1>
      <div
        style={{
          display: "flex",
          gap: "20px",
          width: "100%",
          maxWidth: "1400px",
          justifyContent: "center",
        }}
      >
        <div style={{ flex: 1 }}>
          <Grafo nodos={nodos} aristas={aristas} />
        </div>
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "20px",
            padding: "2rem",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            minWidth: "250px",
            height: "fit-content",
            marginTop: "4rem",
          }}
        >
          <h3
            style={{
              fontSize: "1.3rem",
              fontWeight: "700",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            Algoritmos
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <Boton
              texto="Monte Carlo"
              onClick={() => cambiarPagina("monteCarlo")}
            />
            <Boton
              texto="Las Vegas"
              onClick={() => cambiarPagina("lasVegas")}
            />
            <div
              style={{
                borderTop: "2px solid #e0e0e0",
                margin: "10px 0",
              }}
            />
            <Boton texto="Menú" onClick={() => cambiarPagina("menu")} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Previsualizar;
