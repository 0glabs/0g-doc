import React from 'react';

declare global {
  interface Window {
    okxwallet?: any;
  }
}

interface OKXButtonProps {
  label?: string;
}

export default function OKXButton({ label = "Add 0G Testnet" }: OKXButtonProps): JSX.Element {
  const getChainID = (networkId: string): string => {
    return '0x' + parseInt(networkId).toString(16);
  };

  const addNetwork = async () => {
    if (typeof window.okxwallet === 'undefined') {
      alert('OKX Wallet is not installed! Please install OKX Wallet first.');
      return;
    }

    const chainId = getChainID('16601');
    
    const currentChainId = await window.okxwallet.request({ method: 'eth_chainId' });
    if (currentChainId === chainId) {
      alert('Already connected to 0G Testnet!');
      return;
    }

    try {
      // First try to switch to the network
      console.log('Switching to 0G Testnet');
      await window.okxwallet.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }]
      });
    } catch (switchError: any) {
      // If the network is not added yet (error code 4902), add it
      if (switchError.code === 4902) {
        try {
          await window.okxwallet.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId,
              chainName: '0G-Galileo-Testnet',
              nativeCurrency: {
                name: 'OG',
                symbol: 'OG',
                decimals: 18
              },
              rpcUrls: ['https://evmrpc-testnet.0g.ai'],
              blockExplorerUrls: ['https://chainscan-galileo.0g.ai/']
            }]
          });
        } catch (addError) {
          console.log(addError);
        }
      } else {
        console.log(switchError);
      }
    }
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <button
        onClick={addNetwork}
        style={{
          backgroundColor: '#101D42', // OKX brand color
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
          src="/img/okx.svg"
          alt="OKX Wallet"
          style={{ height: '18px' }}
        />
        {label}
      </button>
    </div>
  );
}