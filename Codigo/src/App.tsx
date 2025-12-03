import { useState } from "react";
import Menu from "./Paginas/Menu";
import GenerarGrafoAleatorio from "./Paginas/Generargrafoa";
import GrafoManual from "./Paginas/GrafoManual";
import Previsualizar from "./Paginas/Prev";
import MonteCarlo from "./Paginas/MonteCarlo";
import LasVegas from "./Paginas/LasVegas";
import { GrafoAleatorio, GrafoManual as crearGrafoManual } from "./logica";
import { Grafo } from "./Clases";

type Pagina =
  | "menu"
  | "generarAleatorio"
  | "grafoManual"
  | "previsualizar"
  | "monteCarlo"
  | "lasVegas";

  /**
 * Componente `App`.
 *
 * Controlador principal de la aplicación.
 *
 * Responsabilidades:
 * - Gestionar el estado de navegación entre pantallas.
 * - Mantener el grafo activo durante la ejecución.
 * - Redirigir al usuario según el flujo de uso.
 * - Coordinar la creación del grafo (manual o aleatorio).
 *
 * Funciona como router básico sin librerías externas.
 */
function App() {
  const [paginaActual, setPaginaActual] = useState<Pagina>("menu");
  const [grafoActual, setGrafoActual] = useState<Grafo | null>(null);

    /**
   * Cambia la pantalla activa del sistema.
   *
   * Parámetros:
   * - pagina: identificador de la vista destino.
   *
   * Efecto:
   * - Actualiza el estado `paginaActual` y dispara el nuevo render.
   */
  const cambiarPagina = (pagina: Pagina) => {
    setPaginaActual(pagina);
  };

    /**
   * Genera un grafo aleatorio y lo establece como grafo principal.
   *
   * Flujo:
   * - Llama a `GrafoAleatorio`.
   * - Guarda el resultado en `grafoActual`.
   * - Redirige automáticamente a previsualización.
   */
  const GenerarGrafoA = (numNodos: number, probabilidadArista: number) => {
    const grafo = GrafoAleatorio(numNodos, probabilidadArista);
    setGrafoActual(grafo);
    cambiarPagina("previsualizar");
  };

    /**
   * Construye un grafo manual y lo establece como grafo principal.
   *
   * Flujo:
   * - Llama a `crearGrafoManual`.
   * - Guarda el resultado.
   * - Redirige a previsualización.
   */
  const GenerarGrafoM = (nodos: number[], aristas: [number, number][]) => {
    const grafo = crearGrafoManual(nodos, aristas);
    setGrafoActual(grafo);
    cambiarPagina("previsualizar");
  };

  if (paginaActual === "previsualizar" && grafoActual) {
    return (
      <Previsualizar
        nodos={grafoActual.obtener_nodos() as Array<[number, string | null]>}
        aristas={
          grafoActual.obtener_conexiones() as Array<[number, number, boolean]>
        }
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

  if (paginaActual === "monteCarlo" && grafoActual) {
    return <MonteCarlo grafo={grafoActual} cambiarPagina={cambiarPagina} />;
  }

  if (paginaActual === "lasVegas" && grafoActual) {
    return <LasVegas grafo={grafoActual} cambiarPagina={cambiarPagina} />;
  }

  return null;
}

export default App;
