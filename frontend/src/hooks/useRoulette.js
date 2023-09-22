import { useEthereum } from './useEthereum';
import { useState } from 'react';
import { AbiCoder } from 'ethers';

export const Color = Object.freeze({
    UNKNOWN: 0,
    RED: 1,
    GREEN: 2,
    BLACK: 3,
});

function useRoulette() {
    const { contract } = useEthereum();
    const [lastResult, setLastResult] = useState(null);

    const playRoulette = async (amountOfRed, amountOfGreen, amountOfBlack) => {
        if (!contract) return Color.UNKNOWN;
        const tx = await contract.playRoulette(amountOfRed, amountOfGreen, amountOfBlack);
        const receipt = await tx.wait();
        const gameResultLog = receipt.logs[receipt.logs.length - 1];
        const gameResult = AbiCoder.defaultAbiCoder().decode(['uint8'], gameResultLog.data)[0];
        const parsedGameResult = numberToColor(Number(gameResult));
        setLastResult(parsedGameResult);
        return parsedGameResult;
    };

    const numberToColor = (number) => {
        switch (number) {
            case 1:
                return Color.RED;
            case 2:
                return Color.GREEN;
            case 3:
                return Color.BLACK;
            default:
                return Color.UNKNOWN;
        }
    };

    return { lastResult, playRoulette };
}

export default useRoulette;
