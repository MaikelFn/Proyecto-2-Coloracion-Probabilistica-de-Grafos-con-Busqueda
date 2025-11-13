export class Nodo {
    color = null;
    vecinos = [];
    numvecinos = 0;

    colorear(nuevo_color) {
        this.color = nuevo_color;
    }

    añadir_vecino(vecino) {
        if (!this.vecinos.includes(vecino)) {
            this.vecinos.push(vecino);
            this.numvecinos = this.vecinos.length;
        }
    }

    eliminar_vecino(vecino) {
        const idx = this.vecinos.indexOf(vecino);
        if (idx !== -1) {
            this.vecinos.splice(idx, 1);
            this.numvecinos = this.vecinos.length;
        }
    }

    contar_conflictos() {
        let contador = 0;
        for (const vecino of this.vecinos) {
            if (vecino.color === this.color) contador++;
        }
        return contador;
    }

    obtener_colores_validos(colores) {
        for (const vecino of this.vecinos) {
            const c = vecino.color;
            const idx = colores.indexOf(c);
            if (c != null && idx !== -1) colores.splice(idx, 1);
        }
        return colores;
    }
    constructor(valor) {
        this.valor = valor;
        this.siguiente = null;
    }
}
export class Arista {
    constructor(nodo1, nodo2) {
        this.origen = nodo1;
        this.destino = nodo2;
        this.confliocto = false;
    }
}
export class Grafo {
    constructor() {}}