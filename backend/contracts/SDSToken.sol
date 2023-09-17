// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { SDSTokenStandard } from "./SDSTokenStandard.sol";
import { Mintable } from "./Mintable.sol";
import { Randomizeble } from "./Randomizable.sol";
import { TicTacToePlayable } from "./TicTacToe/TicTacToePlayable.sol";

contract SDSToken is SDSTokenStandard, Mintable, Randomizeble, TicTacToePlayable {}
