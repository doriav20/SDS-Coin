// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

library TicTacToeBoard {
    // Board state in 24 bits - only 21 bits are used
    // first 18 bits - board, each 2 bits - one cell. 00 - empty, 01 - X, 10 - O
    // next 1 bit - turn, 0 - X, 1 - O
    // next 2 bits - game state, 00 - game in progress, 01 - X won, 10 - O won, 11 - draw

    //     1. 11 11 11
    //        00 00 00
    //        00 00 00
    //     => 0b111111 = 0x3F
    uint256 internal constant HORIZONTAL_MASK = 0x3F;

    //     2. 11 00 00
    //        11 00 00
    //        11 00 00
    //     => 0b11000011000011 = 0x30C3
    uint256 internal constant VERTICAL_MASK = 0x30C3;

    //     3. 11 00 00
    //        00 11 00
    //        00 00 11
    //     => 0b110000001100000011 = 0x30303
    uint256 internal constant TL_TO_BR_DIAGONAL_MASK = 0x30303;

    //     4. 00 00 11
    //        00 11 00
    //        11 00 00
    //     => 0b11001100110000 = 0x3330
    uint256 internal constant TR_TO_BL_DIAGONAL_MASK = 0x3330;

    function generateNewGameBoard() internal pure returns (uint24) {
        // 0b000_00_0_00_00_00_00_00_00_00_00_00
        return 0;
    }

    function move(uint24 board, uint8 cell) internal pure returns (uint24) {
        // Cell is in range 0-8
        // 0 1 2
        // 3 4 5
        // 6 7 8

        uint8 player = getPlayer(board);

        // Set in board cell value for player
        board |= uint24(1) << (cell * 2 + player);

        // Change game state
        uint24 state = calcState(board);

        // Set state
        board |= state << 19;

        // Change turn
        board ^= 1 << 18;
        return board;
    }

    function getState(uint24 board) internal pure returns (uint8) {
        return uint8(board >> 19) & 3;
    }

    function calcState(uint24 board) internal pure returns (uint24) {
        uint8 player = getPlayer(board);

        if ((board & HORIZONTAL_MASK) == (HORIZONTAL_MASK / 3) << player) {
            return uint24(1 << player);
        }
        if ((board & (HORIZONTAL_MASK << 6)) == ((HORIZONTAL_MASK / 3) << player) << 6) {
            return uint24(1 << player);
        }
        if ((board & (HORIZONTAL_MASK << 12)) == ((HORIZONTAL_MASK / 3) << player) << 12) {
            return uint24(1 << player);
        }

        if ((board & VERTICAL_MASK) == (VERTICAL_MASK / 3) << player) {
            return uint24(1 << player);
        }

        if ((board & (VERTICAL_MASK << 2)) == ((VERTICAL_MASK / 3) << player) << 2) {
            return uint24(1 << player);
        }

        if ((board & (VERTICAL_MASK << 4)) == ((VERTICAL_MASK / 3) << player) << 4) {
            return uint24(1 << player);
        }

        if ((board & TL_TO_BR_DIAGONAL_MASK) == (TL_TO_BR_DIAGONAL_MASK / 3) << player) {
            return uint24(1 << player);
        }

        if ((board & TR_TO_BL_DIAGONAL_MASK) == (TR_TO_BL_DIAGONAL_MASK / 3) << player) {
            return uint24(1 << player);
        }

        // Check draw
        for (uint8 i = 0; i < 9; ) {
            if ((board & (3 << (i * 2))) == 0) {
                return 0;
            }
            unchecked {
                ++i;
            }
        }

        return 3;
    }

    function getPlayer(uint24 board) internal pure returns (uint8) {
        return uint8(board >> 18) & 1;
    }
}
