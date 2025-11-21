import Grafo from "../Componentes/Grafo";
import Boton from "../Componentes/Boton";

type PrevisualizarProps = {
  nodos: Array<[number, string | null]>;
  aristas: Array<[number, number, boolean]>;
  cambiarPagina: (
    pagina: "menu" | "generarAleatorio" | "previsualizar" | "monteCarlo"
  ) => void;
};
function Previsualizar({ nodos, aristas, cambiarPagina }: PrevisualizarProps) {
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
          <Boton
            texto="Ejecutar Monte Carlo"
            onClick={() => cambiarPagina("monteCarlo")}
          />
          <Boton texto="Ejecutar La Vegas" onClick={() => {}} />
          <Boton texto="Volver al menú" onClick={() => cambiarPagina("menu")} />
        </div>
      </div>
    </div>
  );
}

export default Previsualizar;
