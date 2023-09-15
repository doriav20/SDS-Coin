// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { EllipticCurve } from "./EllipticCurve.sol";
import { EllipticCurveConstants } from "./EllipticCurveConstants.sol";

abstract contract Randomizeble {
    event RandomNumberGenerated(uint256 randomNumber);

    using EllipticCurve for uint256;

    uint256 private rnd = 0;
    uint256 private currentX = EllipticCurveConstants.G_X;
    uint256 private currentY = EllipticCurveConstants.G_Y;

    function generateRandomNumber() public {
        (currentX, currentY) = currentX.getNewPoint(currentY);
        rnd = uint256(keccak256(abi.encodePacked(currentX, currentY, rnd)));
        emit RandomNumberGenerated(rnd);
    }

    function getRandomNumber() public view returns (uint256) {
        return rnd;
    }
}
