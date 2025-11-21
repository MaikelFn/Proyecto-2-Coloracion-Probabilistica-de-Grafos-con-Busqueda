import { useState } from "react";
import Menu from "./Paginas/Menu";
import GenerarGrafoAleatorio from "./Paginas/Generargrafoa";
import GrafoManual from "./Paginas/GrafoManual";
import Previsualizar from "./Paginas/Prev";
import MonteCarlo from "./Paginas/MonteCarlo";
import { GrafoAleatorio, GrafoManual as crearGrafoManual } from "./logica";
import { Grafo } from "./Clases";

type Pagina =
  | "menu"
  | "generarAleatorio"
  | "grafoManual"
  | "previsualizar"
  | "monteCarlo";

function App() {
  const [paginaActual, setPaginaActual] = useState<Pagina>("menu");
  const [grafoActual, setGrafoActual] = useState<Grafo | null>(null);

  const cambiarPagina = (pagina: Pagina) => {
    setPaginaActual(pagina);
  };

  const GenerarGrafoA = (numNodos: number, probabilidadArista: number) => {
    const grafo = GrafoAleatorio(numNodos, probabilidadArista);
    setGrafoActual(grafo);
    cambiarPagina("previsualizar");
  };

  const GenerarGrafoM = (nodos: number[], aristas: [number, number][]) => {
    const grafo = crearGrafoManual(nodos, aristas);
    setGrafoActual(grafo);
    cambiarPagina("previsualizar");
  };

  if (paginaActual === "previsualizar" && grafoActual) {
    return (
      <Previsualizar
        nodos={grafoActual.obtener_nodos() as Array<[number, string | null]>}
        aristas={grafoActual.aristas.map((a) => [
          a.nodo1.id,
          a.nodo2.id,
          a.conflicto,
        ])}
        cambiarPagina={cambiarPagina}
      />
    );
  }

  if (paginaActual === "menu") {
    return <Menu cambiarPagina={cambiarPagina} />;
  }

  if (paginaActual === "generarAleatorio") {
    return (
      <GenerarGrafoAleatorio
        GenerarGrafoA={GenerarGrafoA}
        cambiarPagina={cambiarPagina}
      />
    );
  }

  if (paginaActual === "grafoManual") {
    return (
      <GrafoManual
        GenerarGrafoM={GenerarGrafoM}
        cambiarPagina={cambiarPagina}
      />
    );
  }

  if (paginaActual === "monteCarlo" && grafoActual) {
    return <MonteCarlo grafo={grafoActual} cambiarPagina={cambiarPagina} />;
  }

  return null;
}

export default App;
