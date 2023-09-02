import './App.css';
import { BalanceDisplayDiv } from "../../hooks/useMyBalance";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BalanceDisplayDiv />
      </header>
    </div>
  );
}

export default App;
