// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract SDSToken is ERC20, Ownable {
    constructor() ERC20("SDSToken", "SDS") {}

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
}
