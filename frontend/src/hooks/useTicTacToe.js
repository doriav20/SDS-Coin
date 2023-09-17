import '../../components/App/App.css';

export const GameStatus = Object.freeze({
    READY_TO_START: 0,
    WAITING_FOR_OPPONENT_TO_JOIN: 1,
    YOUR_TURN: 2,
    OPPONENTS_TURN: 3,
    YOU_WON: 4,
    YOU_LOST: 5,
    DRAW: 6,
});

function useTicTacToe() {
    const board = Array(9).fill(null);
    const handleClick = () => {};
    const handleJoinGame = () => {};
    const gameStatus = GameStatus.READY_TO_START;
    const gameId = null;

    return { board, handleClick, gameStatus, gameId, handleJoinGame };
}

export default useTicTacToe;
