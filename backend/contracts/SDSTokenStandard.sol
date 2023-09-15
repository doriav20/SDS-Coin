// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

error OnlyOwnerCanCallThisFunction();

contract SDSTokenStandard {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Mint(address indexed to, uint256 amount);

    address private _owner;

    mapping(address => uint256) private _balances;
    uint256 private _totalSupply;

    constructor() {
        _owner = msg.sender;
    }

    function name() public view returns (string memory) {
        return "SDSToken";
    }

    function symbol() public view returns (string memory) {
        return "SDS";
    }

    function decimals() public view returns (uint8) {
        return 18;
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    modifier onlyOwner() {
        if (msg.sender != _owner) {
            revert OnlyOwnerCanCallThisFunction();
        }
        _;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function myBalance() public view returns (uint256) {
        return balanceOf(msg.sender);
    }

    function transfer(address to, uint256 amount) public returns (bool) {
        address sender = msg.sender;
        _transfer(sender, to, amount);
        return true;
    }

    function _transfer(address from, address to, uint256 amount) internal {
        require(from != address(0), "Cannot transfer from the zero address");
        require(to != address(0), "Cannot transfer to the zero address");

        uint256 fromBalance = _balances[from];
        require(fromBalance >= amount, "Sender does not have enough SDS tokens");
        unchecked {
            _balances[from] = fromBalance - amount;
            _balances[to] += amount;
        }

        emit Transfer(from, to, amount);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        uint256 _amount = amount * (10 ** decimals());
        _mint(to, _amount);
    }

    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "Cannot mint to the zero address");

        _totalSupply += amount;
        unchecked {
            _balances[account] += amount;
        }

        emit Mint(account, amount);
    }

    function mintSelf(uint256 amount) public onlyOwner {
        uint256 _amount = amount * (10 ** decimals());
        _mintSelf(_amount);
    }

    function _mintSelf(uint256 amount) internal {
        _mint(msg.sender, amount);
    }
}
