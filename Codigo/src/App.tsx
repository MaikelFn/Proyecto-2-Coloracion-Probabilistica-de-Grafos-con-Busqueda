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
        [4, "Morado"],
        [5, "Morado"],
      ]}
      aristas={[
        [1, 2, false],
        [4, 3, false],
        [4, 5, true],
      ]}
    />
  );
}

export default App;
