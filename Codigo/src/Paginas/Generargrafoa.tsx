import Boton from "../Componentes/Boton";
import EntradaNumerica from "../Componentes/EntradaNumerica";

function GenerarGrafoAleatorio() {
  return (
    <div>
      <h1>Generar Grafo Aleatorio</h1>
      <EntradaNumerica
        etiqueta="Número de nodos:"
        name="numNodos"
        minimo={60}
        maximo={120}
        defaultValor={60}
      />
      <EntradaNumerica
        etiqueta="Probabilidad de conexión:"
        name="probabilidad"
        minimo={0}
        maximo={1}
        defaultValor={0.5}
      />
      <Boton
        texto="Generar Grafo"
        onClick={() => alert("sigo sin saber cambiar paginas xd")}
      />
    </div>
  );
}

export default GenerarGrafoAleatorio;
