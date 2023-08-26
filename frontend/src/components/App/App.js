import './App.css';
import { BalanceDisplay } from "../../hooks/useMyBalance";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BalanceDisplay />
      </header>
    </div>
  );
}

export default App;
