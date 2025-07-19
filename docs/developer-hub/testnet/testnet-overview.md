---
id: testnet-overview
title: Testnet Overview
sidebar_position: 1
---

import OKXButton from '@site/src/components/OKXButton';
import MetaMaskButton from '@site/src/components/MetaMaskButton';
import RemoveNewtonModal from '@site/src/components/RemoveNewtonModal';
import React, { useState } from 'react';

# 0G Testnet (Galileo)

Test your applications on 0G's infrastructure without real costs or risks.

## Network Details

| Parameters | Network Details |
|----------------|---|
| **Network Name** | 0G-Galileo-Testnet |
| **Chain ID** | 16601 |
| **Token Symbol** | OG |
| **Block Explorer** | ```https://chainscan-galileo.0g.ai``` |
| **Faucet** | https://faucet.0g.ai |


#### ✅ 3rd Party RPCs (Recommended for production)
- [QuickNode](https://www.quicknode.com/chains/0g)
- [ThirdWeb](https://thirdweb.com/0g-galileo-testnet-16601)
- [Ankr](https://www.ankr.com/rpc/0g/)



## Getting Started

### Step 1: Add Network to Wallet

export const AddNetworkSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="admonition admonition-note alert alert--warning">
        <div className="admonition-content">
          <p>
            Remove any old 0G testnet configurations before adding Galileo. 
            <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} style={{marginLeft: '5px'}}>
              Need help?
            </a>
          </p>
        </div>
      </div>

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
      margin: 16px 0;
    }
    
    @media (max-width: 768px) {
      .wallet-buttons {
        flex-direction: column;
      }
    }
  `}
</style>

### Step 2: Get Test Tokens

Visit the [0G Faucet](https://faucet.0g.ai) to receive free testnet tokens. **Daily Limit**: 0.1 OG per wallet.


### Step 3: Start Building

Choose your integration:
- [Deploy Smart Contracts](/developer-hub/building-on-0g/contracts-on-0g/deploy-contracts)
- [Use Storage SDK](/developer-hub/building-on-0g/storage/sdk)
- [Access Compute Network](/developer-hub/building-on-0g/compute-network/sdk)
- [Integrate DA Layer](/developer-hub/building-on-0g/da-integration)


### Contract Addresses

:::caution
Addresses may change during testnet.
:::

**0G Storage**
- Flow: `0xbD75117F80b4E22698D0Cd7612d92BDb8eaff628`
- Mine: `0x3A0d1d67497Ad770d6f72e7f4B8F0BAbaa2A649C`
- Market: `0x53191725d260221bBa307D8EeD6e2Be8DD265e19`
- Reward: `0xd3D4D91125D76112AE256327410Dd0414Ee08Cb4`

**0G DA**
- DAEntrance: `0xE75A073dA5bb7b0eC622170Fd268f35E675a957B`

**Deployment Block**: `326165`

## Developer Tools

### Block Explorers
- **[Chain Explorer](https://chainscan-galileo.0g.ai)**: View transactions, blocks, and smart contracts
- **[Storage Explorer](https://storagescan-galileo.0g.ai)**: Track storage operations and metrics
- **[Validator Dashboard](https://testnet.0g.explorers.guru)**: Monitor network validators

<details>
<summary>Development RPC</summary>

:::warning Development Only
This endpoint is for development purposes and should not be used in production applications.
:::

`https://evmrpc-testnet.0g.ai`

</details>

## Faucet
- Use the [official Faucet](https://faucet.0g.ai) to request tokens. Each user can receive up to 0.1 OG token per day, which is sufficient for most testing needs.

- If you require more than 0.1 OG token per day, please reach out in our vibrant [discord](https://discord.com/invite/0glabs) community to request additional tokens.
