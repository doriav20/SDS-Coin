// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

error FunctionCanOnlyBeCalledOnceByTheCaller();

abstract contract OneTimeCallable {
    mapping(address => mapping(bytes4 => bool)) public hasFunctionBeenCalled;

    modifier canCallOnce() {
        if (hasFunctionBeenCalled[msg.sender][msg.sig]) {
            revert FunctionCanOnlyBeCalledOnceByTheCaller();
        }
        _;
        hasFunctionBeenCalled[msg.sender][msg.sig] = true;
    }
}
