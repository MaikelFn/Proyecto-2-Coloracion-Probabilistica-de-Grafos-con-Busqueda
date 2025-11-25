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
  console.log("Mapa de colores del intento actual:", grafo.obtener_colores());

  const estadisticas = grafo.obtener_estadisticas();

  const nodos: Array<[number, string | null]> = grafo
    .obtener_nodos()
    .map(([id, color]) => [id as number, color as string | null]);
  const conexiones = grafo.obtener_conexiones();
  const aristas: Array<[number, number, boolean]> = conexiones.map(
    ([id1, id2]) => {
      const arista = grafo.aristas.find(
        (a) =>
          (a.nodo1.id === id1 && a.nodo2.id === id2) ||
          (a.nodo1.id === id2 && a.nodo2.id === id1)
      );
      return [id1 as number, id2 as number, arista?.conflicto || false];
    }
  );

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

      {/* Panel Derecho - Estadísticas y Controles */}
      <div
        style={{
          width: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {/* Estadísticas del Intento Actual */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "20px",
            padding: "1.5rem",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "#333",
              marginBottom: "1rem",
            }}
          >
            Estadísticas del Intento
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <p style={{ color: "#666", fontSize: "0.95rem" }}>
              <strong>Intento:</strong> {resultadoActual.intento} / {intentos}
            </p>
            <p style={{ color: "#666", fontSize: "0.95rem" }}>
              <strong>Conflictos:</strong> {estadisticas.total_conflictos}
            </p>
            <p style={{ color: "#666", fontSize: "0.95rem" }}>
              <strong>Aristas Válidas:</strong> {estadisticas.aristas_validas} /{" "}
              {estadisticas.total_aristas}
            </p>
            <p style={{ color: "#666", fontSize: "0.95rem" }}>
              <strong>Nodos con Conflictos:</strong>{" "}
              {estadisticas.nodos_con_conflictos}
            </p>
            <p style={{ color: "#666", fontSize: "0.95rem" }}>
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
            borderRadius: "20px",
            padding: "1.5rem",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "#333",
              marginBottom: "1rem",
            }}
          >
            Estadísticas Generales
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <p style={{ color: "#666", fontSize: "0.95rem" }}>
              <strong>Total de Intentos:</strong> {intentos}
            </p>
            <p style={{ color: "#666", fontSize: "0.95rem" }}>
              <strong>Intentos Exitosos:</strong> {exitos}
            </p>
            <p style={{ color: "#666", fontSize: "0.95rem" }}>
              <strong>Tasa de Éxito:</strong>{" "}
              {((exitos / intentos) * 100).toFixed(2)}%
            </p>
            <p style={{ color: "#666", fontSize: "0.95rem" }}>
              <strong>Tiempo Total:</strong> {tiempoTotal.toFixed(2)} ms
            </p>
            <p style={{ color: "#666", fontSize: "0.95rem" }}>
              <strong>Tiempo Promedio:</strong>{" "}
              {(tiempoTotal / intentos).toFixed(2)} ms/intento
            </p>
          </div>
        </div>

        {/* Seleccionar Intento */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "20px",
            padding: "1.5rem",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h2
            style={{
              fontSize: "1.2rem",
              fontWeight: "700",
              color: "#333",
              marginBottom: "1rem",
            }}
          >
            Ver Otro Intento
          </h2>
          <EntradaNumerica
            defaultValor={intentoActual + 1}
            onChange={cambiarIntento}
            minimo={1}
            maximo={resultados.length}
            etiqueta="Número de Intento"
          />
        </div>

        {/* Botones de Control */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <Boton
            texto="Volver al Inicio"
            onClick={() => cambiarPagina("previsualizar")}
          />
        </div>
      </div>
    </div>
  );
}

export default MonteCarlo;
