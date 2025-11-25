import { useState } from "react";
import Boton from "../Componentes/Boton";
import EntradaNumerica from "../Componentes/EntradaNumerica";
import Grafo from "../Componentes/Grafo";
import { Grafo as GrafoClass } from "../Clases";
import { MonteCarloColoracion } from "../logica";

type MonteCarloProps = {
  grafo: GrafoClass;
  cambiarPagina: (
    pagina: "menu" | "generarAleatorio" | "previsualizar"
  ) => void;
};

type Resultado = {
  intento: number;
  conflictos: number;
  mapa_colores: { [key: number]: string | null };
};

function MonteCarlo({ grafo, cambiarPagina }: MonteCarloProps) {
  const [intentos, setIntentos] = useState<number>(1000);
  const [ejecutado, setEjecutado] = useState<boolean>(false);
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [tiempoTotal, setTiempoTotal] = useState<number>(0);
  const [exitos, setExitos] = useState<number>(0);
  const [intentoActual, setIntentoActual] = useState<number>(0);
  const [idNodo, setIdNodo] = useState<number>(0);
  const [colorSeleccionado, setColorSeleccionado] = useState<string>("Azul");

  const ejecutarMonteCarlo = () => {
    const [historial, tiempo, exitosTotal] = MonteCarloColoracion(
      grafo,
      intentos
    );
    setResultados(historial);
    setTiempoTotal(tiempo);
    setExitos(exitosTotal);
    setIntentoActual(intentos - 1);
    setEjecutado(true);
  };

  const cambiarIntento = (valor: number) => {
    const nuevoIntento = valor - 1;
    if (nuevoIntento >= 0 && nuevoIntento < resultados.length) {
      setIntentoActual(nuevoIntento);
    }
  };

  const pintarNodoManual = () => {
    let nodo = null;
    for (let i = 0; i < grafo.nodos.length; i++) {
      if (grafo.nodos[i].id === idNodo) {
        nodo = grafo.nodos[i];
        break;
      }
    }

    if (nodo) {
      nodo.colorear(colorSeleccionado);
      grafo.validar_aristas();

      const nuevoMapaColores = grafo.obtener_colores();
      const nuevosResultados = [...resultados];
      nuevosResultados[intentoActual] = {
        ...nuevosResultados[intentoActual],
        mapa_colores: nuevoMapaColores,
        conflictos: grafo.total_conflictos(),
      };
      setResultados(nuevosResultados);
    }
  };

  if (!ejecutado) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
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
            maxWidth: "600px",
            width: "100%",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "800",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "0.5rem",
              textAlign: "center",
            }}
          >
            Algoritmo Monte Carlo
          </h1>
          <p
            style={{
              color: "#666",
              fontSize: "1rem",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            Configura y ejecuta el algoritmo probabilístico
          </p>

          <div style={{ marginBottom: "2rem" }}>
            <EntradaNumerica
              defaultValor={intentos}
              onChange={setIntentos}
              minimo={1}
              etiqueta="Cantidad de Intentos"
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <Boton texto="Ejecutar" onClick={ejecutarMonteCarlo} />
            <Boton
              texto="Volver"
              onClick={() => cambiarPagina("previsualizar")}
            />
          </div>
        </div>
      </div>
    );
  }

  const resultadoActual = resultados[intentoActual];
  grafo.recolorear_nodos(resultadoActual.mapa_colores);

  const estadisticas = grafo.obtener_estadisticas();

  const nodos = grafo.obtener_nodos() as Array<[number, string | null]>;
  const aristas = grafo.obtener_conexiones() as Array<
    [number, number, boolean]
  >;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2rem",
        gap: "2rem",
      }}
    >
      {/* Panel Izquierdo - Grafo */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "auto",
        }}
      >
        <Grafo nodos={nodos} aristas={aristas} />
      </div>

      {/* Panel Derecho Estadísticas y Controles */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "auto auto",
          gap: "1rem",
          alignContent: "start",
        }}
      >
        {/* Estadísticas del Intento Actual */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "15px",
            padding: "1rem",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: "700",
              color: "#333",
              marginBottom: "0.8rem",
            }}
          >
            Estadísticas del Intento
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
          >
            <p style={{ color: "#666", fontSize: "0.85rem" }}>
              <strong>Intento:</strong> {resultadoActual.intento} / {intentos}
            </p>
            <p style={{ color: "#666", fontSize: "0.85rem" }}>
              <strong>Conflictos:</strong> {estadisticas.total_conflictos}
            </p>
            <p style={{ color: "#666", fontSize: "0.85rem" }}>
              <strong>Aristas Válidas:</strong> {estadisticas.aristas_validas} /{" "}
              {estadisticas.total_aristas}
            </p>
            <p style={{ color: "#666", fontSize: "0.85rem" }}>
              <strong>Nodos con Conflictos:</strong>{" "}
              {estadisticas.nodos_con_conflictos}
            </p>
            <p style={{ color: "#666", fontSize: "0.85rem" }}>
              <strong>Estado:</strong>{" "}
              {estadisticas.es_valido ? (
                <span style={{ color: "#22c55e", fontWeight: "600" }}>
                  Solución Válida
                </span>
              ) : (
                <span style={{ color: "#ef4444", fontWeight: "600" }}>
                  Con Conflictos
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Estadísticas Generales */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "15px",
            padding: "1rem",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: "700",
              color: "#333",
              marginBottom: "0.8rem",
            }}
          >
            Estadísticas Generales
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
          >
            <p style={{ color: "#666", fontSize: "0.85rem" }}>
              <strong>Total de Intentos:</strong> {intentos}
            </p>
            <p style={{ color: "#666", fontSize: "0.85rem" }}>
              <strong>Intentos Exitosos:</strong> {exitos}
            </p>
            <p style={{ color: "#666", fontSize: "0.85rem" }}>
              <strong>Tasa de Éxito:</strong>{" "}
              {((exitos / intentos) * 100).toFixed(2)}%
            </p>
            <p style={{ color: "#666", fontSize: "0.85rem" }}>
              <strong>Tiempo Total:</strong> {tiempoTotal.toFixed(2)} ms
            </p>
            <p style={{ color: "#666", fontSize: "0.85rem" }}>
              <strong>Tiempo Promedio:</strong>{" "}
              {(tiempoTotal / intentos).toFixed(2)} ms/intento
            </p>
          </div>
        </div>

        {/* Controles - Ver Intento y Colorear */}
        <div
          style={{
            gridColumn: "1 / 3",
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "15px",
            padding: "1rem",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
            maxWidth: "600px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: "700",
              color: "#333",
              marginBottom: "0.8rem",
            }}
          >
            Controles
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {/* Ver Otro Intento */}
            <div>
              <EntradaNumerica
                defaultValor={intentoActual + 1}
                onChange={cambiarIntento}
                minimo={1}
                maximo={resultados.length}
                etiqueta="Número de Intento"
              />
            </div>

            {/* Colorear Nodo Manual */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem",
              }}
            >
              <h3
                style={{
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  color: "#333",
                  margin: 0,
                }}
              >
                Colorear Nodo Manual
              </h3>
              <div>
                <label
                  style={{
                    color: "#333",
                    fontWeight: "600",
                    fontSize: "0.85rem",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Color
                </label>
                <select
                  value={colorSeleccionado}
                  onChange={(e) => setColorSeleccionado(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    fontSize: "0.9rem",
                    border: "2px solid #e0e0e0",
                    borderRadius: "8px",
                    outline: "none",
                    color: "#333",
                    backgroundColor: "#fff",
                    cursor: "pointer",
                  }}
                >
                  <option value="Azul">Azul</option>
                  <option value="Amarillo">Amarillo</option>
                  <option value="Morado">Morado</option>
                </select>
              </div>
              <EntradaNumerica
                defaultValor={idNodo}
                onChange={setIdNodo}
                minimo={0}
                maximo={grafo.nodos.length - 1}
                etiqueta="ID del Nodo"
              />
              <Boton texto="Aplicar Color" onClick={pintarNodoManual} />
              <Boton
                texto="Volver al Inicio"
                onClick={() => cambiarPagina("previsualizar")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonteCarlo;
