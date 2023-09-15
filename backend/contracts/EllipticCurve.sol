// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { EllipticCurveConstants } from "./EllipticCurveConstants.sol";

library EllipticCurve {
    // Curve equation: y^2 = x^3 + Ax + B mod P
    // P is the prime specifying the field over which the curve operates

    function inverseMod(uint256 a, uint256 m) internal pure returns (uint256) {
        int256 t1 = 0;
        int256 t2 = 1;
        int256 r1 = int256(m);
        int256 r2 = int256(a);
        int256 q;
        unchecked {
            while (r2 != 0) {
                q = int256(uint256(r1) / uint256(r2));
                (t1, t2) = (t2, t1 - q * t2);
                (r1, r2) = (r2, r1 - q * r2);
            }
        }
        if (t1 < 0) t1 += int256(m);
        return uint256(t1);
    }

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

    function submod(uint256 x, uint256 y, uint256 mod) private pure returns (uint256) {
        uint256 result;
        unchecked {
            result = addmod(x, mod - y, mod);
        }
        return result;
    }

    function doublePoint(uint256 x, uint256 y) internal pure returns (uint256, uint256) {
        uint256 lam;
        uint256 x2;
        uint256 y2;
        unchecked {
            lam = mulmod(
                addmod(
                    mulmod(3, mulmod(x, x, EllipticCurveConstants.P), EllipticCurveConstants.P),
                    EllipticCurveConstants.A,
                    EllipticCurveConstants.P
                ),
                inverseMod(2 * y, EllipticCurveConstants.P),
                EllipticCurveConstants.P
            );
            x2 = submod(mulmod(lam, lam, EllipticCurveConstants.P), 2 * x, EllipticCurveConstants.P);
            y2 = submod(
                mulmod(lam, submod(x, x2, EllipticCurveConstants.P), EllipticCurveConstants.P),
                y,
                EllipticCurveConstants.P
            );
        }
        return (x2, y2);
    }

    function fixPoint(uint256 x, uint256 y) internal pure returns (uint256, uint256) {
        uint8 index = uint8(addmod(x, y, 64));
        if (index == 0) return (EllipticCurveConstants.X0, EllipticCurveConstants.Y0);
        else if (index == 1) return (EllipticCurveConstants.X1, EllipticCurveConstants.Y1);
        else if (index == 2) return (EllipticCurveConstants.X2, EllipticCurveConstants.Y2);
        else if (index == 3) return (EllipticCurveConstants.X3, EllipticCurveConstants.Y3);
        else if (index == 4) return (EllipticCurveConstants.X4, EllipticCurveConstants.Y4);
        else if (index == 5) return (EllipticCurveConstants.X5, EllipticCurveConstants.Y5);
        else if (index == 6) return (EllipticCurveConstants.X6, EllipticCurveConstants.Y6);
        else if (index == 7) return (EllipticCurveConstants.X7, EllipticCurveConstants.Y7);
        else if (index == 8) return (EllipticCurveConstants.X8, EllipticCurveConstants.Y8);
        else if (index == 9) return (EllipticCurveConstants.X9, EllipticCurveConstants.Y9);
        else if (index == 10) return (EllipticCurveConstants.X10, EllipticCurveConstants.Y10);
        else if (index == 11) return (EllipticCurveConstants.X11, EllipticCurveConstants.Y11);
        else if (index == 12) return (EllipticCurveConstants.X12, EllipticCurveConstants.Y12);
        else if (index == 13) return (EllipticCurveConstants.X13, EllipticCurveConstants.Y13);
        else if (index == 14) return (EllipticCurveConstants.X14, EllipticCurveConstants.Y14);
        else if (index == 15) return (EllipticCurveConstants.X15, EllipticCurveConstants.Y15);
        else if (index == 16) return (EllipticCurveConstants.X16, EllipticCurveConstants.Y16);
        else if (index == 17) return (EllipticCurveConstants.X17, EllipticCurveConstants.Y17);
        else if (index == 18) return (EllipticCurveConstants.X18, EllipticCurveConstants.Y18);
        else if (index == 19) return (EllipticCurveConstants.X19, EllipticCurveConstants.Y19);
        else if (index == 20) return (EllipticCurveConstants.X20, EllipticCurveConstants.Y20);
        else if (index == 21) return (EllipticCurveConstants.X21, EllipticCurveConstants.Y21);
        else if (index == 22) return (EllipticCurveConstants.X22, EllipticCurveConstants.Y22);
        else if (index == 23) return (EllipticCurveConstants.X23, EllipticCurveConstants.Y23);
        else if (index == 24) return (EllipticCurveConstants.X24, EllipticCurveConstants.Y24);
        else if (index == 25) return (EllipticCurveConstants.X25, EllipticCurveConstants.Y25);
        else if (index == 26) return (EllipticCurveConstants.X26, EllipticCurveConstants.Y26);
        else if (index == 27) return (EllipticCurveConstants.X27, EllipticCurveConstants.Y27);
        else if (index == 28) return (EllipticCurveConstants.X28, EllipticCurveConstants.Y28);
        else if (index == 29) return (EllipticCurveConstants.X29, EllipticCurveConstants.Y29);
        else if (index == 30) return (EllipticCurveConstants.X30, EllipticCurveConstants.Y30);
        else if (index == 31) return (EllipticCurveConstants.X31, EllipticCurveConstants.Y31);
        else if (index == 32) return (EllipticCurveConstants.X32, EllipticCurveConstants.Y32);
        else if (index == 33) return (EllipticCurveConstants.X33, EllipticCurveConstants.Y33);
        else if (index == 34) return (EllipticCurveConstants.X34, EllipticCurveConstants.Y34);
        else if (index == 35) return (EllipticCurveConstants.X35, EllipticCurveConstants.Y35);
        else if (index == 36) return (EllipticCurveConstants.X36, EllipticCurveConstants.Y36);
        else if (index == 37) return (EllipticCurveConstants.X37, EllipticCurveConstants.Y37);
        else if (index == 38) return (EllipticCurveConstants.X38, EllipticCurveConstants.Y38);
        else if (index == 39) return (EllipticCurveConstants.X39, EllipticCurveConstants.Y39);
        else if (index == 40) return (EllipticCurveConstants.X40, EllipticCurveConstants.Y40);
        else if (index == 41) return (EllipticCurveConstants.X41, EllipticCurveConstants.Y41);
        else if (index == 42) return (EllipticCurveConstants.X42, EllipticCurveConstants.Y42);
        else if (index == 43) return (EllipticCurveConstants.X43, EllipticCurveConstants.Y43);
        else if (index == 44) return (EllipticCurveConstants.X44, EllipticCurveConstants.Y44);
        else if (index == 45) return (EllipticCurveConstants.X45, EllipticCurveConstants.Y45);
        else if (index == 46) return (EllipticCurveConstants.X46, EllipticCurveConstants.Y46);
        else if (index == 47) return (EllipticCurveConstants.X47, EllipticCurveConstants.Y47);
        else if (index == 48) return (EllipticCurveConstants.X48, EllipticCurveConstants.Y48);
        else if (index == 49) return (EllipticCurveConstants.X49, EllipticCurveConstants.Y49);
        else if (index == 50) return (EllipticCurveConstants.X50, EllipticCurveConstants.Y50);
        else if (index == 51) return (EllipticCurveConstants.X51, EllipticCurveConstants.Y51);
        else if (index == 52) return (EllipticCurveConstants.X52, EllipticCurveConstants.Y52);
        else if (index == 53) return (EllipticCurveConstants.X53, EllipticCurveConstants.Y53);
        else if (index == 54) return (EllipticCurveConstants.X54, EllipticCurveConstants.Y54);
        else if (index == 55) return (EllipticCurveConstants.X55, EllipticCurveConstants.Y55);
        else if (index == 56) return (EllipticCurveConstants.X56, EllipticCurveConstants.Y56);
        else if (index == 57) return (EllipticCurveConstants.X57, EllipticCurveConstants.Y57);
        else if (index == 58) return (EllipticCurveConstants.X58, EllipticCurveConstants.Y58);
        else if (index == 59) return (EllipticCurveConstants.X59, EllipticCurveConstants.Y59);
        else if (index == 60) return (EllipticCurveConstants.X60, EllipticCurveConstants.Y60);
        else if (index == 61) return (EllipticCurveConstants.X61, EllipticCurveConstants.Y61);
        else if (index == 62) return (EllipticCurveConstants.X62, EllipticCurveConstants.Y62);
        else if (index == 63) return (EllipticCurveConstants.X63, EllipticCurveConstants.Y63);
        else return (EllipticCurveConstants.G_X, EllipticCurveConstants.G_Y);
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
