import { useEthereum } from './useEthereum';
import { useEffect, useState } from 'react';

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
    const { contract } = useEthereum();
    const [board, setBoard] = useState(Array(9).fill(null));
    const [gameStatus, setGameStatus] = useState(GameStatus.READY_TO_START);
    const [isPlayer1, setIsPlayer1] = useState(false);

    const getGameStatus = (encodedBoard) => {
        if (encodedBoard === 0xffffff) {
            return GameStatus.READY_TO_START;
        }
        if (((encodedBoard >> 21) & 1) === 1) {
            return GameStatus.WAITING_FOR_OPPONENT_TO_JOIN;
        }

        const gameState = (encodedBoard >> 19) & 0b11;
        if (gameState === 0b01) {
            return isPlayer1 ? GameStatus.YOU_WON : GameStatus.YOU_LOST;
        } else if (gameState === 0b10) {
            return isPlayer1 ? GameStatus.YOU_LOST : GameStatus.YOU_WON;
        } else if (gameState === 0b11) {
            return GameStatus.DRAW;
        }

        if (isPlayer1) {
            return ((encodedBoard >> 18) & 1) === 0 ? GameStatus.YOUR_TURN : GameStatus.OPPONENTS_TURN;
        } else {
            return ((encodedBoard >> 18) & 1) === 1 ? GameStatus.YOUR_TURN : GameStatus.OPPONENTS_TURN;
        }
    };

    const fetchBoard = async () => {
        if (contract) {
            return Number(await contract.getBoardForPlayer());
        }
        return null;
    };

    const decodeAndUpdateBoard = (encodedBoard) => {
        if (encodedBoard === null) return;
        if ((encodedBoard & (1 << 22)) === 0) {
            setIsPlayer1(true);
        } else {
            setIsPlayer1(false);
        }
        setGameStatus(getGameStatus(encodedBoard));
        setBoard((prevBoard) => {
            const newBoard = [];
            for (let i = 0; i < 9; i++) {
                const cell = (encodedBoard >> (i * 2)) & 0b11;
                if (cell === 0b01) {
                    newBoard.push('X');
                } else if (cell === 0b10) {
                    newBoard.push('O');
                } else if (cell === 0b00) {
                    newBoard.push(null);
                }
            }

            if (JSON.stringify(prevBoard) !== JSON.stringify(newBoard)) {
                return newBoard;
            } else {
                return prevBoard;
            }
        });
    };

    const handleClick = async (index) => {
        if (!contract) return;

        if (gameStatus !== GameStatus.YOUR_TURN) {
            return;
        }
        if (board[index] !== null) {
            return;
        }

        try {
            await contract.makeMove(index);
            setBoard((prevBoard) => {
                const newBoard = [...prevBoard];
                newBoard[index] = isPlayer1 ? 'X' : 'O';
                return newBoard;
            });
        } catch (error) {
            console.error('Error making move:', error);
        }
    };
    const handleJoinGame = async () => {
        const userConfirmed = window.confirm('Playing will cost 20 SDS. Do you want to proceed?');
        if (!userConfirmed) {
            return;
        }

        try {
            await contract.playTicTacToe();
        } catch (error) {
            console.error('Error joining game:', error);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchBoard().then((encodedBoard) => {
                decodeAndUpdateBoard(encodedBoard);
            });
        }, 3000);

        return () => {
            clearInterval(intervalId);
        };
    }, [contract, board]);

    return { board, handleClick, gameStatus, handleJoinGame };
}

export default useTicTacToe;
