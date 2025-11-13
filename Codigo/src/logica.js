import { Nodo, Grafo, Arista } from "./Clases.js";

function GrafoAleatorio(numNodos, probabilidadArista) {
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

function MonteCarloColoracion(grafo, iteraciones) {
  let exitos = 0;
  let Historial = [];
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
  return Historial;
}

function PruebaGrafoAleatorio() {
  const grafo = GrafoAleatorio(10, 0.3);
  console.log("Nodos del grafo:", grafo.obtener_nodos());
  console.log("Conexiones del grafo:", grafo.obtener_conexiones());
  grafo.colorear_grafo();
  for (const arista of grafo.aristas) {
    console.log(
      `Arista entre nodo ${arista.nodo1.id} color ${arista.nodo1.color} y nodo ${arista.nodo2.id} color ${arista.nodo2.color} - Conflicto: ${arista.conflicto}`
    );
  }
}
//PruebaGrafoAleatorio();
function PruebaMonteCarlo() {
  const grafo = GrafoAleatorio(10, 0.3);
  const historial = MonteCarloColoracion(grafo, 100);
  //Intentar recuperar un estado del historial
  for (const nodo of grafo.nodos) {
    console.log(`Nodo ${nodo.id} color ${nodo.color}`);
  }
  console.log(historial[0]);
  grafo.recolorear_nodos(historial[0].mapa_colores);
  for (const nodo of grafo.nodos) {
    console.log(`Nodo ${nodo.id} color ${nodo.color}`);
  }
}
PruebaMonteCarlo();
