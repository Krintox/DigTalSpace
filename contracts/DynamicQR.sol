// contracts/DynamicQR.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DynamicQR {
    event TransactionInitiated(address indexed sender, address indexed recipient, uint256 amount);

    function initiateTransaction(address _recipient, uint256 _amount) external {
        // Example transaction logic: Transfer ETH to the recipient
        require(address(this).balance >= _amount, "Insufficient contract balance");
        payable(_recipient).transfer(_amount);

        emit TransactionInitiated(msg.sender, _recipient, _amount);
    }
}
