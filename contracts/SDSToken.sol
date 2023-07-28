// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SDSToken is ERC20,Ownable {
    constructor() ERC20("SDSToken", "SDS") {}

    // Note: this function is only for testing purposes
    function mint500(address to) public onlyOwner {
        _mint(to, 500);
    }
}
