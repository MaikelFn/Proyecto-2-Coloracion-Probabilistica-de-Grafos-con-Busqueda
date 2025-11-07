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