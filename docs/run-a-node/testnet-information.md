---
sidebar_position: 3
---

import OKXButton from '@site/src/components/OKXButton';
import MetaMaskButton from '@site/src/components/MetaMaskButton';

# Testnet Information
---

Welcome to Testnet-V3, where you can contribute to our network by operating various node types, including Validator, Storage, and DA (Data Availability) nodes. This page provides an overview of the testnet process and important information for participants.

### Add Testnet to Your Wallet
Choose your preferred wallet provider:

<div className="wallet-buttons">
  <MetaMaskButton label="Add to MetaMask" />
  <OKXButton label="Add to OKX Wallet" />
</div>

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
| Chain ID | 80087 |
| Token Symbol | OG |
| RPC | https://evmrpc-testnet.0g.ai |
| Storage Indexer Turbo RPC | https://indexer-storage-testnet-turbo.0g.ai |
| Chain Explorer | https://chainscan-galileo.0g.ai/ |
| Storage Explorer | https://storagescan-galileo.0g.ai/ |
| Faucet | https://faucet.0g.ai/ |

<!-- ## RPCs

**Comprehensive RPC Dashboard:** https://0g.originstake.com/rpc-api -->

## Contract Addresses

:::caution
The contract address might change during the public testnet phase, so please check this page regularly for updates. 
:::

| Component | Contract | Address |
|-----------|----------|---------|
| **0G Storage Turbo** | Flow Contract | `0x56A565685C9992BF5ACafb940ff68922980DBBC5` |
| | Mine Contract | `0xB87E0e5657C25b4e132CB6c34134C0cB8A962AD6` |
| | Market Contract | `0xf091C0e74a68Ff33d8327B2733F6e78F7BB9C827` |
| | Reward Contract | `0x233B2768332e4Bae542824c93cc5c8ad5d44517E` |
| **0G DA** | DAEntrance Contract | `0xE75A073dA5bb7b0eC622170Fd268f35E675a957B` |

Deployed Block Number: `1`

### Faucet
[Faucet](https://faucet.0g.ai/) 

See [here](https://docs.0g.ai/build-with-0g/faucet) for more info.

### Explorers

- [Chain Scan](https://chainscan-galileo.0g.ai/): Chain Scan provides a comprehensive view of 0G chain activity and transactions.
- [Storage Scan](https://storagescan-galileo.0g.ai/): Storage Scan is your go-to tool for exploring storage-related activities within the network.
- [Nodes Guru](https://testnet.0g.explorers.guru/): Nodes Guru provides key information and monitoring tools for validators and node operators to track the health and performance of the network.
  
See [here](https://docs.0g.ai/build-with-0g/explorer) for more info.