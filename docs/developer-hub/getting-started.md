---
id: getting-started
title: Getting Started with 0G Development
sidebar_position: 1
description: A guide to getting started with building on the 0G platform
keywords: [getting started, development, quickstart, 0G, developer]
---

# Getting Started with 0G Development

Welcome to the 0G Developer Hub! This guide will help you get started with building on the 0G platform, whether you're developing applications that use a single 0G component or creating solutions that leverage the entire 0G ecosystem.

## Overview of 0G for Developers

0G provides a comprehensive set of tools and infrastructure for building decentralized AI applications. As a developer, you can choose to use any of the following components independently or in combination:

- **0G Storage**: Decentralized storage optimized for massive data loads
- **0G Compute**: Distributed AI inference and fine-tuning network
- **0G Chain**: High-performance blockchain for on-chain AI applications
- **0G DA**: Infinitely scalable data availability layer for rollups and appchains
- **INFTs**: Tokenized AI assets using the ERC-7857 standard

Each component has its own SDKs, APIs, and tools, allowing you to integrate only the parts you need for your specific application.

## Prerequisites

Before starting development with 0G, ensure you have:

- Basic understanding of blockchain development concepts
- Familiarity with JavaScript/TypeScript (for SDK usage)
- Node.js and npm installed (for most SDKs)
- Metamask or similar wallet for interacting with blockchain components (optional)
- Git for accessing example repositories

## Choose Your Path

Depending on your specific needs, you can take several paths through the 0G documentation:

### Storage Development

If you're primarily interested in decentralized storage:
1. Review the [Storage Concepts](/concepts/storage)
2. Explore the [Storage SDK](/developer-hub/building-on-0g/storage-sdk)
3. Learn about the [Storage CLI](/developer-hub/building-on-0g/storage-cli)

### AI Compute Integration

If you want to integrate AI inference or fine-tuning:
1. Review the [Compute Concepts](/concepts/compute)
2. Explore the [Compute Network Overview](/developer-hub/building-on-0g/compute-network/overview)
3. Choose between [Inference](/developer-hub/building-on-0g/compute-network/inference-provider) or [Fine-tuning](/developer-hub/building-on-0g/compute-network/fine-tuning-provider)
4. Integrate using the [Compute SDK](/developer-hub/building-on-0g/compute-network/sdk)

### AI Tokenization with INFTs

If you want to tokenize AI capabilities:
1. Review the [INFT Overview](/developer-hub/building-on-0g/inft/overview)
2. Understand the [ERC-7857 Standard](/developer-hub/building-on-0g/inft/erc7857)
3. Follow the [Integration Guide](/developer-hub/building-on-0g/inft/integration)

### Blockchain Development

If you're building smart contracts or dApps:
1. Review the [Chain Concepts](/concepts/chain)
2. Learn about [Deploying Contracts](/developer-hub/building-on-0g/contracts-on-0g/deploy-contracts)
3. Explore available [Precompiles](/developer-hub/building-on-0g/contracts-on-0g/precompiles/overview)

### Data Availability Integration

If you're working on rollups or L2 solutions:
1. Review the [DA Concepts](/concepts/da)
2. Explore the [DA Integration Guide](/developer-hub/building-on-0g/da-integration)
3. Choose your specific integration path (OP Stack, Arbitrum, etc.)

## Quick Start Examples

Here are some quick code examples to get you started with each component:

### Storage Example

```javascript
import { OgStorage } from '@0g/storage-sdk';

// Initialize the client
const storage = new OgStorage({
  endpoint: 'https://storage.0g.network',
  apiKey: 'your-api-key'
});

// Store data
async function storeData() {
  const data = new Uint8Array([...]); // Your data
  const cid = await storage.store(data);
  console.log(`Data stored with CID: ${cid}`);
  
  // Retrieve data
  const retrievedData = await storage.retrieve(cid);
}
```

### Compute Example

```javascript
import { OgCompute } from '@0g/compute-sdk';

// Initialize the client
const compute = new OgCompute({
  endpoint: 'https://compute.0g.network',
  apiKey: 'your-api-key'
});

// Run inference
async function runInference() {
  const result = await compute.inference({
    model: 'llama2-7b',
    input: 'Explain quantum computing in simple terms'
  });
  
  console.log(result.output);
}
```

### Chain Example

```javascript
import { ethers } from 'ethers';
import { OgChain } from '@0g/chain-sdk';

// Connect to 0G Chain
async function connectToChain() {
  const provider = new ethers.providers.JsonRpcProvider('https://rpc.0g.network');
  const wallet = new ethers.Wallet('your-private-key', provider);
  
  // Deploy a simple contract
  const contractFactory = new ethers.ContractFactory(
    abi,
    bytecode,
    wallet
  );
  
  const contract = await contractFactory.deploy();
  await contract.deployed();
  
  console.log(`Contract deployed at: ${contract.address}`);
}
```

## Developer Tools

0G provides several tools to help with development and testing:

- [Explorer](/developer-hub/tools/explorer) - Browse the blockchain
- [Faucet](/developer-hub/tools/faucet) - Get testnet tokens
- [Marketplace](/developer-hub/tools/marketplace) - Discover AI models and datasets

## Getting Support

If you need help with development:

- Join the [0G Discord](https://discord.gg/0gLabs)
- Check out the [GitHub repositories](https://github.com/0G-Labs)
- Browse community forums and discussions

## Next Steps

Ready to start building? Choose your development path and explore the relevant documentation sections. The modular nature of 0G allows you to integrate only the components you need, giving you flexibility in how you build your application.

Happy building!