import './TicTacToeBoardDisplay.css';
import useTicTacToe, { GameStatus } from '../../hooks/useTicTacToe';

function TicTacToeBoardDisplay() {
    const { board, handleClick, gameStatus, handleJoinGame } = useTicTacToe();

    const boardComponent = (
        <div className="tic-tac-toe-board">
            {board.map((cell, index) => (
                <button key={index} className="tic-tac-toe-button" onClick={() => handleClick(index)}>
                    {cell}
                </button>
            ))}
        </div>
    );

    const joinGameButton = (
        <button className="join-game-button" onClick={handleJoinGame}>
            Join Game (20 SDS)
        </button>
    );

    let componentToRender = null;
    switch (gameStatus) {
        case GameStatus.READY_TO_START:
            componentToRender = <div className="message-container">{joinGameButton}</div>;
            break;
        case GameStatus.WAITING_FOR_OPPONENT_TO_JOIN:
            componentToRender = (
                <div className="message-container">
                    <p className="message-text">Waiting for opponent to join...</p>
                </div>
            );
            break;
        case GameStatus.YOUR_TURN:
            componentToRender = (
                <div className="message-container">
                    <p className="message-text">Your turn</p>
                    {boardComponent}
                </div>
            );
            break;
        case GameStatus.OPPONENTS_TURN:
            componentToRender = (
                <div className="message-container">
                    <p className="message-text">Opponent&apos;s turn</p>
                    {boardComponent}
                </div>
            );
            break;
        case GameStatus.YOU_WON:
            componentToRender = (
                <div className="message-container">
                    <p className="message-text">You won! Congratulations!</p>
                    {boardComponent}
                    {joinGameButton}
                </div>
            );
            break;
        case GameStatus.YOU_LOST:
            componentToRender = (
                <div className="message-container">
                    <p className="message-text">You lost! Good luck next time!</p>
                    {boardComponent}
                    {joinGameButton}
                </div>
            );
            break;
        case GameStatus.DRAW:
            componentToRender = (
                <div className="message-container">
                    <p className="message-text">It is a draw! Well played!</p>
                    {boardComponent}
                    {joinGameButton}
                </div>
            );
            break;
        default:
            componentToRender = (
                <div className="message-container">
                    <p className="message-text">Something went wrong. Please refresh the page.</p>
                </div>
            );
    }

    return componentToRender;
}

export default TicTacToeBoardDisplay;
