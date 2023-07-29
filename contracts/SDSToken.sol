// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract SDSToken is ERC20, Ownable {
    constructor() ERC20("SDSToken", "SDS") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function mint500(address to) public onlyOwner {
        mint(to, 500);
    }

    function myBalance() public view returns (uint256) {
        return balanceOf(msg.sender);
    }
}
