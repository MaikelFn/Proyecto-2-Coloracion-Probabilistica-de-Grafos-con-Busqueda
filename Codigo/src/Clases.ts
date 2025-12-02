/**
 * Clase Nodo
 *
 * Representa un vértice del grafo con:
 * - id: identificador numérico
 * - color: nombre del color asignado o null si no tiene color
 * - vecinos: lista de referencias a nodos adyacentes
 * - numvecinos: contador redundante del número de vecinos (mantenido manualmente)
 */
export class Nodo {
  id: number;
  color: string | null;
  vecinos: Nodo[];
  numvecinos: number;
  constructor(id: number) {
    this.id = id;
    this.color = null;
    this.vecinos = [];
    this.numvecinos = 0;
  }

    /**
   * Asigna un color al nodo.
   */
  colorear(nuevo_color: string) {
    this.color = nuevo_color;
  }

    /**
   * Registra una conexión con otro nodo.
   *
   * Evita duplicados.
   */
  añadir_vecino(vecino: Nodo) {
    if (!this.vecinos.includes(vecino)) {
      this.vecinos.push(vecino);
      this.numvecinos++;
    }
  }

    /**
   * Elimina una relación de vecindad entre nodos.
   */
  eliminar_vecino(vecino: Nodo) {
    const indice = this.vecinos.indexOf(vecino);
    if (indice !== -1) {
      this.vecinos.splice(indice, 1);
      this.numvecinos--;
    }
  }

    /**
   * Cuenta cuántos vecinos tienen el mismo color que el nodo.
   */
  contar_conflictos() {
    let contador = 0;
    for (const vecino of this.vecinos) {
      if (vecino.color === this.color) contador++;
    }
    return contador;
  }
}

/**
 * Clase Arista
 *
 * Representa una arista no dirigida entre dos nodos.
 * - nodo1, nodo2: referencias a instancias de Nodo.
 * - conflicto: bandera booleana que indica si ambos extremos comparten color.
 */
export class Arista {
  nodo1: Nodo;
  nodo2: Nodo;
  conflicto: boolean;
  constructor(nodo1: Nodo, nodo2: Nodo) {
    this.nodo1 = nodo1;
    this.nodo2 = nodo2;
    this.conflicto = false;
  }
}

/**
 * Clase Grafo
 *
 * Estructura que contiene nodos y aristas y ofrece utilidades para:
 * - añadir/eliminar nodos y aristas
 * - coloreo aleatorio del grafo
 * - validación de aristas/conflictos
 * - obtención de estadísticas y listados
 *
 * Observaciones:
 * - `colores` define la paleta disponible (por defecto 3 colores).
 * - Varias operaciones mutan el grafo (colorear, recolorear, añadir/aristas, etc.).
 */
export class Grafo {
  nodos: Nodo[];
  aristas: Arista[];
  colores: string[];
  constructor() {
    this.nodos = [];
    this.aristas = [];
    this.colores = ["Azul", "Amarillo", "Morado"];
  }

    /**
   * Agrega un nodo al grafo.
   */
  añadir_nodo(nodo: Nodo) {
    this.nodos.push(nodo);
  }

    /**
   * Conecta dos nodos mediante una arista.
   *
   * Actualiza vecindades.
   */
  añadir_arista(nodo1: Nodo, nodo2: Nodo) {
    const arista = new Arista(nodo1, nodo2);
    this.aristas.push(arista);
    nodo1.añadir_vecino(nodo2);
    nodo2.añadir_vecino(nodo1);
  }

    /**
   * Elimina una arista del grafo y limpia referencias internas.
   */
  eliminar_arista(arista: Arista) {
    const indice = this.aristas.indexOf(arista);
    if (indice !== -1) {
      this.aristas.splice(indice, 1);
      arista.nodo1.eliminar_vecino(arista.nodo2);
      arista.nodo2.eliminar_vecino(arista.nodo1);
    }
  }

    /**
   * Retorna las conexiones del grafo con indicador de conflicto.
   */
  obtener_conexiones() {
    this.validar_aristas();
    const conexiones = [];
    for (const arista of this.aristas) {
      conexiones.push([arista.nodo1.id, arista.nodo2.id, arista.conflicto]);
    }
    return conexiones;
  }

    /**
   * Retorna los nodos con su estado de color.
   */
  obtener_nodos() {
    const ids = [];
    for (const nodo of this.nodos) {
      ids.push([nodo.id, nodo.color]);
    }
    return ids;
  }

    /**
   * Asigna colores aleatorios a todos los nodos.
   */
  colorear_grafo() {
    for (const nodo of this.nodos) {
      const indice_Aleatorio = Math.floor(Math.random() * this.colores.length);
      const color_aleatorio = this.colores[indice_Aleatorio];
      nodo.colorear(color_aleatorio);
    }
    this.validar_aristas();
  }

    /**
   * Marca conflictos en cada arista según los colores.
   */
  validar_aristas() {
    for (const arista of this.aristas) {
      if (arista.nodo1.color === arista.nodo2.color) {
        arista.conflicto = true;
      } else {
        arista.conflicto = false;
      }
    }
  }

    /**
   * Retorna la cantidad total de aristas en conflicto.
   */
  total_conflictos() {
    let total = 0;
    for (const arista of this.aristas) {
      if (arista.conflicto) total++;
    }
    return total;
  }

    /**
   * Determina si el grafo es una coloración válida.
   */
  validar_coloracion() {
    if (this.total_conflictos() === 0) {
      return true;
    } else {
      return false;
    }
  }

    /**
   * Aplica un mapa externo de colores a los nodos existentes.
   */
  recolorear_nodos(diccionario_colores: { [key: number]: string | null }) {
    for (const nodo of this.nodos) {
      if (nodo.id in diccionario_colores) {
        const color = diccionario_colores[nodo.id];
        if (color !== null) {
          nodo.colorear(color);
        }
      }
    }
    this.validar_aristas();
  }

    /**
   * Devuelve el mapa actual de colores del grafo.
   */
  obtener_colores() {
    const diccionario_colores: { [key: number]: string | null } = {};
    for (const nodo of this.nodos) {
      diccionario_colores[nodo.id] = nodo.color;
    }
    return diccionario_colores;
  }

    /**
   * Calcula métricas globales del grafo.
   *
   * Incluye:
   * - Conflictos.
   * - Densidad.
   * - Número de colores.
   * - Distribución de colores.
   */
  obtener_estadisticas() {
    const total_nodos = this.nodos.length;
    const total_aristas = this.aristas.length;
    const total_conflictos = this.total_conflictos();
    const es_valido = this.validar_coloracion();
    const porcentaje_conflictos =
      total_aristas > 0
        ? ((total_conflictos / total_aristas) * 100).toFixed(2)
        : "0.00";

    // Contar nodos por color
    const nodos_por_color: { [color: string]: number } = {};
    for (const nodo of this.nodos) {
      if (nodo.color) {
        nodos_por_color[nodo.color] = (nodos_por_color[nodo.color] || 0) + 1;
      }
    }

    // Contar nodos con conflictos
    let nodos_con_conflictos = 0;
    for (const nodo of this.nodos) {
      if (nodo.contar_conflictos() > 0) {
        nodos_con_conflictos++;
      }
    }

    // Densidad del grafo
    const max_aristas = (total_nodos * (total_nodos - 1)) / 2;
    const densidad =
      max_aristas > 0
        ? ((total_aristas / max_aristas) * 100).toFixed(2)
        : "0.00";

    return {
      total_nodos,
      total_aristas,
      total_conflictos,
      es_valido,
      porcentaje_conflictos: parseFloat(porcentaje_conflictos),
      k_colores: this.colores.length,
      colores_disponibles: this.colores,
      nodos_por_color,
      nodos_con_conflictos,
      densidad_grafo: parseFloat(densidad),
      aristas_validas: total_aristas - total_conflictos,
    };
  }

    /**
   * Lista los nodos que presentan conflictos.
   */
  obtener_nodos_conflictivos() {
    const nodos_conflictivos = [];
    for (const nodo of this.nodos) {
      const num_conflictos = nodo.contar_conflictos();
      if (num_conflictos > 0) {
        nodos_conflictivos.push({
          id: nodo.id,
          color: nodo.color,
          conflictos: num_conflictos,
        });
      }
    }
    return nodos_conflictivos;
  }
}
