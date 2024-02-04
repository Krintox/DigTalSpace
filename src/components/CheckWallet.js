import React, { useState } from 'react';

const CryptoWalletList = () => {
  const [wallets, setWallets] = useState([
    { id: 1, name: 'My Bitcoin Wallet', currency: 'BTC', balance: 1.5 },
    { id: 2, name: 'Ethereum Savings', currency: 'ETH', balance: 5.2 },
    // Add more wallet objects as needed
  ]);

  const addWallet = () => {
    const newWallet = {
      id: wallets.length + 1,
      name: 'New Wallet',
      currency: 'USD',
      balance: 0,
    };

    setWallets([...wallets, newWallet]);
  };

  return (
    <div>
      <h2>User's Crypto Wallets</h2>
      <ul>
        {wallets.map((wallet) => (
          <li key={wallet.id}>
            <strong>{wallet.name}</strong>
            <p>Currency: {wallet.currency}</p>
            <p>Balance: {wallet.balance} {wallet.currency}</p>
          </li>
        ))}
      </ul>
      <button onClick={addWallet}>Add more wallets</button>
    </div>
  );
};

export default CryptoWalletList;
