import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MetaMaskProvider } from '@metamask/sdk-react';

const root = ReactDOM.createRoot(
  document.getElementById('root') // Remove 'as HTMLElement'
);

root.render(
  <React.StrictMode>
    <MetaMaskProvider debug={false} sdkOptions={{
      dappMetadata: {
        name: "Your Dapp Name",
        url: window.location.href,
      }
      // Other options
    }}>
      <App />
    </MetaMaskProvider>
  </React.StrictMode>
);
