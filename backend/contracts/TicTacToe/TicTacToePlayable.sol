// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./TicTacToeGame.sol";

abstract contract TicTacToePlayable {
    TicTacToeGame public ticTacToeContract;

    constructor() {
        ticTacToeContract = new TicTacToeGame(address(this));
    }

    function playTicTacToe() external {
        ticTacToeContract.enterGame(msg.sender);
    }

    function makeMove(uint8 cell) external {
        ticTacToeContract.makeMove(msg.sender, cell);
    }

    function getBoardForPlayer() external view returns (uint24) {
        return ticTacToeContract.getBoard(msg.sender);
    }
}
