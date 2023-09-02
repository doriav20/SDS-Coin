import {BalanceDisplayDiv} from "./BalanceDisplayDiv";
import {AccountAddressDisplayDiv} from "./AccountAddressDisplayDiv";

export function AccountDetailsDisplay() {
    return (
        <div>
            <BalanceDisplayDiv/>
            <AccountAddressDisplayDiv/>
        </div>
    );
}