// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { CoinFlipJackpot } from "./CoinFlipJackpot.sol";

contract CoinFlipJackpotPlayable {
    CoinFlipJackpot internal coinFlipJackpotContract;

    constructor() {
        coinFlipJackpotContract = new CoinFlipJackpot(address(this));
    }

    function coinFlipJackpotStakeSDS(uint8 _stakedAmount) external {
        coinFlipJackpotContract.stakeSDS(_stakedAmount);
    }

    function coinFlipJackpotPlayRound(bool _prediction) external {
        coinFlipJackpotContract.playRound(_prediction);
    }
}
