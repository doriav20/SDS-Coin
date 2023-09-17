// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { TicTacToeBoard } from "./TicTacToeBoard.sol";
import { SDSToken } from "../SDSToken.sol";

contract TicTacToeGame {
    using TicTacToeBoard for uint24;

    SDSToken private token;
    uint256 private constant ENTRY_FEE = 20 * 10 ** 18;

    struct Game {
        uint24 board;
        address player1;
        address player2;
        uint256 betAmount;
        bool isActive;
    }

    mapping(uint256 => Game) private games;
    mapping(address => uint256) private playerGameIds; // Avoid player joining multiple games

    uint256 private nextGameId = 1;
    address private pendingPlayer;

    event GameCreated(uint256 gameId, address player1, address player2, uint256 betAmount);
    event BoardChanged(uint256 indexed gameId, uint24 board);

    constructor(address _tokenAddress) {
        token = SDSToken(_tokenAddress);
    }

    function enterGame(address playerAddress) external {
        require(
            playerGameIds[playerAddress] == 0 ||
                (!games[playerGameIds[playerAddress]].isActive && playerAddress != pendingPlayer),
            "You are already in a game"
        );
        require(token.balanceOf(playerAddress) >= ENTRY_FEE, "Insufficient token balance");
        require(token.transferFrom(playerAddress, address(this), ENTRY_FEE), "Token transfer failed");

        if (pendingPlayer == address(0)) {
            // No player is currently waiting
            pendingPlayer = playerAddress;
            playerGameIds[playerAddress] = nextGameId;
        } else {
            // Match the current player with the pending player
            uint256 gameId = nextGameId;
            games[gameId] = Game({
                board: 0,
                player1: pendingPlayer,
                player2: playerAddress,
                betAmount: 2 * ENTRY_FEE,
                isActive: true
            });
            playerGameIds[playerAddress] = gameId;
            emit GameCreated(gameId, pendingPlayer, playerAddress, 2 * ENTRY_FEE);
            nextGameId++;
            pendingPlayer = address(0); // Reset the pending player
        }
    }

    function makeMove(address playerAddress, uint8 cell) external {
        uint256 gameId = playerGameIds[playerAddress];
        require(gameId != 0, "Game not found");

        Game storage game = games[gameId];

        require(game.isActive, "Game is not active");
        require(game.player1 == playerAddress || game.player2 == playerAddress, "Unauthorized player");
        require(TicTacToeBoard.getPlayer(game.board) == (game.player1 == playerAddress ? 0 : 1), "Not your turn");

        game.board = TicTacToeBoard.move(game.board, cell);
        emit BoardChanged(gameId, game.board);

        uint8 gameState = TicTacToeBoard.getState(game.board);
        if (gameState != 0) {
            finishGame(gameId, gameState);
        }
    }

    function finishGame(uint256 gameId, uint8 gameState) internal {
        Game storage game = games[gameId];
        game.isActive = false;

        if (gameState == 1) {
            // Player 1 wins
            token.transfer(game.player1, game.betAmount);
        } else if (gameState == 2) {
            // Player 2 wins
            token.transfer(game.player2, game.betAmount);
        } else {
            // It's a draw
            token.transfer(game.player1, game.betAmount / 2);
            token.transfer(game.player2, game.betAmount / 2);
        }
    }

    function getGame(uint256 gameId) external view returns (Game memory) {
        return games[gameId];
    }

    function getGameId(address player) external view returns (uint256) {
        return playerGameIds[player];
    }

    function getBoard(address player) external view returns (uint24) {
        uint256 gameId = playerGameIds[player];

        if (gameId == 0) {
            return 0xFFFFFF; // return all 1s if player is not in a game
        }

        if (player == pendingPlayer) {
            // Use 22th bit to indicate that the player is pending
            return 1 << 21;
        }

        uint24 board = games[gameId].board;

        // Use 23th bit to indicate that the player is player1 or player2
        // 0 for player1, 1 for player2
        if (player == games[gameId].player1) {
            return board; // board | (0 << 22)
        }
        if (player == games[gameId].player2) {
            return board | (1 << 22);
        }

        return 0xFFFFFF;
    }
}
