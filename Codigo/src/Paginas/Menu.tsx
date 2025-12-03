import Boton from "../Componentes/Boton";

type MenuProps = {
  cambiarPagina: (pagina: "menu" | "generarAleatorio" | "grafoManual") => void;
};

/**
 * Componente `Menu`.
 *
 * Pantalla principal del sistema.
 *
 * Responsabilidades:
 * - Mostrar opciones de generación de grafos.
 * - Redirigir a generación aleatoria o manual.
 *
 * No contiene lógica de negocio,
 * únicamente navegación visual.
 */
function Menu({ cambiarPagina }: MenuProps) {
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
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "1rem",
          }}
        >
          Coloración de Grafos
        </h1>
        <p
          style={{
            color: "#666",
            fontSize: "1.1rem",
            marginBottom: "2.5rem",
          }}
        >
          Algoritmos Probabilísticos Monte Carlo y Las Vegas
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <Boton
            texto="Generar Grafo Aleatorio"
            onClick={() => cambiarPagina("generarAleatorio")}
          />
          <Boton
            texto="Generar Grafo Manual"
            onClick={() => cambiarPagina("grafoManual")}
          />
        </div>
      </div>
    </div>
  );
}

export default Menu;
