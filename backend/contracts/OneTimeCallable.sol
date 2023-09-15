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

    function hasFunctionBeenCalledOnce(string memory functionSignature) public view returns (bool) {
        bytes4 functionSig = bytes4(keccak256(abi.encodePacked(functionSignature)));
        return _hasFunctionBeenCalledOnce(msg.sender, functionSig);
    }

    function _hasFunctionBeenCalledOnce(address caller, bytes4 functionSig) private view returns (bool) {
        return _hasFunctionBeenCalled[caller][functionSig];
    }
}
