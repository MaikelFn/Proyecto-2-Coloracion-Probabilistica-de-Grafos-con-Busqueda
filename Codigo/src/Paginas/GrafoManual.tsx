import { useState, useMemo } from "react";
import Boton from "../Componentes/Boton";

type GrafoManualProps = {
  GenerarGrafoM: (nodos: number[], aristas: [number, number][]) => void;
  cambiarPagina: (
    pagina: "menu" | "generarAleatorio" | "previsualizar" | "grafoManual"
  ) => void;
};

/**
 * Componente `GrafoManual`.
 *
 * Permite construir manualmente un grafo no dirigido:
 * - Agregar y eliminar nodos.
 * - Agregar y eliminar aristas con validaciones básicas.
 * - Verificar si el grafo cumple las condiciones mínimas (20 nodos, sin nodos aislados y conexo)
 *   antes de habilitar la generación.
 *
 * Props:
 * - GenerarGrafoM: función que recibe la lista de nodos y aristas para continuar el flujo de la app.
 * - cambiarPagina: función de navegación entre pantallas del sistema.
 */

function GrafoManual({ GenerarGrafoM, cambiarPagina }: GrafoManualProps) {
  const [nodos, setNodos] = useState<number[]>([]);
  const [aristas, setAristas] = useState<[number, number][]>([]);
  const [nodo1, setNodo1] = useState<string>("");
  const [nodo2, setNodo2] = useState<string>("");
  const [mensajeValidacion, setMensajeValidacion] = useState<string | null>(
    null
  );

    /**
   * Agrega un nuevo nodo al grafo.
   *
   * Lógica:
   * - Calcula el siguiente ID disponible (máximo actual + 1, o 0 si no hay nodos).
   * - Evita IDs negativos (por seguridad, aunque el cálculo normal no los genera).
   * - Actualiza el estado `nodos` y limpia mensajes de validación.
   */
  const agregarNodo = () => {
    // Buscar el siguiente ID disponible
    const nuevoId = nodos.length === 0 ? 0 : Math.max(...nodos) + 1;
    if (nuevoId < 0) {
      setMensajeValidacion("No se permiten IDs negativos.");
      return;
    }
    setMensajeValidacion(null);
    setNodos([...nodos, nuevoId]);
  };

  /**
 * Elimina un nodo existente y sus aristas asociadas.
 *
 * Parámetros:
 * - id: identificador del nodo a eliminar.
 *
 * Efectos:
 * - Quita el nodo de la lista `nodos`.
 * - Filtra todas las aristas que usen ese nodo.
 * - Limpia cualquier mensaje de validación previo.
 */
  const eliminarNodo = (id: number) => {
    setNodos(nodos.filter((n) => n !== id));
    // Eliminar aristas que incluyan este nodo
    setAristas(aristas.filter(([id1, id2]) => id1 !== id && id2 !== id));
    setMensajeValidacion(null);
  };

  /**
   * Agrega una arista entre dos nodos.
   *
   * Validaciones:
   * - Ambos IDs deben ser números válidos (no NaN).
   * - No se permiten valores negativos.
   * - No se permiten self-loops (mismo nodo en ambos extremos).
   * - Ambos nodos deben existir en `nodos`.
   * - No se permite duplicar aristas (ni en orden directo ni invertido).
   *
   * Si todo es correcto:
   * - Agrega la arista a `aristas`.
   * - Limpia los campos de entrada y el mensaje de validación.
   */
  const agregarArista = () => {
    const id1 = parseInt(nodo1, 10);
    const id2 = parseInt(nodo2, 10);

    // Validaciones: no NaN, no negativos, no self-loop, nodos existentes
    if (isNaN(id1) || isNaN(id2)) {
      setMensajeValidacion("Ingrese IDs válidos para ambos nodos.");
      return;
    }
    if (id1 < 0 || id2 < 0) {
      setMensajeValidacion("No se permiten valores negativos.");
      return;
    }
    if (id1 === id2) {
      setMensajeValidacion("No se permiten self-loops (nodo conectado a sí mismo).");
      return;
    }
    if (!nodos.includes(id1) || !nodos.includes(id2)) {
      setMensajeValidacion("Ambos nodos deben existir antes de crear la arista.");
      return;
    }

    // Verificar que la arista no exista ya
    const aristaExiste = aristas.some(
      ([a, b]) => (a === id1 && b === id2) || (a === id2 && b === id1)
    );
    if (aristaExiste) {
      setMensajeValidacion("La arista ya existe.");
      return;
    }

    // Todo OK: añadir arista
    setAristas([...aristas, [id1, id2]]);
    setNodo1("");
    setNodo2("");
    setMensajeValidacion(null);
  };

  /**
   * Elimina una arista según su posición en la lista.
   *
   * Parámetros:
   * - index: índice de la arista en el arreglo `aristas`.
   *
   * Efectos:
   * - Quita la arista seleccionada.
   * - Limpia el mensaje de validación.
   */
  const eliminarArista = (index: number) => {
    setAristas(aristas.filter((_, i) => i !== index));
    setMensajeValidacion(null);
  };

  /**
   * Calcula los nodos aislados del grafo.
   *
   * Definición:
   * - Nodo aislado: nodo que no aparece en ninguna arista.
   *
   * Implementación:
   * - Construye un conjunto de nodos conectados a partir de `aristas`.
   * - Devuelve los nodos que no están en ese conjunto.
   *
   * Se memoiza para evitar recomputar en cada render.
   */
  const nodosAislados = useMemo(() => {
    const conectados = new Set<number>();
    for (const [a, b] of aristas) {
      conectados.add(a);
      conectados.add(b);
    }
    return nodos.filter((id) => !conectados.has(id));
  }, [nodos, aristas]);

  /**
   * Evalúa la conectividad del grafo mediante BFS.
   *
   * Proceso:
   * - Construye una lista de adyacencia usando `nodos` y `aristas`.
   * - Realiza una búsqueda en anchura (BFS) desde el primer nodo de la lista.
   * - Marca todos los nodos alcanzables y determina los que quedan fuera.
   *
   * Retorna:
   * - esConexo: true si todos los nodos son alcanzables desde el primero.
   * - noConectados: arreglo de nodos que no pertenecen a la componente principal.
   *
   * Se memoiza para recalcular solo cuando cambien `nodos` o `aristas`.
   */
  const componentePrincipalYNoConectados = useMemo(() => {
    if (nodos.length === 0) return { esConexo: false, noConectados: [] as number[] };

    // Construir mapa de adyacencia
    const adj: { [key: number]: number[] } = {};
    for (const id of nodos) adj[id] = [];
    for (const [a, b] of aristas) {
      if (adj[a]) adj[a].push(b);
      if (adj[b]) adj[b].push(a);
    }

    // BFS desde el primer nodo (nodos[0])
    const inicio = nodos[0];
    const visitado = new Set<number>();
    const queue: number[] = [inicio];
    visitado.add(inicio);
    while (queue.length > 0) {
      const u = queue.shift() as number;
      for (const v of adj[u] ?? []) {
        if (!visitado.has(v)) {
          visitado.add(v);
          queue.push(v);
        }
      }
    }

    // Nodos no alcanzados desde la componente principal
    const noConectados = nodos.filter((id) => !visitado.has(id));
    const esConexo = noConectados.length === 0;

    return { esConexo, noConectados };
  }, [nodos, aristas]);

    /**
   * Determina si el grafo cumple las condiciones mínimas para ser generado.
   *
   * Condiciones:
   * - Al menos 20 nodos.
   * - Ningún nodo aislado.
   * - El grafo debe ser conexo (según `componentePrincipalYNoConectados`).
   *
   * Resultado:
   * - true si todas las condiciones se cumplen; false en caso contrario.
   *
   * Se usa para habilitar o deshabilitar el botón "Generar Grafo".
   */
  const puedeGenerar = useMemo(() => {
    if (nodos.length < 20) return false;
    if (nodosAislados.length > 0) return false;
    if (!componentePrincipalYNoConectados.esConexo) return false;
    return true;
  }, [nodos, nodosAislados, componentePrincipalYNoConectados]);

    /**
   * Ejecuta la generación final del grafo manual.
   *
   * Flujo:
   * - Repite las validaciones clave antes de continuar:
   *   - Mínimo de 20 nodos.
   *   - Sin nodos aislados.
   *   - Grafo conexo.
   * - Si alguna condición falla, muestra un mensaje específico en `mensajeValidacion`.
   * - Si todo está correcto, limpia el mensaje y llama a `GenerarGrafoM(nodos, aristas)`.
   */
  const generarGrafo = () => {
    // Validaciones finales
    if (nodos.length < 20) {
      setMensajeValidacion("Se requieren al menos 20 nodos para generar el grafo.");
      return;
    }
    if (nodosAislados.length > 0) {
      setMensajeValidacion(
        `Hay nodos aislados: ${nodosAislados.join(", ")}. Conéctelos antes de generar.`
      );
      return;
    }

    if (!componentePrincipalYNoConectados.esConexo) {
      setMensajeValidacion(
        `El grafo no es conexo. Nodos fuera de la componente principal: ${componentePrincipalYNoConectados.noConectados.join(", ")}.`
      );
      return;
    }

    setMensajeValidacion(null);
    GenerarGrafoM(nodos, aristas);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "20px",
          padding: "3rem",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          maxWidth: "800px",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "800",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "0.5rem",
            textAlign: "center",
          }}
        >
          Crear Grafo Manual
        </h1>
        <p
          style={{
            color: "#666",
            fontSize: "1rem",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Agrega nodos y aristas personalizadas
        </p>

        <div style={{ display: "flex", gap: "20px" }}>
          {/* Panel de Nodos */}
          <div style={{ flex: 1 }}>
            <h3
              style={{
                color: "#333",
                fontSize: "1.2rem",
                marginBottom: "1rem",
              }}
            >
              Nodos
            </h3>
            <div style={{ marginBottom: "1rem" }}>
              <button
                onClick={agregarNodo}
                style={{
                  width: "100%",
                  padding: "10px 20px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Agregar Nodo
              </button>
            </div>
            <div
              style={{
                maxHeight: "200px",
                overflowY: "auto",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              {nodos.length === 0 ? (
                <p style={{ color: "#999", textAlign: "center" }}>
                  No hay nodos
                </p>
              ) : (
                nodos.map((id) => (
                  <div
                    key={id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px",
                      marginBottom: "5px",
                      background: "#f5f5f5",
                      borderRadius: "5px",
                    }}
                  >
                    <span style={{ color: "#333", fontWeight: "600" }}>
                      Nodo {id}
                    </span>
                    <button
                      onClick={() => eliminarNodo(id)}
                      style={{
                        padding: "5px 10px",
                        background: "#ff4444",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "0.85rem",
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Panel de Aristas */}
          <div style={{ flex: 1 }}>
            <h3
              style={{
                color: "#333",
                fontSize: "1.2rem",
                marginBottom: "1rem",
              }}
            >
              Aristas
            </h3>
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "1rem",
                flexWrap: "wrap",
              }}
            >
              <input
                type="number"
                min={0}
                value={nodo1}
                onChange={(e) => setNodo1(e.target.value)}
                placeholder="Nodo 1"
                style={{
                  flex: 1,
                  minWidth: "80px",
                  padding: "10px 15px",
                  fontSize: "1rem",
                  border: "2px solid #e0e0e0",
                  borderRadius: "8px",
                  outline: "none",
                  color: "#333",
                }}
              />
              <input
                type="number"
                min={0}
                value={nodo2}
                onChange={(e) => setNodo2(e.target.value)}
                placeholder="Nodo 2"
                style={{
                  flex: 1,
                  minWidth: "80px",
                  padding: "10px 15px",
                  fontSize: "1rem",
                  border: "2px solid #e0e0e0",
                  borderRadius: "8px",
                  outline: "none",
                  color: "#333",
                }}
                onKeyDown={(e) => e.key === "Enter" && agregarArista()}
              />
              <button
                onClick={agregarArista}
                style={{
                  padding: "10px 20px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Agregar
              </button>
            </div>
            <div
              style={{
                maxHeight: "200px",
                overflowY: "auto",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              {aristas.length === 0 ? (
                <p style={{ color: "#999", textAlign: "center" }}>
                  No hay aristas
                </p>
              ) : (
                aristas.map((arista, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px",
                      marginBottom: "5px",
                      background: "#f5f5f5",
                      borderRadius: "5px",
                    }}
                  >
                    <span style={{ color: "#333", fontWeight: "600" }}>
                      {arista[0]} - {arista[1]}
                    </span>
                    <button
                      onClick={() => eliminarArista(index)}
                      style={{
                        padding: "5px 10px",
                        background: "#ff4444",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "0.85rem",
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Mensajes de validación */}
        <div style={{ marginTop: "1rem" }}>
          {!puedeGenerar && (
            <div
              style={{
                padding: "12px",
                borderRadius: "8px",
                background: "#fff3cd",
                color: "#856404",
                border: "1px solid #ffeeba",
                marginBottom: "1rem",
              }}
            >
              {nodos.length < 20 && (
                <div>Se requieren al menos 20 nodos (act.: {nodos.length}).</div>
              )}
              {nodosAislados.length > 0 && (
                <div>
                  Nodos aislados: {nodosAislados.join(", ")}. Conéctelos antes
                  de generar.
                </div>
              )}
              {!componentePrincipalYNoConectados.esConexo && (
                <div>
                  El grafo no es conexo. Nodos fuera de la componente principal:{" "}
                  {componentePrincipalYNoConectados.noConectados.join(", ")}.
                </div>
              )}
            </div>
          )}

          {mensajeValidacion && (
            <div
              style={{
                padding: "12px",
                borderRadius: "8px",
                background: "#f8d7da",
                color: "#721c24",
                border: "1px solid #f5c6cb",
                marginBottom: "1rem",
              }}
            >
              {mensajeValidacion}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "2rem",
          }}
        >
          {puedeGenerar ? (
            <Boton texto="Generar Grafo" onClick={generarGrafo} />
          ) : (
            <button
              disabled
              style={{
                width: "100%",
                padding: "12px 24px",
                fontSize: "1rem",
                fontWeight: "600",
                color: "white",
                background: "#bdbdbd",
                border: "none",
                borderRadius: "10px",
                cursor: "not-allowed",
                boxShadow: "none",
              }}
              title={
                nodos.length < 20
                  ? "Se requieren al menos 20 nodos"
                  : "Existen nodos aislados o el grafo no es conexo"
              }
            >
              Generar Grafo
            </button>
          )}

          <Boton texto="Volver" onClick={() => cambiarPagina("menu")} />
        </div>
      </div>
    </div>
  );
}

export default GrafoManual;
