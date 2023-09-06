import './App.css';
import AccountDetailsDisplay from '../EthereumAccountDetails/AccountDetailsDisplay';
import { EthereumProvider } from '../../hooks/useEthereum';
import AppNavbar from '../AppNavbar/AppNavbar';

function App() {
    return (
        <div className="App">
            <AppNavbar />
            <header className="App-header">
                <EthereumProvider>
                    <AccountDetailsDisplay />
                </EthereumProvider>
            </header>
        </div>
    );
}

export default App;
