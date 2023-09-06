import BalanceDisplay from './BalanceDisplay';
import AccountAddressDisplay from './AccountAddressDisplay';

export default function AccountDetailsDisplay() {
    return (
        <>
            <div>
                <span>Balance: </span>
                <BalanceDisplay currency={'SDS'} style={{ display: 'inline-block' }} />
            </div>
            <div>
                <span>Address: </span>
                <AccountAddressDisplay style={{ display: 'inline-block' }} />
            </div>
        </>
    );
}
