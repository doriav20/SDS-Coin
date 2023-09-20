import { useEthereum } from './useEthereum';
import { useEffect, useState } from 'react';

// const Color = Object.freeze({
//     UNKNOWN: 0,
//     RED: 1,
//     BLACK: 2,
//     GREEN: 3,
// });

function useRoulette() {
    const { contract } = useEthereum();
    const [lastResult, setLastResult] = useState(null);

    const fetchLastResult = async () => {
        if (contract) {
            const playerLastResult = await contract.getRouletteResultForPlayer();
            setLastResult(playerLastResult);
        }
    };

    const handleClick = async () => {
        if (!contract) return;
        contract.playRoulette().then(() => {
            fetchLastResult();
        });
    };

    useEffect(() => {
        fetchLastResult();
    }, [contract]);

    return { lastResult, handleClick };
}

export default useRoulette;
