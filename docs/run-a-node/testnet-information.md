---
sidebar_position: 3
---

import OKXButton from '@site/src/components/OKXButton';
import MetaMaskButton from '@site/src/components/MetaMaskButton';

# Testnet Information
---

Welcome to Testnet-V2, where you can contribute to our network by operating various node types, including Validator, Storage, and DA (Data Availability) nodes. This page provides an overview of the testnet process and important information for participants.

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
| Chain Name | 0G-Newton-Testnet |
| Chain ID | 16600 (`zgtendermint_16600-2`) |
| Token Symbol | A0GI |
| RPC | https://evmrpc-testnet.0g.ai |
| Thirdweb | https://16600.rpc.thirdweb.com/ |
| Ankr | https://rpc.ankr.com/0g_newton |
| Storage Indexer Standard RPC | https://indexer-storage-testnet-standard.0g.ai |
| Storage Indexer Turbo RPC | https://indexer-storage-testnet-turbo.0g.ai |
| Chain Explorer | https://chainscan-newton.0g.ai/ |
| Storage Explorer | https://storagescan-newton.0g.ai/ |
| Faucet | https://faucet.0g.ai/ |

## RPCs

**Comprehensive RPC Dashboard:** https://0g.originstake.com/rpc-api

### ✅ Highly Recommended Third-party RPCs

> **For optimal performance and reliability, we strongly recommend using these trusted providers:**

- [**QuickNode**](https://www.quicknode.com/chains/0g)
- [**Thirdweb**](https://thirdweb.com/0g-newton-testnet)
- [**Ankr**](https://www.ankr.com/rpc/0g/)

### Community RPCs and Resources

| Provider | RPC Endpoint |
|----------|--------------|
| Originstake | https://0g-json-rpc-public.originstake.com |
| Validatorvn | https://0g-rpc-evm01.validatorvn.com |
| Itrocket | https://og-testnet-jsonrpc.itrocket.net |
| Zstake | https://0g-evmrpc.zstake.xyz/ |

:::caution
Do not rely on the free community endpoints listed above for production deployments. Production deployments should rely on service providers with SLAs or your own node.
:::

## Contract Addresses

:::caution
The contract address might change during the public testnet phase, so please check this page regularly for updates. 
:::

| Component | Contract | Address |
|-----------|----------|---------|
| **0G Storage Turbo** | Flow Contract | `0xbD2C3F0E65eDF5582141C35969d66e34629cC768` |
| | Mine Contract | `0x6815F41019255e00D6F34aAB8397a6Af5b6D806f` |
| | Market Contract | `0xBa697dB4e9293e6d7674045373508823A85d0798` |
| | Reward Contract | `0x51998C4d486F406a788B766d93510980ae1f9360` |
| **0G Storage Standard** | Flow Contract | `0x0460aA47b41a66694c0a73f667a1b795A5ED3556` |
| | Mine Contract | `0x1785c8683b3c527618eFfF78d876d9dCB4b70285` |
| | Market Contract | `0x20f7e27cD0FaBD87F96afC4E83A88a47E9Ce4689` |
| | Reward Contract | `0x0496D0817BD8519e0de4894Dc379D35c35275609` |
| **0G DA** | DAEntrance Contract | `0x857C0A28A8634614BB2C96039Cf4a20AFF709Aa9` |

Deployed Block Number: `595059`


### Faucet
[Faucet](https://faucet.0g.ai/) 

See [here](https://docs.0g.ai/build-with-0g/faucet) for more info.

### Explorers
- [Chain Scan](https://chainscan-newton.0g.ai/): Chain Scan provides a comprehensive view of 0G chain activity and transactions.
- [Storage Scan](https://storagescan-newton.0g.ai/): Storage Scan is your go-to tool for exploring storage-related activities within the network.
- [Nodes Guru](https://testnet.0g.explorers.guru/): Nodes Guru provides key information and monitoring tools for validators and node operators to track the health and performance of the network.
  
See [here](https://docs.0g.ai/build-with-0g/explorer) for more info.