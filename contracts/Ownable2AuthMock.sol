// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import { Ownable2Auth } from "./Ownable2Auth.sol";

contract Ownable2AuthMock is Ownable2Auth(msg.sender) {
    uint256 private _dummyVar;

    function restricted() external onlyOwner {
        _dummyVar = 1;
    }
}
