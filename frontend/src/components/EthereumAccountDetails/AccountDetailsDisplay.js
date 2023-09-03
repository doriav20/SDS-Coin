import { BalanceDisplayDiv } from './BalanceDisplayDiv';
import { AccountAddressDisplayDiv } from './AccountAddressDisplayDiv';

export function AccountDetailsDisplay() {
    return (
        <>
            <BalanceDisplayDiv currency={'SDS'} />
            <AccountAddressDisplayDiv />
        </>
    );
}
