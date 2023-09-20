import { useEthereum } from './useEthereum';
import { useEffect, useState } from 'react';
import { secondsToMilliseconds } from '../utils';

export default function useMint100() {
    const { contract } = useEthereum();
    const [canMint100, setCanMint100] = useState(false);

    const mint100 = async () => {
        if (contract) {
            if (canMint100) {
                await contract.mint100();
            }
            console.error('Mint 100 is not available yet');
        }
    };

    useEffect(() => {
        async function fetchCanMint100() {
            if (contract) {
                const canMint = await contract.canMint100();
                setCanMint100(canMint);
            }
        }

        const intervalId = setInterval(fetchCanMint100, secondsToMilliseconds(30));
        return () => clearInterval(intervalId);
    }, [contract]);

    return { canMint100, mint100 };
}
