// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { RouletteGame, Color } from "./RouletteGame.sol";

abstract contract RoulettePlayable {
    RouletteGame public rouletteContract;

    constructor() {
        rouletteContract = new RouletteGame(address(this));
    }

    function playRoulette(uint256 amountOfRed, uint256 amountOfGreen, uint256 amountOfBlack) external {
        rouletteContract.playRoulette(amountOfRed, amountOfGreen, amountOfBlack, msg.sender);
    }

    function getRouletteResultForPlayer() external view returns (Color) {
        return rouletteContract.getResult(msg.sender);
    }
}
