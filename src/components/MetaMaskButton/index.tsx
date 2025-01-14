import React from 'react';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function MetaMaskButton(): JSX.Element {
  const getChainID = (networkId: string): string => {
    return '0x' + parseInt(networkId).toString(16);
  };

  const addNetwork = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask is not installed! Please install MetaMask first.');
      return;
    }

    const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (currentChainId === getChainID('16600')) {
      alert('0G Testnet is already added!');
      return;
    }

    const params = [{
      chainId: getChainID('16600'),
      chainName: '0G-Newton-Testnet',
      nativeCurrency: {
        name: 'A0GI',
        symbol: 'A0GI',
        decimals: 18
      },
      rpcUrls: ['https://evmrpc-testnet.0g.ai'],
      blockExplorerUrls: ['https://chainscan-newton.0g.ai/']
    }];

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params
      });
      alert('Network added successfully');
    } catch (error) {
      alert('Failed to add network');
      console.error(error);
    }
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <button
        onClick={addNetwork}
        style={{
          backgroundColor: '#1fa588',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px'
        }}>
        <img
          src="https://raw.githubusercontent.com/MetaMask/brand-resources/master/SVG/SVG_MetaMask_Icon_Color.svg"
          alt="MetaMask Fox"
          style={{ height: '18px' }}
        />
        Add 0G Testnet
      </button>
    </div>
  );
} 