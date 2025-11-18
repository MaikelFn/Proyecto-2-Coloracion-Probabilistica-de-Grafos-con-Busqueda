import Boton from "../Componentes/Boton";
function Menu() {
  return (
    <div>
      <h1>Bienvenido a la página de inicio</h1>
      <Boton
        texto="Generar Grafo Manual"
        onClick={() => alert("No se como cambiar paginas xd")}
      />
      <Boton
        texto="Generar Grafo Aleatorio"
        onClick={() => alert("!Que No se como cambiar paginas xd¡")}
      />
    </div>
  );
}

export default Menu;
