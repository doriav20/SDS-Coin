import '../../components/App/App.css';
import { EthereumProvider } from '../../hooks/useEthereum';
import AccountDetailsDisplay from '../../components/EthereumAccountDetails/AccountDetailsDisplay';

function WalletDetails() {
    return (
        <div className="App">
            <div className="App-header">
                <EthereumProvider>
                    <AccountDetailsDisplay />
                </EthereumProvider>
            </div>
        </div>
    );
}

export default WalletDetails;
