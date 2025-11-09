from clases import Grafo, Nodo
import random

def generar_grafo_aleatorio(cantidad_nodos):
    grafo = Grafo()
    for id in range(cantidad_nodos):
        nuevo_nodo = Nodo(id)
        grafo.agregar_nodo(nuevo_nodo)
    
    for nodo in grafo.nodos:
        num_vecinos = random.randint(1, cantidad_nodos-1)
        for i in range(num_vecinos):
            vecino = random.choice(grafo.nodos)
            if vecino != nodo and vecino not in nodo.vecinos:
                nodo.añadir_vecino(vecino)
                vecino.añadir_vecino(nodo)
                arista = (nodo, vecino)
                grafo.aristas.append(arista)
    grafo.colorar_aleatoriamente()
    grafo.mostrar_grafo()
    return grafo