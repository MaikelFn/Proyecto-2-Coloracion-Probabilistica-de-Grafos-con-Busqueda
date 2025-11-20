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
  const [CantNodos, setCantNodos] = useState<number>(5);
  const [ProbConex, setProbConex] = useState<number>(0.02);

  return (
    <div>
      <EntradaNumerica
        etiqueta="Número de nodos"
        onChange={(value) => setCantNodos(value)}
        name="numNodos"
        minimo={5}
        maximo={120}
        defaultValor={5}
      />
      <EntradaNumerica
        etiqueta="Probabilidad de conexión:"
        onChange={(value) => setProbConex(value)}
        name="probabilidad"
        minimo={0}
        maximo={1}
        defaultValor={0.02}
      />
      <Boton
        texto="Generar Grafo"
        onClick={() => GenerarGrafoA(CantNodos, ProbConex)}
      />
      <Boton texto="Volver" onClick={() => cambiarPagina("menu")} />
    </div>
  );
}

export default GenerarGrafoAleatorio;
