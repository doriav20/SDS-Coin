// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { SDSTokenStandard } from "./SDSTokenStandard.sol";
import { Mintable } from "./Mintable.sol";
import { Randomizeble } from "./Randomizable.sol";
import { TicTacToeGame } from "./TicTacToe/TicTacToeGame.sol";

contract SDSToken is SDSTokenStandard, Mintable, Randomizeble {
    TicTacToeGame public ticTacToeContract;

    constructor() {
        ticTacToeContract = new TicTacToeGame(address(this));
        addOwner(address(ticTacToeContract));
    }

    function playTicTacToe() external {
        ticTacToeContract.enterGame(msg.sender);
    }

    function makeMove(uint256 gameId, uint8 cell) external {
        ticTacToeContract.makeMove(msg.sender, gameId, cell);
    }
}
