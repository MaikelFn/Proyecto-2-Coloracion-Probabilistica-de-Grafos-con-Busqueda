from clases import Grafo, Nodo
import random

def generar_grafo_aleatorio(cantidad_nodos):
    grafo = Grafo()
    for id in range(cantidad_nodos):
        nuevo_nodo = Nodo(id)
        grafo.agregar_nodo(nuevo_nodo)
    
    for nodo in grafo.nodos:
        num_vecinos = random.randint(1, int((cantidad_nodos-1)*0.25))
        for i in range(num_vecinos):
            vecino = random.choice(grafo.nodos)
            if vecino != nodo and vecino not in nodo.vecinos:
                grafo.agregar_arista(nodo, vecino)
    return grafo
def Montecarlo(grafo, iteraciones):
    exitos = 0
    historial = []
    for i in range (iteraciones):
        grafo.colorar_aleatoriamente()
        map_colores = grafo.obtener_colores()
        intento_info = {"intento": i+1, 
                   "colores": map_colores, 
                   "conflictos": grafo.total_conflictos()}
        if grafo.validar_coloreo():
            exitos += 1
        historial.append(intento_info)
    return historial, exitos


def obtener_estadisticas(grafo, intento):
    colores=intento["colores"]
    grafo.recolorear_nodos(colores)
    conflictos=grafo.total_conflictos()
    return conflictos
        

def crear_grafo_manual():
    grafo = Grafo()
    return grafo

Grafo=generar_grafo_aleatorio(40)
print(f"grafo original")
Grafo.mostrar_grafo()
Historial, intentos = Montecarlo(Grafo, 100)
print(Historial[-1])
Grafo.mostrar_grafo()
