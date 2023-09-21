// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import { SDSToken } from "../SDSToken.sol";
import { Randomizeble } from "../Randomizable.sol";

enum Color {
    UNKNOWN,
    RED,
    GREEN,
    BLACK
}

contract RouletteGame is Randomizeble {
    event GameResult(Color colorResult);
    SDSToken private token;
    mapping(address => Color) private lastResults;

    constructor(address _tokenAddress) {
        token = SDSToken(_tokenAddress);
    }

    // 0 - Red - Change of Winning = 18/37 = ~48.6%
    // 1 - Green - Change of Winning = 1/37 = ~2.7%
    // 2 - Black - Change of Winning = 18/37 = ~48.6%
    function playRoulette(
        uint256 amountOfRed,
        uint256 amountOfGreen,
        uint256 amountOfBlack,
        address playerAddress
    ) public {
        uint256 stakeFee = amountOfRed + amountOfGreen + amountOfBlack;
        require(token.balanceOf(playerAddress) >= stakeFee, "You don't have enough tokens");

        generateRandomNumber();
        uint256 resultingSpot = (getRandomNumber() % 37) + 1; // From 1 to 37

        bool transferSuccess = token.transferFrom(playerAddress, address(this), stakeFee); //transfer to 0 / Burn
        require(transferSuccess, "Burn Not Successful");

        Color chosenColor;
        uint256 winnings;

        if (resultingSpot < 19) {
            chosenColor = Color.RED;
            winnings = amountOfRed * 2;
        } else if (resultingSpot == 19) {
            chosenColor = Color.GREEN;
            winnings = amountOfGreen * 35;
        } else if (resultingSpot > 19) {
            chosenColor = Color.BLACK;
            winnings = amountOfBlack * 2;
        } else {
            revert("Something went wrong");
        }

        lastResults[playerAddress] = chosenColor;
        token.mint(playerAddress, winnings);

        emit GameResult(chosenColor);
    }

    function getResult(address player) public view returns (Color) {
        return lastResults[player];
    }
}
