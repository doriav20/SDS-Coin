// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract SDSToken is ERC20, Ownable {
    constructor() ERC20("SDSToken", "SDS") {}

    uint256 private currRand = 0xDEADBEEF_CAFEBABE_ABADF00D_0D15EA5E;

    function mint(address to, uint256 amount) public onlyOwner {
        uint256 _amount = amount * (10 ** decimals());
        _mint(to, _amount);
    }

    function mint500(address to) public onlyOwner {
        mint(to, 500);
    }

    function myBalance() public view returns (uint256) {
        return balanceOf(_msgSender());
    }

    function generateRandomNumber() public {
        currRand = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, block.number, currRand)));
    }

    function getRandomNumber() public view returns (uint256) {
        return currRand;
    }
}
