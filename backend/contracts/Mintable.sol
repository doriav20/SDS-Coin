// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

error AlreadyMinted();

abstract contract Mintable is ERC20, Ownable {
    mapping(address => bool) private alreadyMinted;

    function mint(address to, uint256 amount) public onlyOwner {
        uint256 _amount = amount * (10 ** decimals());
        _mint(to, _amount);
    }

    function mint100() public {
        address sender = _msgSender();

        if (alreadyMinted[sender]) {
            revert AlreadyMinted();
        }

        alreadyMinted[sender] = true;
        mint(_msgSender(), 100);
    }

    function mint500(address to) public onlyOwner {
        mint(to, 500);
    }
}
