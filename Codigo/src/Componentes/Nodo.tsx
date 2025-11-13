type Color = "Azul" | "Amarillo" | "Morado";

type NodoProps = {
  id: number;
  color: Color;
};

function Nodo({ id, color }: NodoProps) {
  const colores = {
    Azul: "#3b82f6",
    Amarillo: "#fbbf24",
    Morado: "#a855f7",
  };

  return (
    <div
      style={{
        // Estilo del nodo
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
