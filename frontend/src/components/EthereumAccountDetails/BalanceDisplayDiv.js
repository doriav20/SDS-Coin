import useBalance from '../../hooks/useBalance';
import { visualizeNumber } from '../../utils';

export default function BalanceDisplayDiv({ currency, style }) {
    const { balance, decimals } = useBalance();

    let readableBalance = visualizeNumber(balance, decimals);

    return (
        <div style={style}>
            {readableBalance && (
                <p>
                    {readableBalance}
                    {currency ? ' ' + currency : ''}
                </p>
            )}
        </div>
    );
}
