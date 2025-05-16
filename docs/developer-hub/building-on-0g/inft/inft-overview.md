---
id: inft-overview
title: INFTs Overview
sidebar_position: 1
description: Tokenizing AI Agents with Intelligent Non-Fungible Tokens (INFTs)
keywords: [INFT, AI, tokenization, ERC-7857, agents, NFT]
---

# INFTs: Tokenizing AI Agents

The rapid growth of AI agents necessitates new methods for managing their ownership, transfer, and capabilities within Web3 ecosystems. INFTs (Intelligent Non-Fungible Tokens) represent a significant advancement in this space, enabling the tokenization of AI agents to provide transferability, decentralized control, full asset ownership, and royalty potential.

## What are INFTs?

INFTs are a new token standard specifically designed for AI assets. Unlike traditional NFTs that primarily represent digital art or collectibles, INFTs are designed to securely contain and transfer the "intelligence" of AI agents - including models, weights, parameters, and learned information.

Key characteristics of INFTs include:

- **Secure encapsulation of AI capabilities**: INFTs contain both the ownership rights and the actual operational capabilities of AI agents
- **Privacy-preserving metadata**: Sensitive AI models and data can be encrypted and protected
- **Secure transferability**: Both ownership and functional capabilities transfer together
- **Dynamic updating**: Support for evolving AI models that learn and improve over time
- **Composability**: Ability to combine or extend AI capabilities across tokens

## Why INFTs Matter

INFTs solve several critical challenges in the AI and blockchain space:

### 1. Ownership of AI Assets

As AI becomes more valuable, clearly establishing ownership rights becomes essential. INFTs provide cryptographic proof of ownership for AI models, agents, and their capabilities.

### 2. Commercialization of AI

INFTs create new economic models for AI, allowing creators to:
- Sell trained AI models and agents
- License AI capabilities
- Collect royalties on AI usage and derivatives
- Create AI agent marketplaces

### 3. Privacy and Security

INFTs implement security measures that protect:
- Proprietary AI models
- Training methods and parameters
- User data used or contained by the AI
- Access control to AI capabilities

### 4. Interoperability

INFTs establish a standard way for AI agents to be:
- Transferred between platforms
- Composed with other AI capabilities
- Integrated into various applications
- Recognized across the broader Web3 ecosystem

## Challenges with Existing NFT Standards

Traditional NFT standards like ERC-721 and ERC-1155 have significant limitations when applied to AI agents, particularly concerning the handling of their unique and often sensitive "intelligence" or metadata:

- **Static and Public Metadata:** Existing standards typically link to static, publicly accessible metadata (e.g., a URI pointing to a JSON file). AI agents, however, require dynamic metadata that reflects their learning and evolution, and this data often needs privacy protection.
- **Insecure Metadata Transfer:** When transferring an ERC-721 token, only the ownership identifier moves—not the underlying metadata. For AI agents, this means the new owner might receive an incomplete or non-functional agent.
- **Lack of Native Encryption/Privacy:** Current standards don't inherently support the encryption needed to protect proprietary AI models or sensitive user data contained within an agent's metadata.

## Applications and Use Cases

The ability to securely tokenize and transfer AI agents opens up numerous possibilities:

- **AI Agent Marketplaces:** Platforms for buying and selling trained AI agents, with guaranteed secure transfer of their capabilities.
- **Personalized Automation:** Owning and trading INFTs tailored for specific tasks (e.g., DeFi operations, airdrop claiming).
- **Enterprise AI Solutions:** Building, owning, and securely transferring or leasing proprietary AI agents for internal or client use.
- **AI-as-a-Service (AIaaS):** Tokenizing and leasing AI agents on subscription models.
- **Agent Collaboration:** Combining or composing different INFT agents to create more powerful tools.
- **Intellectual Property Monetization:** Allowing AI developers to monetize their models as NFTs while controlling usage.

## Integration with 0G Infrastructure

INFTs leverage the 0G ecosystem in several key ways:

- **0G Storage:** Provides the secure, decentralized storage layer required for encrypted metadata, ensuring it remains accessible only to legitimate owners.
- **0G DA (Data Availability):** Guarantees the verified availability of metadata proofs necessary for the transfer verification process.
- **0G Chain:** Enables fast, scalable execution of INFT operations at lower cost than existing solutions.
- **0G Compute Network:** Can be utilized by INFTs for performing secure inferences, enabling AI agents to execute tasks without exposing their underlying model.

While INFTs work seamlessly with the complete 0G stack, **each component can be used independently**. For example, you can:
- Use INFTs with 0G Storage without using 0G Chain
- Deploy INFTs on 0G Chain without using other 0G components
- Combine INFTs with 0G Compute while using alternative storage solutions

## Getting Started

To start working with INFTs:

- Learn about the [ERC-7857 standard](/developer-hub/building-on-0g/inft/erc7857) that powers INFTs
- Explore the [integration guide](/developer-hub/building-on-0g/inft/integration) for implementing INFTs in your applications
- Reference our [GitHub repository](https://github.com/0glabs/0g-agent-nft/tree/eip-7857-draft) for sample implementations and examples