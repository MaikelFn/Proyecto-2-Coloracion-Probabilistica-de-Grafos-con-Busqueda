import { useState } from "react";
import Boton from "../Componentes/Boton";

type GrafoManualProps = {
  GenerarGrafoM: (nodos: number[], aristas: [number, number][]) => void;
  cambiarPagina: (
    pagina: "menu" | "generarAleatorio" | "previsualizar" | "grafoManual"
  ) => void;
};

function GrafoManual({ GenerarGrafoM, cambiarPagina }: GrafoManualProps) {
  const [nodos, setNodos] = useState<number[]>([]);
  const [aristas, setAristas] = useState<[number, number][]>([]);
  const [nodo1, setNodo1] = useState<string>("");
  const [nodo2, setNodo2] = useState<string>("");

  const agregarNodo = () => {
    // Buscar el siguiente ID disponible
    const nuevoId = nodos.length === 0 ? 0 : Math.max(...nodos) + 1;
    setNodos([...nodos, nuevoId]);
  };

  const eliminarNodo = (id: number) => {
    setNodos(nodos.filter((n) => n !== id));
    // Eliminar aristas que incluyan este nodo
    setAristas(aristas.filter(([id1, id2]) => id1 !== id && id2 !== id));
  };

  const agregarArista = () => {
    const id1 = parseInt(nodo1);
    const id2 = parseInt(nodo2);

    if (
      !isNaN(id1) &&
      !isNaN(id2) &&
      id1 !== id2 &&
      nodos.includes(id1) &&
      nodos.includes(id2)
    ) {
      // Verificar que la arista no exista ya
      const aristaExiste = aristas.some(
        ([a, b]) => (a === id1 && b === id2) || (a === id2 && b === id1)
      );
      if (!aristaExiste) {
        setAristas([...aristas, [id1, id2]]);
        setNodo1("");
        setNodo2("");
      }
    }
  };

  const eliminarArista = (index: number) => {
    setAristas(aristas.filter((_, i) => i !== index));
  };

  const generarGrafo = () => {
    if (nodos.length > 0) {
      GenerarGrafoM(nodos, aristas);
    }
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
                onKeyPress={(e) => e.key === "Enter" && agregarArista()}
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

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "2rem",
          }}
        >
          <Boton texto="Generar Grafo" onClick={generarGrafo} />
          <Boton texto="Volver" onClick={() => cambiarPagina("menu")} />
        </div>
      </div>
    </div>
  );
}

export default GrafoManual;
