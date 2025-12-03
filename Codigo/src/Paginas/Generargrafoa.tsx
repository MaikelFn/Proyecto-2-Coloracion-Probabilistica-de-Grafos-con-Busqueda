import { useState } from "react";
import Boton from "../Componentes/Boton";
import EntradaNumerica from "../Componentes/EntradaNumerica";
import "../logica";

type GenerarGrafoAleatorioProps = {
  GenerarGrafoA: (numNodos: number, probabilidadArista: number) => void;
  cambiarPagina: (
    pagina: "menu" | "generarAleatorio" | "previsualizar"
  ) => void;
};

/**
 * Componente de configuración para la generación de grafos aleatorios.
 *
 * Funcionalidad principal:
 * - Permite al usuario definir la cantidad de nodos y la probabilidad de conexión.
 * - Ejecuta validaciones básicas antes de generar el grafo.
 * - Permite regresar al menú principal mediante navegación por estado.
 *
 * Props:
 * - GenerarGrafoA: función que construye el grafo a partir del número de nodos y la probabilidad.
 * - cambiarPagina: función que permite cambiar la vista actual del sistema.
 *
 * Notas de implementación:
 * - Se utiliza estado local con `useState` para controlar entradas y mensajes de error.
 * - El componente es de tipo controlador de vista (renderiza y gestiona lógica básica).
 * - El diseño visual se implementa completamente con estilos inline.
 */
function GenerarGrafoAleatorio({
  GenerarGrafoA,
  cambiarPagina,
}: GenerarGrafoAleatorioProps) {

    /**
   * Estados internos del componente:
   *
   * - CantNodos: controla la cantidad de nodos que tendrá el grafo.
   * - ProbConex: controla la probabilidad de conexión entre nodos.
   * - error: almacena mensajes de validación para mostrar al usuario.
   *
   * Observación:
   * - Los valores iniciales reflejan parámetros por defecto razonables.
   */
  const [CantNodos, setCantNodos] = useState<number>(60);
  const [ProbConex, setProbConex] = useState<number>(0.02);
  const [error, setError] = useState<string>("");

  const validar = (): boolean => {
    if (isNaN(CantNodos) || CantNodos < 60 || CantNodos > 120) {
      setError("El numero de nodos debe estar entre 60 y 120.");
      return false;
    }

    if (isNaN(ProbConex) || ProbConex < 0 || ProbConex > 1) {
      setError("La probabilidad debe estar entre 0 y 1.");
      return false;
    }

    setError("");
    return true;
  };


  const generar = () => {
    if (!validar()) return;
    GenerarGrafoA(CantNodos, ProbConex);
  };

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
          maxWidth: "500px",
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
          Configuración
        </h1>
        <p
          style={{
            color: "#666",
            fontSize: "1rem",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Parámetros del grafo aleatorio
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          <EntradaNumerica
            etiqueta="Número de nodos"
            soloEnteros
            onChange={(value) => setCantNodos(value)}
            name="numNodos"
            minimo={1}
            maximo={120}
            defaultValor={60}
          />

          <EntradaNumerica
            etiqueta="Probabilidad de conexión:"
            onChange={(value) => setProbConex(value)}
            name="probabilidad"
            minimo={0}
            maximo={1}
            defaultValor={0.02}
          />

          {error && (
            <p style={{ color: "red", fontSize: "0.85rem", textAlign: "center" }}>
              {error}
            </p>
          )}

          <div style={{ display: "flex", gap: "10px", marginTop: "1rem" }}>
            <Boton texto="Generar Grafo" onClick={generar} />
            <Boton texto="Volver" onClick={() => cambiarPagina("menu")} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default GenerarGrafoAleatorio;
