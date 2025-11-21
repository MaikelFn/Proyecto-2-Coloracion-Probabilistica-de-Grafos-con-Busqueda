import { Nodo, Grafo } from "./Clases";

export function GrafoAleatorio(numNodos: number, probabilidadArista: number) {
  const grafo = new Grafo();
  for (let i = 0; i < numNodos; i++) {
    const nodo = new Nodo(i);
    grafo.añadir_nodo(nodo);
  }
  for (let i = 0; i < numNodos; i++) {
    let CantidadVecinos = Math.floor(probabilidadArista * numNodos);
    if (CantidadVecinos < 1) {
      CantidadVecinos = 1;
    }
    for (let k = 0; k < CantidadVecinos; k++) {
      const nodo1 = grafo.nodos[i];
      let indice_Aleatorio = Math.floor(Math.random() * numNodos);
      const nodo2 = grafo.nodos[indice_Aleatorio];
      if (nodo1 !== nodo2) {
        if (!nodo1.vecinos.includes(nodo2)) {
          grafo.añadir_arista(nodo1, nodo2);
        }
      }
    }
  }
  grafo.colorear_grafo();
  return grafo;
}

export function MonteCarloColoracion(
  grafo: Grafo,
  iteraciones: number
): [
  Array<{
    intento: number;
    conflictos: number;
    mapa_colores: { [key: number]: string | null };
  }>,
  number
] {
  let exitos = 0;
  let Historial = [];
  const TiempoInicio = performance.now();
  for (let i = 0; i < iteraciones; i++) {
    grafo.colorear_grafo();
    const mapa_colores = grafo.obtener_colores();
    const intento_info = {
      intento: i + 1,
      conflictos: grafo.total_conflictos(),
      mapa_colores: mapa_colores,
    };
    if (grafo.total_conflictos() === 0) {
      exitos += 1;
    }
    Historial.push(intento_info);
  }
  const TiempoFin = performance.now();
  const TiempoTotal = TiempoFin - TiempoInicio;

  return [Historial, TiempoTotal, exitos];
}
