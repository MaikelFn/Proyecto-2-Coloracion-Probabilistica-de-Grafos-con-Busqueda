type Color = "Azul" | "Amarillo" | "Morado" | null;

type NodoProps = {
  x: number;
  y: number;
  id: number;
  color: Color;
};

/**
 * Componente visual que representa un nodo del grafo.
 *
 * - Es un componente presentacional, sin estado interno.
 * - Se posiciona absolutamente en las coordenadas `x`, `y` recibidas.
 * - Muestra el `id` dentro de un círculo y aplica un color de fondo según `color`.
 *
 * Notas:
 * - El mapa `colores` asocia los nombres lógicos a códigos hex (colores de la UI).
 * - Si `color` es `null`, se usa un color por defecto (en este código: "#000000ff").
 */

function Nodo(props: NodoProps) {
  const colores = {
    Azul: "#3b82f6",
    Amarillo: "#fbbf24",
    Morado: "#a855f7",
  };

  // Detectar si no tiene color
  const tieneColor = props.color !== null;
  const colorFondo =
    tieneColor && props.color ? colores[props.color] : "#000000ff";

  return (
    <div
      style={{
        // Estilo del nodo
        position: "absolute",
        left: `${props.x}px`,
        top: `${props.y}px`,
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        backgroundColor: colorFondo,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
        margin: "10px",
      }}
    >
      {props.id}
    </div>
  );
}

export default Nodo;
