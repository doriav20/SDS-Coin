// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract SDSToken is ERC20, Ownable {
    uint256 public constant DAILY_REWARD = 10; // The number of tokens a user can claim per day
    uint256 public constant TRANSACTION_FEE_PERCENTAGE = 2; // 2%
    address public treasury;

    mapping(address => uint256) private _lastClaim;

    constructor() ERC20("SDSToken", "SDS") {
        treasury = _msgSender();
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        uint256 fee = calculateTransactionFee(amount);
        uint256 amountAfterFee = amount - fee;

        mint(treasury, fee); // Mint a portion of transaction fees to the treasury

        return super.transfer(to, amountAfterFee);
    }

    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        uint256 fee = calculateTransactionFee(amount);
        uint256 amountAfterFee = amount - fee;

        mint(treasury, fee); // Mint a portion of transaction fees to the treasury

        return super.transferFrom(from, to, amountAfterFee);
    }

    function claimReward() public {
        require(canClaim(msg.sender), "Reward already claimed within 24 hours");

        mint(msg.sender, DAILY_REWARD); // Mint daily reward
        _lastClaim[msg.sender] = block.timestamp; // Update the last claim time
    }

    function canClaim(address account) public view returns (bool) {
        return _lastClaim[account] + 1 days <= block.timestamp; // Check if 24 hours have passed since last claim
    }

    function calculateTransactionFee(uint256 amount) private pure returns (uint256) {
        return (amount * TRANSACTION_FEE_PERCENTAGE) / 100;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function mint500(address to) public onlyOwner {
        mint(to, 500);
    }

    function myBalance() public view returns (uint256) {
        return balanceOf(_msgSender());
    }
}
