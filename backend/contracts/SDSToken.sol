// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { SDSTokenStandard } from "./SDSTokenStandard.sol";
import { Mintable } from "./Mintable.sol";
import { Randomizeble } from "./Randomizable.sol";
import { TicTacToePlayable } from "./TicTacToe/TicTacToePlayable.sol";
import { RouletteGame } from "./Roulette.sol";

contract SDSToken is SDSTokenStandard, Mintable, Randomizeble, TicTacToePlayable {    
    RouletteGame public rouletteContract;

    constructor() 
    {
        rouletteContract = new RouletteGame(address(this));
        addOwner(address(ticTacToeContract));
        addOwner(address(rouletteContract));
    }
    
    function playRoulette(uint256 amountOfRed, uint256 amountOfGreen, uint256 amountOfBlack) external {
        require(balanceOf(msg.sender) >= amountOfRed + amountOfGreen + amountOfBlack, "You don't have enough tokens");
        rouletteContract.playR(amountOfRed, amountOfGreen, amountOfBlack, msg.sender);
    }
}