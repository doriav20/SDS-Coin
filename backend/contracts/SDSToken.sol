// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { SDSTokenStandard } from "./SDSTokenStandard.sol";
import { Mintable } from "./Mintable.sol";
import { Randomizeble } from "./Randomizable.sol";
import { TicTacToeGame } from "./TicTacToe/TicTacToeGame.sol";
import { RouletteGame } from "./Roulette.sol";

contract SDSToken is SDSTokenStandard, Mintable, Randomizeble {
    TicTacToeGame public ticTacToeContract;
    RouletteGame public rouletteContract;

    constructor() {
        ticTacToeContract = new TicTacToeGame(address(this));
        rouletteContract = new RouletteGame(address(this));
        addOwner(address(ticTacToeContract));
        addOwner(address(rouletteContract));
    }

    function playTicTacToe() external {
        ticTacToeContract.enterGame(msg.sender);
    }

    function makeMove(uint8 cell) external {
        ticTacToeContract.makeMove(msg.sender, cell);
    }

    function playRoulette(uint256 amountOfRed, uint256 amountOfGreen, uint256 amountOfBlack) external {
        require(balanceOf(msg.sender) >= amountOfRed + amountOfGreen + amountOfBlack, "You don't have enough tokens");
        rouletteContract.playR(amountOfRed, amountOfGreen, amountOfBlack, msg.sender);
    }
}
