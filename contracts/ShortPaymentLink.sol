// contracts/ShortPaymentLink.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ShortPaymentLink {
    mapping(string => address) private links;

    event LinkCreated(string link, address indexed recipient);

    function createLink(string calldata _link, address _recipient) external {
        require(links[_link] == address(0), "Link already exists");
        links[_link] = _recipient;
        emit LinkCreated(_link, _recipient);
    }

    function getRecipient(string calldata _link) external view returns (address) {
        return links[_link];
    }

    function initiateTransaction(string calldata _link, uint256 _amount) external {
        address recipient = getRecipient(_link);
        require(recipient != address(0), "Invalid link");
        
        // Example transaction logic: Transfer ETH to the recipient
        require(address(this).balance >= _amount, "Insufficient contract balance");
        payable(recipient).transfer(_amount);
    }
}
