import useBalance from '../../hooks/useBalance';
import { visualizeNumber } from '../../utils';

export default function BalanceDisplay({ currency, ...props }) {
    const { balance, decimals } = useBalance();

    let readableBalance = visualizeNumber(balance, decimals);

    return (
        <div {...props}>
            {readableBalance && (
                <p>
                    {readableBalance}
                    {currency ? ' ' + currency : ''}
                </p>
            )}
        </div>
    );
}
