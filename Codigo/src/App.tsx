import Menu from "./Paginas/Menu";
import GenerarGrafoAleatorio from "./Paginas/Generargrafoa";
import Previsualizar from "./Paginas/Previsualizar";

function App() {
  return (
    <Previsualizar
      nodos={[
        [1, "Morado"],
        [2, "Azul"],
        [3, "Azul"],
      ]}
    />
  );
}

export default App;
