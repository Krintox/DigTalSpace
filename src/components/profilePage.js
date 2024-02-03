// ProfilePage.js
import React, { useState } from 'react';
import { useSDK } from '@metamask/sdk-react';
import { ethers } from 'ethers';

const ProfilePage = () => {
  const [backgroundColor, setBackgroundColor] = useState('');
  const [backgroundAudio, setBackgroundAudio] = useState('');
  const [avatar, setAvatar] = useState('');
  const { sdk, connected } = useSDK();
  const contractAddress = "ferfr";
  const contractABI = ["fff"];

  const setProfile = async () => {
    try {
      if (!connected) {
        console.warn('Not connected to MetaMask');
        return;
      }

      // Get the signer from MetaMask
      const signer = sdk?.getSigner();

      // Create the contract instance
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Call the smart contract function to set the profile (assuming setBackground, setAvatar functions)
      const result = await contract.setBackground(backgroundColor, backgroundAudio);
      await contract.setAvatar(avatar);

      console.log('Profile set successfully!', result);
    } catch (err) {
      console.error('Failed to set profile', err);
    }
  };

  return (
    <div className="ProfilePage">
      <h2>Set Profile</h2>
      <label>
        Background Color:
        <input type="text" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
      </label>
      <label>
        Background Audio:
        <input type="text" value={backgroundAudio} onChange={(e) => setBackgroundAudio(e.target.value)} />
      </label>
      <label>
        Avatar:
        <input type="text" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
      </label>
      <button style={{ padding: 10, margin: 10 }} onClick={setProfile}>
        Set Profile
      </button>
    </div>
  );
};

export default ProfilePage;
