// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { Context } from "@openzeppelin/contracts/utils/Context.sol";
import { Randomizeble } from "./Randomizable.sol";

contract CoinFlipJackpot is Context, Randomizeble {
    enum GameStatus {
        READY,
        IN_PROGRESS,
        COOLDOWN
    }

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

    function stake(uint8 _stakedAmount) external {
        Player storage player = players[_msgSender()];

        require(!player.inGame, "Game already in progress!");
        require(block.timestamp - player.lastTimePlayed > 1 days, "You can only play once per day!");
        transferFrom(_msgSender(), address(this), _stakedAmount);

        uint8 _rounds = _stakedAmount;

        player.stakedAmount = _stakedAmount;
        player.totalRounds = _rounds;
        player.jackpot = 0;
        player.multiplier = 1;
        player.roundsPlayed = 0;
        player.lastTimePlayed = block.timestamp;
        player.inGame = true;
    }

    function playRound(bool _prediction) external {
        Player storage player = players[_msgSender()];

        require(player.inGame, "Game not in progress!");
        require(player.roundsPlayed < player.totalRounds, "All rounds played");

        generateRandomNumber();
        bool outcome = (getRandomNumber() % 2) == 0;

        if (_prediction == outcome) {
            if (player.jackpot == 0) {
                player.jackpot = 2;
            } else {
                player.jackpot *= player.multiplier;
                player.multiplier++;
            }
        } else {
            player.jackpot = 0;
            player.multiplier = 1;
        }

        player.roundsPlayed++;

        emit RoundResult(_msgSender(), _prediction, outcome, player.jackpot);

        if (player.roundsPlayed == player.totalRounds) {
            emit GameEnded(_msgSender(), player.jackpot);
            gameFinishedHandler();
        }
    }

    function gameFinishedHandler() private {
        Player storage player = players[_msgSender()];
        require(player.roundsPlayed == player.totalRounds, "Not all rounds played");

        uint256 amount = player.jackpot;
        transfer(_msgSender(), amount);

        resetPlayerData();
    }

    function resetPlayerData() private {
        Player storage player = players[_msgSender()];
        player.stakedAmount = 0;
        player.jackpot = 0;
        player.multiplier = 1;
        player.totalRounds = 0;
        player.roundsPlayed = 0;
        player.inGame = false;
    }

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
