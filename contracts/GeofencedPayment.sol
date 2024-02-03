// contracts/GeofencedPayment.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GeofencedPayment {
    mapping(address => bool) private allowedAddresses;

    event TransactionInitiated(address indexed sender, address indexed recipient, uint256 amount);

    modifier onlyAllowedAddresses() {
        require(allowedAddresses[msg.sender], "Not allowed to initiate transactions");
        _;
    }

    function allowAddress(address _address) external {
        allowedAddresses[_address] = true;
    }

    function disallowAddress(address _address) external {
        allowedAddresses[_address] = false;
    }

    function initiateTransaction(address _recipient, uint256 _amount) external onlyAllowedAddresses {
        // Example transaction logic: Transfer ETH to the recipient
        require(address(this).balance >= _amount, "Insufficient contract balance");
        payable(_recipient).transfer(_amount);

        emit TransactionInitiated(msg.sender, _recipient, _amount);
    }
}
