// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

abstract contract Randomizeble {
    uint256 private currRand = 0xDEADBEEF_CAFEBABE_ABADF00D_0D15EA5E;

    function generateRandomNumber() public {
        currRand = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, block.number, currRand)));
    }

    function getRandomNumber() public view returns (uint256) {
        return currRand;
    }
}
