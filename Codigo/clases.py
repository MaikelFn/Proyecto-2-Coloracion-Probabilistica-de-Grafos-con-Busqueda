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

class Arista:
    def __init__(self, nodo1, nodo2):
        self.nodo1 = nodo1
        self.nodo2 = nodo2
        self.conflicto = False
  
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
        for arista in self.aristas:
            if nodo == arista.nodo1 or nodo == arista.nodo2:
                self.aristas.remove(arista)

    def agregar_arista(self, nodo1, nodo2):
        if nodo1 in self.nodos and nodo2 in self.nodos:
            arista = Arista(nodo1, nodo2)
            if arista not in self.aristas and Arista(nodo2, nodo1) not in self.aristas:
                nodo1.añadir_vecino(nodo2)
                nodo2.añadir_vecino(nodo1)
                self.aristas.append(arista)
                
    def eliminar_arista(self, nodo1, nodo2):
        arista = Arista(nodo1, nodo2)
        if arista in self.aristas:
            nodo1.eliminar_vecino(nodo2)
            nodo2.eliminar_vecino(nodo1)
            self.aristas.remove(arista)
            
    def obtener_conexiones(self):
        conexiones = []
        for arista in self.aristas:
            conexiones.append(((arista.nodo1.ID, arista.nodo2.ID), arista.conflicto))
        return conexiones
    def obtener_nodos(self):
        ids = []
        for nodo in self.nodos:
            ids.append((nodo.ID, nodo.color))
        return ids
    
    def colorar_aleatoriamente(self):
        for nodo in self.nodos:
            nodo.colorear(random.choice(self.colores))
        self.validar_aristas()
        
    def validar_aristas(self):
        for arista in self.aristas:
            if arista.nodo1.color == arista.nodo2.color and arista.nodo1.color is not None:
                arista.conflicto = True
            else:
                arista.conflicto = False
                
    def total_conflictos(self):
        cont=0
        for arista in self.aristas:
            if arista.conflicto:
                cont+=1
        return cont
    
    def validar_coloreo(self):
        if self.total_conflictos()>0:
            return False
        return True
    
    def obtener_colores(self):
        mapa_colores = {}
        for nodo in self.nodos:
            mapa_colores[nodo.ID] = nodo.color
        return mapa_colores
    
    def recolorear_nodos(self, diccionario_colores):
        for nodo in self.nodos:
            if nodo.ID in diccionario_colores:
                nodo.colorear(diccionario_colores[nodo.ID])
        self.validar_aristas()  

    def mostrar_grafo(self):
        for nodo in self.nodos:
            print(f"Nodo {nodo.ID}: Color={nodo.color}, Vecinos={[vecino.ID for vecino in nodo.vecinos]} Conflictos={nodo.contar_conflictos()}")
        print(f"Estadisticas del grafo: Total Nodos={len(self.nodos)}, Total Aristas={len(self.aristas)}, Colores Disponibles={self.colores}, Conflictos Totales={self.total_conflictos()}")
        print(f"Porcentaje de Conflictos: {self.total_conflictos()/len(self.aristas)*100:.4f}%")