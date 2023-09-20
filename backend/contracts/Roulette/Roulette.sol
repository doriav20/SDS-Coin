// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import { SDSToken } from "../SDSToken.sol";
import { Randomizeble } from "../Randomizable.sol";

contract RouletteGame is Randomizeble {
    event GameResult(uint8 colorResult);
    SDSToken private token;
    uint8 private chosenColor;
    uint8 private red = 0;
    uint8 private green = 1;
    uint8 private black = 2;

    constructor(address _tokenAddress) {
        token = SDSToken(_tokenAddress);
    }

    //Colors are: 0 - Red 18/37% chance, 1 - Green 1/37 chance, 2 - Black 18/37 chance
    function playRoulette(
        uint256 amountOfRed,
        uint256 amountOfGreen,
        uint256 amountOfBlack,
        address playerAddress
    ) public {
        uint256 stakeFee = amountOfRed + amountOfGreen + amountOfBlack;
        require(token.balanceOf(playerAddress) >= stakeFee, "You don't have enough tokens");
        generateRandomNumber();
        uint256 resultingSpot = (getRandomNumber() % 37) + 1; // From 1->99:)
        bool transferSuccess = token.transferFrom(playerAddress, address(this), stakeFee); //transfer to 0 / Burn
        require(transferSuccess, "Burn Not Successful");
        if (resultingSpot < 19) {
            chosenColor = red;
            token.mint(playerAddress, amountOfRed * 2);
        } else if (resultingSpot == 19) {
            chosenColor = green;
            token.mint(playerAddress, amountOfGreen * 35);
        } else if (resultingSpot > 19) {
            chosenColor = black;
            token.mint(playerAddress, amountOfBlack * 2);
        }
        emit GameResult(chosenColor);
    }

    function getResult() public view returns (uint8) {
        return chosenColor;
    }
}
