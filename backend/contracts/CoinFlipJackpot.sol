// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { Context } from "@openzeppelin/contracts/utils/Context.sol";
import { SDSToken } from "./SDSToken.sol";
import { Randomizeble } from "./Randomizable.sol";

contract CoinFlipJackpot is Context, Randomizeble {
    enum GameStatus {
        READY,
        IN_PROGRESS,
        COOLDOWN
    }

    SDSToken private sdsTokenContract;
    mapping(address => Player) private players;

    struct Player {
        uint8 stakedAmount;
        uint256 jackpot;
        uint8 multiplier;
        uint8 totalRounds;
        uint8 roundsPlayed;
        uint256 lastTimePlayed;
        bool inGame;
    }

    event RoundResult(address indexed player, bool prediction, bool outcome, uint256 jackpot);
    event GameEnded(address indexed player, uint256 jackpot);

    constructor(address _sdsTokenContractAddress) {
        sdsTokenContract = SDSToken(_sdsTokenContractAddress);
    }

    function stakeSDS(uint8 _stakedAmount) external {}

    function playRound(bool _prediction) external {}

    function getGameStatus() external view returns (GameStatus) {
        Player storage player = players[_msgSender()];
        if (player.inGame) {
            return GameStatus.IN_PROGRESS;
        } else if (block.timestamp - player.lastTimePlayed > 1 days) {
            return GameStatus.READY;
        } else {
            return GameStatus.COOLDOWN;
        }
    }
}
