import random

class Nodo:
    def __init__(self, ID):
        self.ID = ID
        self.color = None
        self.vecinos = []
        self.numvecinos = 0
    
    def colorear(self, nuevo_color):
        self.color = nuevo_color
    
    def añadir_vecino(self, vecino):
        if vecino not in self.vecinos:
            self.vecinos.append(vecino)
            self.numvecinos = len(self.vecinos)
    
    def eliminar_vecino(self, vecino):
        if vecino in self.vecinos:
            self.vecinos.remove(vecino)
            self.numvecinos = len(self.vecinos)

    def contar_conflictos(self):
        contador=0
        for vecino in self.vecinos:
            if vecino.color == self.color:
                contador+=1
        return contador

    def obtener_colores_validos(self, colores):
        for vecino in self.vecinos:
            if vecino.color in colores:
                colores.remove(vecino.color)
        return colores
class Grafo:
    def __init__(self):
        self.nodos = []
        self.aristas = []
        self.colores = ["Azul", "Amarillo", "Morado"]
        

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