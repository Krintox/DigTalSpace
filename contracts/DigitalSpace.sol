// contracts/DigitalSpace.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DigitalSpace {
    mapping(address => mapping(address => bool)) private allowedUsers;

    event TransactionInitiated(address indexed sender, address indexed recipient, uint256 amount);

    modifier onlyAllowedUsers(address _recipient) {
        require(allowedUsers[msg.sender][_recipient], "Not allowed to initiate transactions with this user");
        _;
    }

    function allowUser(address _recipient) external {
        allowedUsers[msg.sender][_recipient] = true;
    }

    function disallowUser(address _recipient) external {
        allowedUsers[msg.sender][_recipient] = false;
    }

    function initiateTransaction(address _recipient, uint256 _amount) external onlyAllowedUsers(_recipient) {
        // Example transaction logic: Transfer ETH to the recipient
        require(address(this).balance >= _amount, "Insufficient contract balance");
        payable(_recipient).transfer(_amount);

        emit TransactionInitiated(msg.sender, _recipient, _amount);
    }
}
