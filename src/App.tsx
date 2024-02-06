import GameManager from "./components/GameManager";
import { GameDataProvider } from "./providers/GameContextProvider";

function App() {
  return (
    <>
      <GameDataProvider>
        <GameManager />
      </GameDataProvider>
    </>
  );
}

export default App;
