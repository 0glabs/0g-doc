---
sidebar_position: 3
---

import OKXButton from '@site/src/components/OKXButton';
import MetaMaskButton from '@site/src/components/MetaMaskButton';
import RemoveNewtonModal from '@site/src/components/RemoveNewtonModal';
import React, { useState } from 'react';

# Testnet Information
---

Welcome to Testnet-V3, where you can contribute to our network by operating various node types, including Validator, Storage, and DA (Data Availability) nodes. This page provides an overview of the testnet process and important information for participants.

### Add Testnet to Your Wallet

export const AddNetworkSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="admonition admonition-note alert alert--info">
        <div className="admonition-heading">
          <h5>
            Note
          </h5>
        </div>
        <div className="admonition-content">
          <p>
            Before adding the 0G-Galileo testnet, please ensure you remove any old testnet configurations from your wallet to avoid conflicts. -
            <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} style={{marginLeft: '5px'}}>
              Need help?
            </a>
          </p>
        </div>
      </div>

      Choose your preferred wallet provider:

      <div className="wallet-buttons">
        <MetaMaskButton label="Add to MetaMask" />
        <OKXButton label="Add to OKX Wallet" />
      </div>

      <RemoveNewtonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

<AddNetworkSection />

<style>
  {`
    .wallet-buttons {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
    }
    
    @media (max-width: 768px) {
      .wallet-buttons {
        flex-direction: column;
      }
    }
  `}
</style>

## 0G Testnet Configuration

Summary Table
| Detail | Value |
|-------|-------|
| Chain Name | 0G-Galileo-Testnet |
| Chain ID | 16601 |
| Token Symbol | OG |
| RPC | https://evmrpc-testnet.0g.ai |
| Storage Indexer Turbo RPC | https://indexer-storage-testnet-turbo.0g.ai |
| Chain Explorer | https://chainscan-galileo.0g.ai/ |
| Storage Explorer | https://storagescan-galileo.0g.ai/ |
| Faucet | https://faucet.0g.ai/ |


## RPCs

### ✅ 3rd Party RPCs (Recommended)

- [QuikNode](https://www.quicknode.com/chains/0g) 
- [ThirdWeb](https://thirdweb.com/0g-galileo-testnet-16601)


## Contract Addresses

:::caution
The contract address might change during the public testnet phase, so please check this page regularly for updates. 
:::

| Component | Contract | Address |
|-----------|----------|---------|
| **0G Storage Turbo** | Flow Contract | `0xbD75117F80b4E22698D0Cd7612d92BDb8eaff628` |
| | Mine Contract | `0x3A0d1d67497Ad770d6f72e7f4B8F0BAbaa2A649C` |
| | Market Contract | `0x53191725d260221bBa307D8EeD6e2Be8DD265e19` |
| | Reward Contract | `0xd3D4D91125D76112AE256327410Dd0414Ee08Cb4` |
| **0G DA** | DAEntrance Contract | `0xE75A073dA5bb7b0eC622170Fd268f35E675a957B` |

Deployed Block Number: `326165`

### Faucet
[Faucet](https://faucet.0g.ai/) 

See [here](https://docs.0g.ai/build-with-0g/faucet) for more info.

### Explorers

- [Chain Scan](https://chainscan-galileo.0g.ai/): Chain Scan provides a comprehensive view of 0G chain activity and transactions.
- [Storage Scan](https://storagescan-galileo.0g.ai/): Storage Scan is your go-to tool for exploring storage-related activities within the network.
- [Nodes Guru](https://testnet.0g.explorers.guru/): Nodes Guru provides key information and monitoring tools for validators and node operators to track the health and performance of the network.
  
See [here](https://docs.0g.ai/build-with-0g/explorer) for more info.