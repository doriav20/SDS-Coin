import './App.css';
import { BalanceDisplayDiv } from "../../hooks/useBalance";

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
