import React, { useState } from 'react';
import { useSDK } from '@metamask/sdk-react';

const Home = () => {
  const [account, setAccount] = useState();
  const { sdk, connected, chainId, status } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
      console.log("Connected");
      console.log(status);
    } catch (err) {
      console.warn(`Failed to connect.`, err);
      console.log("Failed");
    }
  };

  const disconnect = async () => {
    try {
      await sdk?.disconnect();
      setAccount(undefined);
      console.log("Disconnected");
    } catch (err) {
      console.warn(`Failed to disconnect.`, err);
      console.log("Failed to disconnect");
    }
  };

  return (
    <div className="Home">
      {connected ? (
        <div>
          {chainId && `Connected chain: ${chainId}`}
          <p></p>
          {account && `Connected account: ${account.substring(0, 7)}...${account.slice(-3)}`}
          <button style={{ padding: 10, margin: 10 }} onClick={disconnect}>
            Disconnect
          </button>
        </div>
      ) : (
        <button style={{ padding: 10, margin: 10 }} onClick={connect}>
          Connect to MetaMask
        </button>
      )}
    </div>
  );
};

export default Home;
