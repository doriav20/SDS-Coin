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
    event GameFinished(uint256 gameId, address winner, address loser, uint256 betAmount);
    event PlayerMoved(uint256 gameId, address player, uint8 cell);

    constructor(address _tokenAddress) {
        token = SDSToken(_tokenAddress);
    }

    function enterGame(address playerAddress) external {
        require(playerGameIds[playerAddress] == 0, "You are already in a game");
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

    function makeMove(address playerAddress, uint256 gameId, uint8 cell) external {
        Game storage game = games[gameId];
        require(game.isActive, "Game is not active");
        require(game.player1 == playerAddress || game.player2 == playerAddress, "Unauthorized player");
        require(TicTacToeBoard.getPlayer(game.board) == (game.player1 == playerAddress ? 0 : 1), "Not your turn");

        game.board = TicTacToeBoard.move(game.board, cell);
        emit PlayerMoved(gameId, playerAddress, cell);

        uint8 gameState = TicTacToeBoard.getState(game.board);
        if (gameState != 0) {
            finishGame(gameId, gameState);
        }
    }

    function finishGame(uint256 gameId, uint8 gameState) internal {
        Game storage game = games[gameId];
        game.isActive = false;
        playerGameIds[game.player1] = 0;
        playerGameIds[game.player2] = 0;

        if (gameState == 1) {
            // Player 1 wins
            token.transfer(game.player1, game.betAmount);
            emit GameFinished(gameId, game.player1, game.player2, game.betAmount);
        } else if (gameState == 2) {
            // Player 2 wins
            token.transfer(game.player2, game.betAmount);
            emit GameFinished(gameId, game.player2, game.player1, game.betAmount);
        } else {
            // It's a draw
            token.transfer(game.player1, game.betAmount / 2);
            token.transfer(game.player2, game.betAmount / 2);
            emit GameFinished(gameId, address(0), address(0), game.betAmount);
        }
    }

    function getGame(uint256 gameId) external view returns (Game memory) {
        return games[gameId];
    }

    function getGameId(address player) external view returns (uint256) {
        return playerGameIds[player];
    }
}
