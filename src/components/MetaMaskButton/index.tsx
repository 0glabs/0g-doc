import React, { useState } from 'react';
import RemoveNewtonModal from '../RemoveNewtonModal';

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface MetaMaskButtonProps {
  label?: string;
}

export default function MetaMaskButton({ label = "Add 0G Testnet" }: MetaMaskButtonProps): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getChainID = (networkId: string): string => {
    return '0x' + parseInt(networkId).toString(16);
  };

  const addNetwork = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask is not installed! Please install MetaMask first.');
      return;
    }

    const changedToGalileo = await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: getChainID('16601') }] }).catch(async (error: any) => {
      // check if old galileo is still on the network list by try change to old galileo
      const changedToOldGalileo = await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: getChainID('80087') }] }).catch(async (error: any) => {        
      // if old galileo is not on the network list, add new galileo to the network list
      const params = [{
        chainId: getChainID('16601'),
        chainName: '0G-Galileo-Testnet',
        nativeCurrency: {
          name: 'OG',
          symbol: 'OG',
          decimals: 18
        },
        rpcUrls: ['https://evmrpc-testnet.0g.ai'],
        blockExplorerUrls: ['https://chainscan-galileo.0g.ai/']
      }];
  
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params
        }).catch((error: any) => {
          console.log(error);
        });
        return true;
      });

      if (changedToOldGalileo) {
        return false;
      }


      setIsModalOpen(true);
      
      return true;
    });

    if (changedToGalileo) {
      return false;
    }

    const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (currentChainId === getChainID('16601')) {
      alert('0G Testnet added');
      return;
    }

    
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <button
        onClick={addNetwork}
        style={{
          backgroundColor: '#E2761B', // Updated MetaMask brand color (more accurate)
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
          src="/img/metamask.svg"
          alt="MetaMask Fox"
          style={{ height: '18px' }}
        />
        {label}
      </button>
      <RemoveNewtonModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
} 