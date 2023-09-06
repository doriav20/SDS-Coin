import './App.css';
import AccountDetailsDisplay from '../EthereumAccountDetails/AccountDetailsDisplay';
import { EthereumProvider } from '../../hooks/useEthereum';
import AppNavbar from '../AppNavbar/AppNavbar';

function App() {
    return (
        <div className="App">
            <header>
                <AppNavbar />
            </header>
            <div className="App-header">
                <EthereumProvider>
                    <AccountDetailsDisplay />
                </EthereumProvider>
            </div>
        </div>
    );
}

export default App;
