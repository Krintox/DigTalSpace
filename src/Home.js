import React, { useState } from 'react';
import { useSDK } from '@metamask/sdk-react';

const Home = () => {
  const [account, setAccount] = useState();
  const { sdk, connected, chainId } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch(err) {
      console.warn(`Failed to connect.`, err);
    }
  };

  return (
    <div className="Home">
      <button style={{ padding: 10, margin: 10 }} onClick={connect}>
        Connect to MetaMask
      </button>
      {connected && (
        <div>
          {chainId && `Connected chain: ${chainId}`}
          <p></p>
          {account && `Connected account: ${account.substring(0, 7)}...${account.slice(-3)}`}
        </div>
      )}
    </div>
  );
};

export default Home;
