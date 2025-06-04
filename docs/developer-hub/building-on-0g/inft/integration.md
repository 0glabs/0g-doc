---
id: integration
title: Integrating INFTs
sidebar_position: 3
description: Step-by-step guide for integrating INFTs into your applications
keywords: [INFT, integration, implementation, development, AI tokenization]
---

# Integrating INFTs Into Your Applications

This guide provides practical steps and best practices for implementing INFTs in your AI-powered applications. INFTs can be integrated independently of other 0G components or as part of a complete 0G ecosystem implementation.

## Prerequisites

Before integrating INFTs, you will need:

- Basic understanding of NFT development
- Familiarity with blockchain development concepts
- Access to the ERC-7857 contract implementation
- Development environment for Ethereum-compatible chains
- Access to a storage solution for encrypted metadata (0G Storage recommended but not required)

## Implementation Options

There are several ways to integrate INFTs depending on your specific needs:

### 1. Complete INFT Implementation

For applications requiring full control over the INFT lifecycle:

- Implement the complete ERC-7857 standard
- Set up oracle services for secure transfers
- Integrate with storage for metadata management
- Develop access control mechanisms

### 2. Using Existing INFT Contracts

For applications that need to interact with INFTs but not deploy new contracts:

- Connect to existing INFT contracts
- Implement client-side handling of metadata
- Develop user interfaces for INFT management

### 3. INFT Marketplace Integration

For platforms that facilitate buying and selling of INFTs:

- Implement transfer and ownership verification
- Develop metadata preview capabilities
- Create listing and purchasing mechanisms

## Step-by-Step Integration Guide

### Step 1: Set Up Your Environment

```bash
# Clone the reference implementation
git clone https://github.com/0glabs/0g-agent-nft.git
cd 0g-agent-nft

# Install dependencies
npm install

# Configure your environment
cp .env.example .env
# Edit .env with your specific configuration
```

### Step 2: Implement the INFT Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@0g/inft/contracts/ERC7857.sol";

contract MyAIAgent is ERC7857 {
    constructor(string memory name, string memory symbol) 
        ERC7857(name, symbol) {
    }
    
    // Additional functionality specific to your AI agent
    function createAgent(address to, bytes32 metadataRoot) 
        external 
        returns (uint256) {
        // Custom logic for creating your AI agent
        uint256 tokenId = _nextTokenId++;
        _mint(to, tokenId);
        _setMetadataRoot(tokenId, metadataRoot);
        return tokenId;
    }
}
```

### Step 3: Set Up Metadata Storage

For 0G Storage:

```javascript
import { OgStorage } from '@0g/storage-sdk';

async function storeMetadata(metadata, encryptionKey) {
  const storage = new OgStorage({
    endpoint: process.env.OG_STORAGE_ENDPOINT,
    apiKey: process.env.OG_STORAGE_API_KEY
  });
  
  // Encrypt the metadata
  const encryptedMetadata = await encryptData(metadata, encryptionKey);
  
  // Store in 0G Storage
  const cid = await storage.store(encryptedMetadata);
  
  return {
    cid,
    metadataRoot: calculateMetadataRoot(encryptedMetadata)
  };
}
```

For alternative storage:

```javascript
import { Web3Storage } from 'web3.storage';

async function storeMetadata(metadata, encryptionKey) {
  const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN });
  
  // Encrypt the metadata
  const encryptedMetadata = await encryptData(metadata, encryptionKey);
  
  // Store in alternative storage
  const file = new File([JSON.stringify(encryptedMetadata)], 'metadata.json', { type: 'application/json' });
  const cid = await client.put([file]);
  
  return {
    cid,
    metadataRoot: calculateMetadataRoot(encryptedMetadata)
  };
}
```

### Step 4: Implement Transfer Oracle

Using TEE:

```javascript
import { TeeOracleClient } from '@0g/tee-oracle-sdk';

async function setupTransferOracle() {
  const oracle = new TeeOracleClient({
    endpoint: process.env.TEE_ORACLE_ENDPOINT,
    apiKey: process.env.TEE_ORACLE_API_KEY
  });
  
  return oracle;
}

async function generateTransferProof(oracle, tokenId, fromAddress, toAddress, metadata, encryptionKey) {
  // Generate proof for secure transfer
  const proof = await oracle.generateTransferProof({
    tokenId,
    fromAddress,
    toAddress,
    metadata,
    encryptionKey
  });
  
  return proof;
}
```

Using ZKP:

```javascript
import { ZkpOracleClient } from '@0g/zkp-oracle-sdk';

async function setupTransferOracle() {
  const oracle = new ZkpOracleClient({
    endpoint: process.env.ZKP_ORACLE_ENDPOINT,
    apiKey: process.env.ZKP_ORACLE_API_KEY
  });
  
  return oracle;
}

async function generateTransferProof(oracle, tokenId, fromAddress, toAddress, oldKey, newKey) {
  // Generate proof for secure transfer
  const proof = await oracle.generateTransferProof({
    tokenId,
    fromAddress,
    toAddress,
    oldKey,
    newKey
  });
  
  return proof;
}
```

### Step 5: Client-Side Integration

```javascript
import { ethers } from 'ethers';
import { InftClient } from '@0g/inft-sdk';

async function initializeInftClient() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  
  const inftClient = new InftClient({
    contractAddress: process.env.INFT_CONTRACT_ADDRESS,
    provider,
    signer
  });
  
  return inftClient;
}

async function mintInft(client, metadata) {
  // Generate encryption key
  const encryptionKey = await client.generateEncryptionKey();
  
  // Store encrypted metadata
  const { metadataRoot } = await storeMetadata(metadata, encryptionKey);
  
  // Mint the INFT
  const tx = await client.createAgent(metadataRoot);
  const receipt = await tx.wait();
  
  // Extract tokenId from event logs
  const tokenId = client.getTokenIdFromReceipt(receipt);
  
  return {
    tokenId,
    encryptionKey
  };
}

async function transferInft(client, tokenId, toAddress, encryptionKey) {
  // Set up oracle
  const oracle = await setupTransferOracle();
  
  // Get metadata
  const metadata = await client.getMetadata(tokenId, encryptionKey);
  
  // Generate transfer proof
  const proof = await generateTransferProof(
    oracle,
    tokenId,
    await client.signer.getAddress(),
    toAddress,
    metadata,
    encryptionKey
  );
  
  // Execute transfer
  const tx = await client.transfer(toAddress, tokenId, proof);
  await tx.wait();
}
```

## Best Practices

### Security Considerations

1. **Key Management**: Implement secure key management for encryption keys
2. **Oracle Selection**: Choose oracles with appropriate security guarantees
3. **Access Control**: Implement proper access control for metadata
4. **Metadata Integrity**: Verify metadata integrity after transfers
5. **Privacy**: Ensure sensitive AI model data remains encrypted

### Performance Optimization

1. **Metadata Size**: Optimize metadata size for efficient storage and transfer
2. **Batch Operations**: Use batch operations for multiple INFTs when possible
3. **Storage Distribution**: Consider geographical distribution for metadata storage
4. **Caching**: Implement caching strategies for frequently accessed metadata
5. **Gas Optimization**: Optimize contract functions for lower gas costs

### User Experience

1. **Progressive Loading**: Implement progressive loading for large AI models
2. **Transfer Status**: Provide clear feedback during transfer processes
3. **Previews**: Offer limited previews of AI capabilities before purchase
4. **Wallet Integration**: Support multiple wallet providers
5. **Error Handling**: Implement robust error handling with clear user messaging

## Advanced Integration Features

### AI Model Execution

```javascript
async function executeAiModel(client, tokenId, encryptionKey, input) {
  // Get AI model from metadata
  const metadata = await client.getMetadata(tokenId, encryptionKey);
  const model = await loadAiModel(metadata.model);
  
  // Execute model
  const result = await model.execute(input);
  
  return result;
}
```

### Model Updating

```javascript
async function updateAiModel(client, tokenId, encryptionKey, updatedModel) {
  // Get current metadata
  const metadata = await client.getMetadata(tokenId, encryptionKey);
  
  // Update model in metadata
  metadata.model = updatedModel;
  
  // Store updated metadata
  const { metadataRoot } = await storeMetadata(metadata, encryptionKey);
  
  // Update metadata on-chain
  const proof = await generateUpdateProof(tokenId, metadataRoot);
  const tx = await client.updateMetadata(tokenId, metadataRoot, proof);
  await tx.wait();
}
```

### Usage Authorization

```javascript
async function authorizeUsage(client, tokenId, userAddress, encryptionKey, expiry) {
  // Set up oracle
  const oracle = await setupTransferOracle();
  
  // Generate usage proof
  const proof = await oracle.generateUsageProof(
    tokenId,
    await client.signer.getAddress(),
    userAddress,
    encryptionKey
  );
  
  // Authorize usage
  const tx = await client.authorizeUsage(userAddress, tokenId, proof, expiry);
  await tx.wait();
}
```

## Testing and Deployment

### Local Testing

```bash
# Start local blockchain
npx hardhat node

# Deploy contracts
npx hardhat run scripts/deploy.js --network localhost

# Run tests
npx hardhat test
```

### Testnet Deployment

```bash
# Deploy to testnet
npx hardhat run scripts/deploy.js --network goerli

# Verify contract
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS "Name" "Symbol"
```

## Additional Resources

- [Complete INFT SDK Documentation](https://docs.0g.network/developer-hub/inft-sdk)
- [INFT Contract Reference](https://github.com/0glabs/0g-agent-nft/tree/eip-7857-draft)
- [Sample Applications](https://github.com/0glabs/inft-examples)
- [Community Forum](https://forum.0g.network)

For assistance with INFT integration, join the [0G Discord community](https://discord.gg/0gLabs) or reach out to the development team through official channels.