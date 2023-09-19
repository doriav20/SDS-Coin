// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import { SDSToken } from "./SDSToken.sol";
import { Randomizeble } from "./Randomizable.sol";

contract RouletteGame is Randomizeble {
    event GameResult(uint8 colorResult);
    event BalanceDifferance(uint256 balDiff);
    SDSToken private token;
    uint8 private chosenColor;

    constructor(address _tokenAddress) {
        token = SDSToken(_tokenAddress);
    }

    //Colors are: 0 - Red ~49% chance, 1 - Green ~1% chance, 2 - Black ~49% chance
    function playR(uint256 amount, uint8 color, address playerAddress) public {
        generateRandomNumber();
        uint256 rnd2 = (getRandomNumber() % 99) + 1; // From 1->99:)
        if ((rnd2 < 49 && color == 0) || (rnd2 > 49 && color == 2)) {
            uint256 previousBalance = token.balanceOf(playerAddress);
            token.mint(playerAddress, amount);
            require(previousBalance != token.balanceOf(playerAddress), "Mint Failed");
            if (rnd2 < 49) {
                chosenColor = 0;
            } else {
                chosenColor = 2;
            }
        } else if ((rnd2 == 49 && color == 1)) {
            token.mint(playerAddress, amount * 49); //50X the original betting
            chosenColor = 1;
        } else if (color != chosenColor) {
            bool transferSuccess = token.transferFrom(playerAddress, address(this), amount); //transfer to 0 / Burn
            require(transferSuccess, "Burn Not Successfull");
        }
        emit GameResult(chosenColor);
    }

    function getResult() public view returns (uint8) {
        return chosenColor;
    }
}
