// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import { SDSToken } from "./SDSToken.sol";
import { Randomizeble } from "./Randomizable.sol";

//import "../node_modules/hardhat/console.sol";

contract RouletteGame is Randomizeble {
    event GameResult(uint8 colorResult);
    SDSToken private token;
    //uint256 constant private middlePoint = 49;
    uint8 private chosenColor;
    uint8 private red = 0;
    uint8 private green = 1;
    uint8 private black = 2;

    constructor(address _tokenAddress) {
        token = SDSToken(_tokenAddress);
    }

    //Colors are: 0 - Red ~49% chance, 1 - Green ~1% chance, 2 - Black ~49% chance
    function playR(uint256 amount, uint8 color, address playerAddress) public {
        generateRandomNumber();
        uint256 rnd2 = (getRandomNumber() % 99) + 1; // From 1->99:)
        uint256 previousBalance = token.balanceOf(playerAddress);

        if (rnd2 < 49) {
            chosenColor = red;
        } else if (rnd2 == 49) {
            chosenColor = green;
        } else if (rnd2 > 49) {
            chosenColor = black;
        }
        if (chosenColor == color) {
            if (color == red || color == black) {
                token.mint(playerAddress, amount);
            } else if (color == green) {
                token.mint(playerAddress, amount * 49); //50X the original betting
            }
            require(previousBalance < token.balanceOf(playerAddress), "Mint Failed");
        } else {
            bool transferSuccess = token.transferFrom(playerAddress, address(this), amount); //transfer to 0 / Burn
            require(transferSuccess, "Burn Not Successfull");
        }
        emit GameResult(chosenColor);
    }

    function getResult() public view returns (uint8) {
        return chosenColor;
    }
}
