import '../../components/App/App.css';
import AccountDetailsDisplay from '../../components/EthereumAccountDetails/AccountDetailsDisplay';

function WalletDetails() {
    return (
        <div className="App">
            <div className="App-header">
                <AccountDetailsDisplay />
            </div>
        </div>
    );
}

export default WalletDetails;
