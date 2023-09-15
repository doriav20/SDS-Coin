// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { EllipticCurveConstants } from "./EllipticCurveConstants.sol";

library EllipticCurve {
    // Curve equation: y^2 = x^3 + Ax + B mod P
    // P is the prime specifying the field over which the curve operates

    function isOnCurve(uint256 x, uint256 y) internal pure returns (bool) {
        uint256 lhs = mulmod(y, y, EllipticCurveConstants.P);
        uint256 rhs = addmod(
            addmod(
                mulmod(x, mulmod(x, x, EllipticCurveConstants.P), EllipticCurveConstants.P),
                mulmod(EllipticCurveConstants.A, x, EllipticCurveConstants.P),
                EllipticCurveConstants.P
            ),
            EllipticCurveConstants.B,
            EllipticCurveConstants.P
        );
        return lhs == rhs;
    }

    function doublePoint(uint256 x, uint256 y) internal pure returns (uint256, uint256) {
        return (EllipticCurveConstants.Gx, EllipticCurveConstants.Gy);
    }

    function fixPoint(uint256 x, uint256 y) internal pure returns (uint256, uint256) {
        uint8 index = uint8(addmod(x, y, 64));
        if (index == 0) return (EllipticCurveConstants.x0, EllipticCurveConstants.y0);
        else if (index == 1) return (EllipticCurveConstants.x1, EllipticCurveConstants.y1);
        else if (index == 2) return (EllipticCurveConstants.x2, EllipticCurveConstants.y2);
        else if (index == 3) return (EllipticCurveConstants.x3, EllipticCurveConstants.y3);
        else if (index == 4) return (EllipticCurveConstants.x4, EllipticCurveConstants.y4);
        else if (index == 5) return (EllipticCurveConstants.x5, EllipticCurveConstants.y5);
        else if (index == 6) return (EllipticCurveConstants.x6, EllipticCurveConstants.y6);
        else if (index == 7) return (EllipticCurveConstants.x7, EllipticCurveConstants.y7);
        else if (index == 8) return (EllipticCurveConstants.x8, EllipticCurveConstants.y8);
        else if (index == 9) return (EllipticCurveConstants.x9, EllipticCurveConstants.y9);
        else if (index == 10) return (EllipticCurveConstants.x10, EllipticCurveConstants.y10);
        else if (index == 11) return (EllipticCurveConstants.x11, EllipticCurveConstants.y11);
        else if (index == 12) return (EllipticCurveConstants.x12, EllipticCurveConstants.y12);
        else if (index == 13) return (EllipticCurveConstants.x13, EllipticCurveConstants.y13);
        else if (index == 14) return (EllipticCurveConstants.x14, EllipticCurveConstants.y14);
        else if (index == 15) return (EllipticCurveConstants.x15, EllipticCurveConstants.y15);
        else if (index == 16) return (EllipticCurveConstants.x16, EllipticCurveConstants.y16);
        else if (index == 17) return (EllipticCurveConstants.x17, EllipticCurveConstants.y17);
        else if (index == 18) return (EllipticCurveConstants.x18, EllipticCurveConstants.y18);
        else if (index == 19) return (EllipticCurveConstants.x19, EllipticCurveConstants.y19);
        else if (index == 20) return (EllipticCurveConstants.x20, EllipticCurveConstants.y20);
        else if (index == 21) return (EllipticCurveConstants.x21, EllipticCurveConstants.y21);
        else if (index == 22) return (EllipticCurveConstants.x22, EllipticCurveConstants.y22);
        else if (index == 23) return (EllipticCurveConstants.x23, EllipticCurveConstants.y23);
        else if (index == 24) return (EllipticCurveConstants.x24, EllipticCurveConstants.y24);
        else if (index == 25) return (EllipticCurveConstants.x25, EllipticCurveConstants.y25);
        else if (index == 26) return (EllipticCurveConstants.x26, EllipticCurveConstants.y26);
        else if (index == 27) return (EllipticCurveConstants.x27, EllipticCurveConstants.y27);
        else if (index == 28) return (EllipticCurveConstants.x28, EllipticCurveConstants.y28);
        else if (index == 29) return (EllipticCurveConstants.x29, EllipticCurveConstants.y29);
        else if (index == 30) return (EllipticCurveConstants.x30, EllipticCurveConstants.y30);
        else if (index == 31) return (EllipticCurveConstants.x31, EllipticCurveConstants.y31);
        else if (index == 32) return (EllipticCurveConstants.x32, EllipticCurveConstants.y32);
        else if (index == 33) return (EllipticCurveConstants.x33, EllipticCurveConstants.y33);
        else if (index == 34) return (EllipticCurveConstants.x34, EllipticCurveConstants.y34);
        else if (index == 35) return (EllipticCurveConstants.x35, EllipticCurveConstants.y35);
        else if (index == 36) return (EllipticCurveConstants.x36, EllipticCurveConstants.y36);
        else if (index == 37) return (EllipticCurveConstants.x37, EllipticCurveConstants.y37);
        else if (index == 38) return (EllipticCurveConstants.x38, EllipticCurveConstants.y38);
        else if (index == 39) return (EllipticCurveConstants.x39, EllipticCurveConstants.y39);
        else if (index == 40) return (EllipticCurveConstants.x40, EllipticCurveConstants.y40);
        else if (index == 41) return (EllipticCurveConstants.x41, EllipticCurveConstants.y41);
        else if (index == 42) return (EllipticCurveConstants.x42, EllipticCurveConstants.y42);
        else if (index == 43) return (EllipticCurveConstants.x43, EllipticCurveConstants.y43);
        else if (index == 44) return (EllipticCurveConstants.x44, EllipticCurveConstants.y44);
        else if (index == 45) return (EllipticCurveConstants.x45, EllipticCurveConstants.y45);
        else if (index == 46) return (EllipticCurveConstants.x46, EllipticCurveConstants.y46);
        else if (index == 47) return (EllipticCurveConstants.x47, EllipticCurveConstants.y47);
        else if (index == 48) return (EllipticCurveConstants.x48, EllipticCurveConstants.y48);
        else if (index == 49) return (EllipticCurveConstants.x49, EllipticCurveConstants.y49);
        else if (index == 50) return (EllipticCurveConstants.x50, EllipticCurveConstants.y50);
        else if (index == 51) return (EllipticCurveConstants.x51, EllipticCurveConstants.y51);
        else if (index == 52) return (EllipticCurveConstants.x52, EllipticCurveConstants.y52);
        else if (index == 53) return (EllipticCurveConstants.x53, EllipticCurveConstants.y53);
        else if (index == 54) return (EllipticCurveConstants.x54, EllipticCurveConstants.y54);
        else if (index == 55) return (EllipticCurveConstants.x55, EllipticCurveConstants.y55);
        else if (index == 56) return (EllipticCurveConstants.x56, EllipticCurveConstants.y56);
        else if (index == 57) return (EllipticCurveConstants.x57, EllipticCurveConstants.y57);
        else if (index == 58) return (EllipticCurveConstants.x58, EllipticCurveConstants.y58);
        else if (index == 59) return (EllipticCurveConstants.x59, EllipticCurveConstants.y59);
        else if (index == 60) return (EllipticCurveConstants.x60, EllipticCurveConstants.y60);
        else if (index == 61) return (EllipticCurveConstants.x61, EllipticCurveConstants.y61);
        else if (index == 62) return (EllipticCurveConstants.x62, EllipticCurveConstants.y62);
        else if (index == 63) return (EllipticCurveConstants.x63, EllipticCurveConstants.y63);
        else return (EllipticCurveConstants.Gx, EllipticCurveConstants.Gy);
    }

    function getNewPoint(uint256 x, uint256 y) internal pure returns (uint256, uint256) {
        uint256 y2;
        uint256 x2;
        (x2, y2) = doublePoint(x, y);
        if (!isOnCurve(x2, y2)) {
            return fixPoint(x2, y2);
        }
        return (x2, y2);
    }
}
