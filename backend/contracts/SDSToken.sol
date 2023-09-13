// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Mintable } from "./Mintable.sol";
import { Randomizeble } from "./Randomizable.sol";

contract SDSToken is ERC20, Ownable, Mintable, Randomizeble {
    constructor() ERC20("SDSToken", "SDS") {}

    function myBalance() public view returns (uint256) {
        return balanceOf(_msgSender());
    }
}
