// CreatePage.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const navigate = useNavigate();
  const [linkName, setLinkName] = useState('');
  const [loading, setLoading] = useState(false);

  const createUniqueCode = async () => {
    try {
      setLoading(true);

      // Connect to the Ethereum network
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Load the contract
      const contractAddress = '0xe4EAb0d6E3Ac0685708342eCafb58C0Fc03c91cC'; // Replace with your contract address
	  const UniqueCodeGeneratorContract = [
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "linkName",
					"type": "string"
				}
			],
			"name": "createUniqueCode",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "linkName",
					"type": "string"
				}
			],
			"name": "getUniqueCode",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"name": "linkNameToUniqueCode",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	];
      const uniqueCodeGeneratorContract = new ethers.Contract(
        contractAddress,
        UniqueCodeGeneratorContract,
        signer
      );

      // Call the createUniqueCode function in the smart contract
      await uniqueCodeGeneratorContract.createUniqueCode(linkName);

      // Get the unique code for the created link
      const uniqueCode = await uniqueCodeGeneratorContract.getUniqueCode(linkName);

      // Redirect to the newly created link with the unique code
      navigate(`/digitalspace/${uniqueCode}`);
    } catch (error) {
      console.error('Error creating unique code:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Your Digital Space</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createUniqueCode();
        }}
      >
        <label>
          Link Name:
          <input
            type="text"
            value={linkName}
            onChange={(e) => setLinkName(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating Link...' : 'Create Link'}
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
