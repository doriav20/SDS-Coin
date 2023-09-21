import './BetInput.css';
function BetInput({ amountOfRed, setAmountOfRed, amountOfGreen, setAmountOfGreen, amountOfBlack, setAmountOfBlack }) {
    return (
        <div>
            <input
                type="text"
                placeholder="Stake on Red"
                value={amountOfRed !== 0 ? amountOfRed : ''}
                onChange={(e) => {
                    const value = Number(e.target.value) || 0;
                    setAmountOfRed(value);
                }}
                className="amount-of-red-input"
            />
            <input
                type="text"
                placeholder="Stake on Green"
                value={amountOfGreen !== 0 ? amountOfGreen : ''}
                onChange={(e) => {
                    const value = Number(e.target.value) || 0;
                    setAmountOfGreen(value);
                }}
                className="amount-of-green-input"
            />
            <input
                type="text"
                placeholder="Stake on Black"
                value={amountOfBlack !== 0 ? amountOfBlack : ''}
                onChange={(e) => {
                    const value = Number(e.target.value) || 0;
                    setAmountOfBlack(value);
                }}
                className="amount-of-black-input"
            />
        </div>
    );
}
export default BetInput;
