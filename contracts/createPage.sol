// UniqueCodeGeneratorContract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UniqueCodeGeneratorContract {
    mapping(string => string) public linkNameToUniqueCode;

    function createUniqueCode(string memory linkName) external {
        // Generate a unique code (you may implement your own logic for this)
        string memory uniqueCode = generateUniqueCode(linkName);
        
        // Store the link name to unique code mapping
        linkNameToUniqueCode[linkName] = uniqueCode;
    }

    function getUniqueCode(string memory linkName) external view returns (string memory) {
        // Return the unique code for the given link name
        return linkNameToUniqueCode[linkName];
    }

    // You can implement your own logic for generating a unique code
    function generateUniqueCode(string memory linkName) internal view returns (string memory) {
        // Example: Concatenate link name with the current block number for simplicity
        return string(abi.encodePacked(linkName, block.number));
    }
}
