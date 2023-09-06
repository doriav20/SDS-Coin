import BalanceDisplayDiv from './BalanceDisplayDiv';
import AccountAddressDisplayDiv from './AccountAddressDisplayDiv';

export default function AccountDetailsDisplay() {
    return (
        <>
            <div>
                <span>Balance: </span>
                <BalanceDisplayDiv currency={'SDS'} style={{ display: 'inline-block' }} />
            </div>
            <div>
                <span>Address: </span>
                <AccountAddressDisplayDiv style={{ display: 'inline-block' }} />
            </div>
        </>
    );
}
