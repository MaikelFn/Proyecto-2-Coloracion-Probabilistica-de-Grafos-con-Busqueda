import { useState } from "react";
import Menu from "./Paginas/Menu";
import GenerarGrafoAleatorio from "./Paginas/Generargrafoa";
import Previsualizar from "./Paginas/Previsualizar";

type Pagina = "menu" | "generarAleatorio" | "previsualizar";

function App() {
  const [paginaActual, setPaginaActual] = useState<Pagina>("menu");

  const cambiarPagina = (pagina: Pagina) => {
    setPaginaActual(pagina);
  };

  if (paginaActual === "menu") {
    return <Menu cambiarPagina={cambiarPagina} />;
  }

  if (paginaActual === "generarAleatorio") {
    return <GenerarGrafoAleatorio cambiarPagina={cambiarPagina} />;
  }

  if (paginaActual === "previsualizar") {
    return (
      <Previsualizar
        nodos={[
          [0, "Azul"],
          [1, "Amarillo"],
          [2, "Amarillo"],
        ]}
        aristas={[
          [0, 1, false],
          [1, 2, true],
        ]}
      />
    );
  }

  return null;
}

export default App;
