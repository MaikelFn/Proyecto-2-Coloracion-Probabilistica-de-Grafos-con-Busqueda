import { Nodo, Grafo } from "./Clases";

/**
 * Verifica si un grafo es conexo usando búsqueda en profundidad (DFS).
 *
 * Parámetros:
 * - grafo: instancia de `Grafo` a verificar.
 *
 * Retorna:
 * - true si todos los nodos son alcanzables desde el nodo 0.
 * - false si existe al menos un nodo aislado o componente desconectada.
 */
function esGrafoConexo(grafo: Grafo): boolean {
  if (grafo.nodos.length === 0) return true;

  const visitados = new Set<number>();
  const pila: Nodo[] = [grafo.nodos[0]];

  while (pila.length > 0) {
    const nodoActual = pila.pop()!;
    if (visitados.has(nodoActual.id)) continue;

    visitados.add(nodoActual.id);

    for (const vecino of nodoActual.vecinos) {
      if (!visitados.has(vecino.id)) {
        pila.push(vecino);
      }
    }
  }

  return visitados.size === grafo.nodos.length;
}

/**
 * Recolorea solo los nodos que tienen conflictos con sus vecinos.
 *
 * Parámetros:
 * - grafo: instancia de `Grafo` sobre la cual se recolorean los nodos conflictivos.
 *
 * Comportamiento:
 * - Identifica nodos con al menos un vecino del mismo color.
 * - Asigna un color aleatorio solo a esos nodos.
 * - Valida las aristas después del recoloreo.
 */
function recolorearNodosConflictivos(grafo: Grafo): void {
  // Identificar nodos con conflictos
  const nodosConflictivos: Nodo[] = [];
  for (const nodo of grafo.nodos) {
    if (nodo.contar_conflictos() > 0) {
      nodosConflictivos.push(nodo);
    }
  }

  // Recolorear solo los nodos conflictivos
  for (const nodo of nodosConflictivos) {
    const indiceAleatorio = Math.floor(Math.random() * grafo.colores.length);
    const colorAleatorio = grafo.colores[indiceAleatorio];
    nodo.colorear(colorAleatorio);
  }

  // Validar aristas después del recoloreo
  grafo.validar_aristas();
}

/**
 * Genera un grafo no dirigido conexo de forma aleatoria.atoria.
 *
 * Comportamiento:
 * - Crea `numNodos` nodos con IDs consecutivos desde 0.
 * - Intenta conectar cada nodo con una cantidad de vecinos estimada a partir de
 *   `probabilidadArista * numNodos`, garantizando al menos 1 vecino por nodo.
 * - Evita aristas duplicadas y self-loops.
 * - Verifica que el grafo sea conexo. Si no lo es, conecta componentes desconectadas
 *   hasta lograr un grafo totalmente conexo.
 *
 * Parámetros:
 * - numNodos: cantidad total de nodos a generar.
 * - probabilidadArista: factor que controla la densidad de conexiones del grafo.
 *
 * Retorna:
 * - Una instancia de `Grafo` conexa (todos los nodos alcanzables desde cualquier otro).
 */
export function GrafoAleatorio(numNodos: number, probabilidadArista: number) {
  const grafo = new Grafo();

  // Crear todos los nodos
  for (let i = 0; i < numNodos; i++) {
    const nodo = new Nodo(i);
    grafo.añadir_nodo(nodo);
  }

  // Conectar nodos aleatoriamente
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

  // Asegurar que no haya nodos aislados
  for (let i = 0; i < numNodos; i++) {
    const nodo = grafo.nodos[i];
    if (nodo.vecinos.length === 0) {
      let indiceAleatorio = Math.floor(Math.random() * numNodos);
      while (indiceAleatorio === i) {
        indiceAleatorio = Math.floor(Math.random() * numNodos);
      }
      grafo.añadir_arista(nodo, grafo.nodos[indiceAleatorio]);
    }
  }

  // Asegurar que el grafo sea conexo
  while (!esGrafoConexo(grafo)) {
    // Encontrar componentes desconectadas
    const visitados = new Set<number>();
    const componentesDesconectadas: number[][] = [];

    for (const nodo of grafo.nodos) {
      if (!visitados.has(nodo.id)) {
        const componente: number[] = [];
        const pila: Nodo[] = [nodo];

        while (pila.length > 0) {
          const nodoActual = pila.pop()!;
          if (visitados.has(nodoActual.id)) continue;

          visitados.add(nodoActual.id);
          componente.push(nodoActual.id);

          for (const vecino of nodoActual.vecinos) {
            if (!visitados.has(vecino.id)) {
              pila.push(vecino);
            }
          }
        }

        componentesDesconectadas.push(componente);
      }
    }

    // Conectar componentes desconectadas
    if (componentesDesconectadas.length > 1) {
      for (let i = 0; i < componentesDesconectadas.length - 1; i++) {
        const nodoComp1 =
          componentesDesconectadas[i][
            Math.floor(Math.random() * componentesDesconectadas[i].length)
          ];
        const nodoComp2 =
          componentesDesconectadas[i + 1][
            Math.floor(Math.random() * componentesDesconectadas[i + 1].length)
          ];

        grafo.añadir_arista(grafo.nodos[nodoComp1], grafo.nodos[nodoComp2]);
      }
    }
  }

  return grafo;
}

/**
 * Construye un grafo no dirigido a partir de listas de nodos y aristas.
 *
 * Comportamiento:
 * - Crea nodos a partir del arreglo `idsNodos`.
 * - Recorre la lista de aristas `[id1, id2]` para conectar los nodos
 *   correspondientes, siempre que ambos existan y no sean el mismo.
 * - Evita duplicar aristas comprobando si ya existe el vecino antes de añadirlo.
 *
 * Parámetros:
 * - idsNodos: arreglo con los identificadores de todos los nodos que formarán el grafo.
 * - aristas: arreglo de pares `[id1, id2]` que representan conexiones no dirigidas.
 *
 * Retorna:
 * - Una instancia de `Grafo` construida según los datos provistos.
 */
export function GrafoManual(
  idsNodos: number[],
  aristas: [number, number][]
): Grafo {
  const grafo = new Grafo();

  for (const id of idsNodos) {
    const nodo = new Nodo(id);
    grafo.añadir_nodo(nodo);
  }

  for (const [id1, id2] of aristas) {
    const nodo1 = grafo.nodos.find((n) => n.id === id1);
    const nodo2 = grafo.nodos.find((n) => n.id === id2);

    if (nodo1 && nodo2 && nodo1 !== nodo2) {
      if (!nodo1.vecinos.includes(nodo2)) {
        grafo.añadir_arista(nodo1, nodo2);
      }
    }
  }

  return grafo;
}

/**
 * Ejecuta un esquema de coloración tipo Monte Carlo sobre un grafo.
 *
 * Comportamiento:
 * - Realiza `iteraciones` independientes.
 * - En cada iteración:
 *   - Aplica una coloración aleatoria al grafo.
 *   - Calcula el número de conflictos (aristas con ambos extremos del mismo color).
 *   - Guarda el intento en el historial junto con el mapa de colores.
 *   - Incrementa el contador de éxitos si no hay conflictos.
 *
 * Parámetros:
 * - grafo: instancia de `Grafo` sobre la cual se realizan las coloraciones.
 * - iteraciones: número de ejecuciones independientes a realizar.
 *
 * Retorna:
 * - historial: arreglo con la información de cada intento (número, conflictos, mapa de colores).
 * - tiempoTotal: tiempo total requerido para todas las iteraciones (en milisegundos).
 * - exitos: cantidad de coloraciones sin conflictos encontradas.
 */
export function MonteCarloColoracion(
  grafo: Grafo,
  iteraciones: number
): [
  Array<{
    intento: number;
    conflictos: number;
    mapa_colores: { [key: number]: string | null };
  }>,
  number,
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

/**
 * Ejecuta el algoritmo de coloración tipo Las Vegas sobre un grafo.
 *
 * Comportamiento:
 * - Recolorea el grafo aleatoriamente en cada intento.
 * - Registra el número de conflictos y el mapa de colores de cada intento.
 * - Se detiene cuando:
 *   - Se encuentra una solución sin conflictos, o
 *   - Se alcanza el número máximo de intentos permitido (`maxIntentos`).
 *
 * Parámetros:
 * - grafo: instancia de `Grafo` sobre la que se aplica la coloración.
 * - maxIntentos: límite superior de intentos permitidos para evitar bucles infinitos.
 *
 * Retorna:
 * - historial: arreglo con la información de cada intento (número, conflictos, mapa de colores).
 * - tiempoTotal: tiempo total de ejecución en milisegundos.
 * - intentos: número de intentos realizados hasta detener el algoritmo.
 */
export function LasVegasColoracion(grafo: Grafo): [
  Array<{
    intento: number;
    conflictos: number;
    mapa_colores: { [key: number]: string | null };
  }>,
  number,
  number
] {
  let intentos = 0;
  const historial: Array<{
    intento: number;
    conflictos: number;
    mapa_colores: { [key: number]: string | null };
  }> = [];
  const TiempoInicio = performance.now();

  // Coloreo inicial completo
  grafo.colorear_grafo();

  while (true) {
    intentos += 1;

    // Solo recolorear nodos conflictivos después del primer intento
    if (intentos > 1) {
      recolorearNodosConflictivos(grafo);
    }

    const conflictos = grafo.total_conflictos();
    const mapa_colores = grafo.obtener_colores();

    historial.push({ intento: intentos, conflictos, mapa_colores });

    if (conflictos === 0 || intentos >= 10000) {
      break;
    }
  }

  const TiempoFin = performance.now();
  const TiempoTotal = TiempoFin - TiempoInicio;

  return [historial, TiempoTotal, intentos];
}
