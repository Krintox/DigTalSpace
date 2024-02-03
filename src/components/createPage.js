import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import CommunityContract from './contractABI.json'; // Import your contract JSON

const CreatePage = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const createPage = async () => {
    try {
      setLoading(true);

      // Connect to the Ethereum network
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Load the contract
      const contractAddress = '0xe26C4Af3d4b1aB0e7D8Db84AAb2701946ADB9Eb8'; // Replace with your contract address
      const communityContract = new ethers.Contract(contractAddress, CommunityContract, signer);

      // Call the createPage function in the smart contract
      await communityContract.createPage(content);

      // Navigate to the newly created page
      navigate(`/community/${content}`);
    } catch (error) {
      console.error('Error creating page:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Your Community Page</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPage();
        }}
      >
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating Page...' : 'Create Page'}
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
