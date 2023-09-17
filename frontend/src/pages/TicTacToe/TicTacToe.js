import '../../components/App/App.css';
import TicTacToeBoardDisplay from '../../components/TicTacToe/TicTacToeBoardDisplay';

function TicTacToe() {
    return (
        <div className="App">
            <div className="App-header">{TicTacToeBoardDisplay}</div>
        </div>
    );
}

export default TicTacToe;
