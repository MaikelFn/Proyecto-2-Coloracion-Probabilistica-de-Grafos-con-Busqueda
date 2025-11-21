type BotonProps = {
  texto: string;
  onClick: () => void;
};

function Boton(props: BotonProps) {
  return (
    <button
      onClick={props.onClick}
      style={{
        padding: "12px 24px",
        fontSize: "1rem",
        fontWeight: "600",
        color: "white",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
        width: "100%",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
      }}
    >
      {props.texto}
    </button>
  );
}

export default Boton;
