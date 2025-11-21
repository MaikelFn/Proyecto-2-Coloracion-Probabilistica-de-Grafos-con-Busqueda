import Boton from "../Componentes/Boton";
import { Grafo as GrafoClass } from "../Clases";

type MonteCarloProps = {
  grafo: GrafoClass;
  cambiarPagina: (
    pagina: "menu" | "generarAleatorio" | "previsualizar"
  ) => void;
};

function MonteCarlo({ cambiarPagina }: MonteCarloProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        gap: "20px",
      }}
    >
      <h1>Algoritmo Monte Carlo</h1>
      <Boton texto="Volver" onClick={() => cambiarPagina("previsualizar")} />
    </div>
  );
}

export default MonteCarlo;
