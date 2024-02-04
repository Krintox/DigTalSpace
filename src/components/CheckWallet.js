import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const CryptoWalletList = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const connectToWallet = async () => {
      try {
        // Check if MetaMask is installed
        if (window.ethereum) {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();

          // Get the connected address
          const address = await signer.getAddress();

          // Fetch wallet information or balance using the connected address
          // For simplicity, let's assume you have a contract with a getBalance function
          const balance = await signer.getBalance();

          // Update the state with the wallet information
          setWallets([
            {
              id: 1,
              name: 'My Connected Wallet',
              currency: 'ETH',
              balance: ethers.utils.formatEther(balance),
              address,
            },
          ]);
        } else {
          console.error('MetaMask is not installed');
        }
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      } finally {
        setLoading(false);
      }
    };

    connectToWallet();
  }, []);

  return (
    <div>
      <h2>User's Crypto Wallets</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {wallets.map((wallet) => (
            <li key={wallet.id}>
              <strong>{wallet.name}</strong>
              <p>Address: {wallet.address}</p>
              <p>Currency: {wallet.currency}</p>
              <p>Balance: {wallet.balance} {wallet.currency}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CryptoWalletList;
