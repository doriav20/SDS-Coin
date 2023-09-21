import { Wheel } from 'react-custom-roulette';
import useWheel from '../../hooks/useWheel';

function RouletteWheel({ amountOfRed, amountOfGreen, amountOfBlack }) {
    const { onSpinClick, onStopSpinning, data, mustSpin, prizeNumber } = useWheel({
        amountOfRed,
        amountOfGreen,
        amountOfBlack,
    });

    const backgroundColors = ['#3E3E3E', '#DF3428'];
    const textColors = ['white'];
    const outerBorderColor = '#676767';
    const outerBorderWidth = 8;
    const innerBorderColor = '#676767';
    const innerBorderWidth = 17;
    const innerRadius = 40;
    const radiusLineColor = '#D8A35A';
    const radiusLineWidth = 3;
    const fontSize = 16;
    const textDistance = 86;

    return (
        <div>
            <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={data}
                textColors={textColors}
                onStopSpinning={onStopSpinning}
                backgroundColors={backgroundColors}
                fontSize={fontSize}
                outerBorderColor={outerBorderColor}
                outerBorderWidth={outerBorderWidth}
                innerRadius={innerRadius}
                innerBorderColor={innerBorderColor}
                innerBorderWidth={innerBorderWidth}
                radiusLineColor={radiusLineColor}
                radiusLineWidth={radiusLineWidth}
                perpendicularText
                textDistance={textDistance}
            />
            <button onClick={onSpinClick}>SPIN</button>
        </div>
    );
}

export default RouletteWheel;
