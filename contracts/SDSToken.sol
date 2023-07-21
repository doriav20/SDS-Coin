// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SDSToken is ERC20 {
    constructor() ERC20("SDSToken", "SDS") {}

    // Note: this function is only for testing purposes
    function mint500(address to) public {
        _mint(to, 500);
    }
}
