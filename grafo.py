import random
class Grafo:
    def __init__(self):
        self.nodos = []
        self.aristas = []
        self.colores = []
        
    def agregar_color(self, color):
        if color not in self.colores:
            self.colores.append(color)

    def agregar_nodo(self, nodo):
        if nodo not in self.nodos:
            self.nodos.append(nodo)

    def eliminar_nodo(self, nodo):
        if nodo in self.nodos:
            self.nodos.remove(nodo)
            for vecino in nodo.vecinos:
                vecino.eliminar_vecino(nodo)
        for arista in self.aristas[:]:
            if nodo in arista:
                self.aristas.remove(arista)

    def agregar_arista(self, nodo1, nodo2):
        if nodo1 in self.nodos and nodo2 in self.nodos:
            arista = (nodo1, nodo2)
            if arista not in self.aristas and (nodo2, nodo1) not in self.aristas:
                nodo1.añadir_vecino(nodo2)
                nodo2.añadir_vecino(nodo1)
                self.aristas.append(arista)

    def eliminar_arista(self, nodo1, nodo2):
        arista = (nodo1, nodo2)
        if arista in self.aristas:
            nodo1.eliminar_vecino(nodo2)
            nodo2.eliminar_vecino(nodo1)
            self.aristas.remove(arista)

    def colorar_aleatoriamente(self):
        for nodo in self.nodos:
            nodo.colorear(random.choice(self.colores))
    
    def total_conflictos(self):
        total = 0
        for nodo in self.nodos:
            total += nodo.contar_conflictos()
        return total//2
    
    def validar_coloreo(self):
        for nodo in self.nodos:
            if nodo.contar_conflictos() > 0:
                return False
        return True
    def mostrar_grafo(self):
        for nodo in self.nodos:
            print(f"Nodo {nodo.ID}: Color={nodo.color}, Vecinos={[vecino.ID for vecino in nodo.vecinos]} Conflictos={nodo.contar_conflictos()}")
        print(f"Estadisticas del grafo: Total Nodos={len(self.nodos)}, Total Aristas={len(self.aristas)}, Colores Disponibles={self.colores}, Conflictos Totales={self.total_conflictos()}")
        print(f"Porcentaje de Conflictos: {self.total_conflictos()/len(self.aristas)*100:.2f}%")