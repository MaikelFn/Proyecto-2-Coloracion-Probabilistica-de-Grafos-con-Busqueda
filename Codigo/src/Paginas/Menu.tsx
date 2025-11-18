import Boton from "../Componentes/Boton";

type MenuProps = {
  cambiarPagina: (pagina: "menu" | "generarAleatorio") => void;
};

function Menu({ cambiarPagina }: MenuProps) {
  return (
    <div>
      <h1>Bienvenido a la página de inicio</h1>
      <Boton
        texto="Generar Grafo Manual"
        onClick={() => alert("Chambea Tayler")}
      />
      <Boton
        texto="Generar Grafo Aleatorio"
        onClick={() => cambiarPagina("generarAleatorio")}
      />
    </div>
  );
}

export default Menu;
