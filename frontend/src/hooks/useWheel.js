import { useState } from 'react';
import useRoulette from './useRoulette';

export const Color = Object.freeze({
    UNKNOWN: 0,
    RED: 1,
    GREEN: 2,
    BLACK: 3,
});

function useWheel({ amountOfRed, amountOfGreen, amountOfBlack }) {
    const { playRoulette } = useRoulette();
    const pickRandomIndexMatchColor = (color) => {
        switch (color) {
            case Color.GREEN:
                return 0;
            case Color.RED:
                return 2 * Math.floor(Math.random() * 18) + 1;
            case Color.BLACK:
                return 2 * Math.floor(Math.random() * 18) + 2;
            default:
                console.error('Invalid color');
        }
    };

    const updateWinnings = (color) => {
        switch (color) {
            case Color.GREEN:
                setWinningAmount(35 * amountOfGreen);
                break;
            case Color.RED:
                setWinningAmount(2 * amountOfRed);
                break;
            case Color.BLACK:
                setWinningAmount(2 * amountOfBlack);
                break;
            default:
                console.error('Invalid color');
        }
    };

    const onSpinClick = () => {
        if (!mustSpin) {
            const totalStake = amountOfRed + amountOfGreen + amountOfBlack;
            if (totalStake === 0) return;
            const agreeToPlay = window.confirm(`You are about to stake ${totalStake} SDS. Are you sure?`);
            if (!agreeToPlay) return;

            playRoulette(amountOfRed, amountOfGreen, amountOfBlack).then((result) => {
                const index = pickRandomIndexMatchColor(result);
                setPrizeNumber(index);
                setMustSpin(true);
                updateWinnings(result);
            });
        }
    };

    const onStopSpinning = () => {
        setMustSpin(false);
        if (winningAmount > 0) {
            alert(`You won ${winningAmount} SDS!`);
        } else {
            alert('You did not win this time. Better luck next time!');
        }
    };

    const generateData = () => {
        const data = [];
        data.push({ option: 'x35', style: { backgroundColor: '#006900' } }); //, style: { backgroundColor: '#00796B', textColor: 'white' }, color: Color.GREEN });
        for (let i = 0; i < 36; i++) {
            data.push({ option: 'x2' });
        }
        return data;
    };

    const data = generateData();

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [winningAmount, setWinningAmount] = useState(0);

    return { onSpinClick, onStopSpinning, data, mustSpin, prizeNumber, winningAmount };
}

export default useWheel;
