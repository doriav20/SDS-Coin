// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { SDSTokenStandard } from "./SDSTokenStandard.sol";
import { OneTimeCallable } from "./OneTimeCallable.sol";

abstract contract Mintable is SDSTokenStandard, OneTimeCallable {
    function mint100() public canCallOnce {
        uint256 _amount = 100 * (10 ** decimals());
        _mintSelf(_amount);
    }
}
