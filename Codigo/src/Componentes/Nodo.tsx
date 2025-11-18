type Color = "Azul" | "Amarillo" | "Morado";

type NodoProps = {
  x: number;
  y: number;
  id: number;
  color: Color;
};

function Nodo({ id, color, x, y }: NodoProps) {
  const colores = {
    Azul: "#3b82f6",
    Amarillo: "#fbbf24",
    Morado: "#a855f7",
  };

  return (
    <div
      style={{
        // Estilo del nodo
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        backgroundColor: colores[color],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
        margin: "10px",
      }}
    >
      {id}
    </div>
  );
}

export default Nodo;
