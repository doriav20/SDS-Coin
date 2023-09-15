// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

error FunctionCanOnlyBeCalledOnceByTheCaller();

abstract contract OneTimeCallable {
    mapping(address => mapping(bytes4 => bool)) private _hasFunctionBeenCalled;

    modifier canCallOnce() {
        if (_hasFunctionBeenCalled[msg.sender][msg.sig]) {
            revert FunctionCanOnlyBeCalledOnceByTheCaller();
        }
        _;
        _hasFunctionBeenCalled[msg.sender][msg.sig] = true;
    }
}
