import './App.css';
import { AccountDetailsDisplay } from '../EthereumAccountDetails/AccountDetailsDisplay';
import { EthereumProvider } from '../../hooks/useEthereum';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <EthereumProvider>
                    <AccountDetailsDisplay />
                </EthereumProvider>
            </header>
        </div>
    );
}

export default App;
