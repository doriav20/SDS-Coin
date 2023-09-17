import useTicTacToe, { GameStatus } from '../../hooks/useTicTacToe';

function TicTacToeBoardDisplay() {
    const { board, handleClick, gameStatus, handleJoinGame } = useTicTacToe();

    const boardComponent = (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 60px)', gap: '5px' }}>
            {board.map((cell, index) => (
                <button
                    key={index}
                    style={{ width: '60px', height: '60px', fontSize: '20px' }}
                    onClick={() => handleClick(index)}
                >
                    {cell}
                </button>
            ))}
        </div>
    );

    let componentToRender = null;
    switch (gameStatus) {
        case GameStatus.READY_TO_START:
            componentToRender = <button onClick={handleJoinGame}>Join Game</button>;
            break;
        case GameStatus.WAITING_FOR_OPPONENT_TO_JOIN:
            componentToRender = <p>Waiting for opponent to join...</p>;
            break;
        case GameStatus.YOUR_TURN:
            componentToRender = (
                <div>
                    <p>Your turn</p>
                    {boardComponent}
                </div>
            );
            break;
        case GameStatus.OPPONENTS_TURN:
            componentToRender = (
                <div>
                    <p>Opponent&apos;s turn</p>
                    {boardComponent}
                </div>
            );
            break;
        case GameStatus.YOU_WON:
            componentToRender = (
                <div>
                    <p>You won!</p>
                    {boardComponent}
                </div>
            );
            break;
        case GameStatus.YOU_LOST:
            componentToRender = (
                <div>
                    <p>You lost!</p>
                    {boardComponent}
                </div>
            );
            break;
        case GameStatus.DRAW:
            componentToRender = (
                <div>
                    <p>Draw!</p>
                    {boardComponent}
                </div>
            );
            break;
        default:
            componentToRender = <p>Something went wrong. Please refresh the page.</p>;
    }

    return componentToRender;
}

export default TicTacToeBoardDisplay;
