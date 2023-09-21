import useRoulette, { Color } from '../../hooks/useRoulette';
import { Wheel } from 'react-custom-roulette';
import { useState } from 'react';
import './RouletteDisplay.css';

function RouletteDisplay() {
    const { playRoulette } = useRoulette();
    const [amountOfRed, setAmountOfRed] = useState(0);
    const [amountOfGreen, setAmountOfGreen] = useState(0);
    const [amountOfYellow, setAmountOfYellow] = useState(0);

    const data = [];
    data.push({ option: 'x37', style: { backgroundColor: '#00796B', textColor: 'white' }, color: Color.GREEN });
    for (let i = 0; i < 18; i++) {
        data.push(
            { option: 'x2', style: { backgroundColor: '#D61A2B', textColor: 'white' }, color: Color.RED },
            { option: 'x2', style: { backgroundColor: '#FFD700', textColor: 'white' }, color: Color.BLACK }
        );
    }

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const pickRandomIndexMatchColor = (color) => {
        if (color === Color.GREEN) {
            return 0;
        } else if (color === Color.RED) {
            return 2 * Math.floor(Math.random() * 18) + 1;
        } else if (color === Color.BLACK) {
            return 2 * Math.floor(Math.random() * 18) + 2;
        } else {
            console.error('Invalid color');
        }
    };

    const handleSpinClick = () => {
        if (!mustSpin) {
            playRoulette(amountOfRed, amountOfGreen, amountOfYellow).then((result) => {
                console.log({ result });
                const index = pickRandomIndexMatchColor(result);
                setPrizeNumber(index);
                setMustSpin(true);
            });
        }
    };
    return (
        <>
            <div>
                <Wheel
                    mustStartSpinning={mustSpin}
                    prizeNumber={prizeNumber}
                    data={data}
                    textColors={['#ffffff']}
                    onStopSpinning={() => {
                        setMustSpin(false);
                    }}
                />
                <button onClick={handleSpinClick}>SPIN</button>
            </div>
            <div>
                <div>
                    <input
                        type="text"
                        placeholder="Amount of Red"
                        value={amountOfRed}
                        onChange={(e) => {
                            const value = Number(e.target.value) || 0;
                            setAmountOfRed(value);
                        }}
                        className="amount-of-red-input"
                    />
                    <input
                        type="text"
                        placeholder="Amount of Green"
                        value={amountOfGreen}
                        onChange={(e) => {
                            const value = Number(e.target.value) || 0;
                            setAmountOfGreen(value);
                        }}
                        className="amount-of-green-input"
                    />
                    <input
                        type="text"
                        placeholder="Amount of Yellow"
                        value={amountOfYellow}
                        onChange={(e) => {
                            const value = Number(e.target.value) || 0;
                            setAmountOfYellow(value);
                        }}
                        className="amount-of-yellow-input"
                    />
                </div>
            </div>
        </>
    );
}

export default RouletteDisplay;
