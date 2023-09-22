import { useState } from 'react';
import RouletteWheel from './Wheel';
import BetInput from './BetInput';

function RouletteDisplay() {
    const [amountOfRed, setAmountOfRed] = useState(0);
    const [amountOfGreen, setAmountOfGreen] = useState(0);
    const [amountOfBlack, setAmountOfBlack] = useState(0);

    return (
        <>
            <RouletteWheel amountOfRed={amountOfRed} amountOfGreen={amountOfGreen} amountOfBlack={amountOfBlack} />
            <br />
            <BetInput
                amountOfRed={amountOfRed}
                setAmountOfRed={setAmountOfRed}
                amountOfGreen={amountOfGreen}
                setAmountOfGreen={setAmountOfGreen}
                amountOfBlack={amountOfBlack}
                setAmountOfBlack={setAmountOfBlack}
            />
        </>
    );
}

export default RouletteDisplay;
