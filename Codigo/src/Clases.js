export class Nodo {
  constructor(id) {
    this.id = id;
    this.color = null;
    this.vecinos = [];
    this.numvecinos = 0;
  }

  colorear(nuevo_color) {
    this.color = nuevo_color;
  }

  añadir_vecino(vecino) {
    if (!this.vecinos.includes(vecino)) {
      this.vecinos.push(vecino);
      this.numvecinos++;
    }
  }

  eliminar_vecino(vecino) {
    const indice = this.vecinos.indexOf(vecino);
    if (indice !== -1) {
      this.vecinos.splice(indice, 1);
      this.numvecinos--;
    }
  }

  contar_conflictos() {
    let contador = 0;
    for (const vecino of this.vecinos) {
      if (vecino.color === this.color) contador++;
    }
    return contador;
  }
}
export class Arista {
  constructor(nodo1, nodo2) {
    this.nodo1 = nodo1;
    this.nodo2 = nodo2;
    this.conflicto = false;
  }
}
export class Grafo {
  constructor() {
    this.nodos = [];
    this.aristas = [];
    this.colores = ["Azul", "Amarillo", "Morado"];
  }
  añadir_nodo(nodo) {
    this.nodos.push(nodo);
  }
  añadir_arista(nodo1, nodo2) {
    const arista = new Arista(nodo1, nodo2);
    this.aristas.push(arista);
    nodo1.añadir_vecino(nodo2);
    nodo2.añadir_vecino(nodo1);
  }
  eliminar_arista(arista) {
    const indice = this.aristas.indexOf(arista);
    if (indice !== -1) {
      this.aristas.splice(indice, 1);
      arista.nodo1.eliminar_vecino(arista.nodo2);
      arista.nodo2.eliminar_vecino(arista.nodo1);
    }
  }
  obtener_conexiones() {
    const conexiones = [];
    for (const arista of this.aristas) {
      conexiones.push([arista.nodo1.id, arista.nodo2.id]);
    }
    return conexiones;
  }
  obtener_nodos() {
    const ids = [];
    for (const nodo of this.nodos) {
      ids.push([nodo.id, nodo.color]);
    }
    return ids;
  }
  colorear_grafo() {
    for (const nodo of this.nodos) {
      const indice_Aleatorio = Math.floor(Math.random() * this.colores.length);
      const color_aleatorio = this.colores[indice_Aleatorio];
      nodo.colorear(color_aleatorio);
    }
    this.validar_aristas();
  }
  validar_aristas() {
    for (const arista of this.aristas) {
      if (arista.nodo1.color === arista.nodo2.color) {
        arista.conflicto = true;
      } else {
        arista.conflicto = false;
      }
    }
  }
  total_conflictos() {
    let total = 0;
    for (const arista of this.aristas) {
      if (arista.conflicto) total++;
    }
    return total;
  }
  validar_coloracion() {
    if (this.total_conflictos() === 0) {
      return true;
    } else {
      return false;
    }
  }
  recolorear_nodos(diccionario_colores) {
    for (const nodo of this.nodos) {
      if (nodo.id in diccionario_colores) {
        nodo.colorear(diccionario_colores[nodo.id]);
      }
    }
    this.validar_aristas();
  }
  obtener_colores() {
    const diccionario_colores = {};
    for (const nodo of this.nodos) {
      diccionario_colores[nodo.id] = nodo.color;
    }
    return diccionario_colores;
  }
}
