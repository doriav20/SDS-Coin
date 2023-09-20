import { useEthereum } from './useEthereum';
import { useState } from 'react';

export default function useMint100() {
    const { contract } = useEthereum();
    const [IsCanMint100, setcan] = useState(false);
    const handleClick = async () => {
        if (!contract) return;
        try {
            const canMin = await contract.canMint100();
            setcan(canMin);

            if (canMin) {
                await contract.mint100();
                setcan(false);
            }
        } catch (error) {
            console.error('Already used mint100', error);
        }
    };

    const updatecan = async () => {
        if (!contract) return;
        try {
            const canMin = await contract.canMint100();
            setcan(canMin);
        } catch (error) {
            console.error('Already used mint100', error);
        }
    };

    return { handleClick, updatecan, IsCanMint100 };
}
