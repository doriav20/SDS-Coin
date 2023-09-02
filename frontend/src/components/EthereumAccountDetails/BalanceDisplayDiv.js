import {useBalance} from "../../hooks/useBalance";
import {visualizeNumber} from "../../utils";

export function BalanceDisplayDiv() {
    const {balance, decimals} = useBalance();

    let readableBalance = visualizeNumber(balance, decimals);

    return (
        <div>
            {readableBalance && <p>{readableBalance} SDS</p>}
        </div>
    );
}