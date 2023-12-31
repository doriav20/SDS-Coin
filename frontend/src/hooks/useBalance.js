import { useEthereum } from './useEthereum';
import { useEffect, useState } from 'react';
import { secondsToMilliseconds } from '../utils';

export default function useBalance() {
    const { contract } = useEthereum();
    const [balance, setBalance] = useState(null);
    const [decimals, setDecimals] = useState(null);

    useEffect(() => {
        async function fetchBalanceAndDecimals() {
            if (contract) {
                const myBalance = await contract.myBalance();
                setBalance(myBalance);

                const contractDecimals = await contract.decimals();
                setDecimals(contractDecimals);
            }
        }

        fetchBalanceAndDecimals();
        const intervalId = setInterval(fetchBalanceAndDecimals, secondsToMilliseconds(5)); // Fetching both balance and decimals every 5 seconds
        return () => clearInterval(intervalId);
    }, [contract]);

    return { balance, decimals };
}
