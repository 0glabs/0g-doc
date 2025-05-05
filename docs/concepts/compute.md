---
id: compute
title: 0G Compute Network
sidebar_position: 3
description: Technical details of 0G's decentralized AI compute network
keywords: [compute, AI, inference, decentralized AI, GPU]
---

# 0G Compute Network: Decentralized Inference & Beyond

## Independent Component Architecture

0G Compute Network is a fully independent component of the 0G ecosystem. It can be used as a standalone decentralized AI computation solution without requiring adoption of other 0G components. Developers can:

- Access AI inference and fine-tuning capabilities directly via SDK
- Utilize compute resources without depending on 0G Chain or Storage
- Integrate with existing applications regardless of their storage or blockchain technology
- Build AI-powered applications with complete technology stack flexibility

This independence allows teams to leverage 0G's decentralized AI compute capabilities while maintaining their existing infrastructure.

## What is 0G Compute Network?

The 0G Compute Network is a decentralized framework that provides AI computing capabilities to our community. It forms a crucial part of deAIOS and, together with the storage network, offers comprehensive end-to-end support for dApp development and services.

The first iteration focuses specifically on decentralized settlement for inference, connecting buyers (who want to use AI models) with sellers (who run these models on their GPUs) in a trustless, transparent manner. Sellers, known as service providers, can set the price for each model they support and receive real-time rewards for their contributions. It's a fully decentralized marketplace that eliminates the need for intermediaries, redefining how AI services are accessed and delivered by making them cheaper, more efficient, and accessible to anyone, anywhere.

## How does it work?

The 0G Compute Network contract facilitates secure interactions between users (AI buyers) and service providers (GPU owners running AI models), ensuring smooth data retrieval, fee collection, and service execution. Here's how it works:

1. **Service Provider Registration:** Service providers first register the type of AI service they offer (e.g., model inference) and set pricing for each type within the smart contract.
2. **User Pre-deposits Fees:** When a user wants to access a service, they pre-deposit a fee into the smart contract associated with the selected service provider. This ensures that funds are available to compensate the service provider.
3. **Request and Response System:** Users send requests for AI inference, and the service provider decides whether to respond based on the sufficiency of the user's remaining balance. Both the user and the provider sign each request and response, ensuring trustless verification of transactions.

Here are some of the key features of the system:

- **Open Access with Fair Rewards:** Anyone with the right hardware can become a service provider and earn fair compensation for running AI models. This open-access, decentralized structure enables a global network of contributors, where providers are directly rewarded for their computational resources and services, fostering a new ecosystem of decentralized AI.
- **Optimized Efficiency:** 0G Compute Network uses a variety of different mechanisms to minimize costs and maximize performance. Service providers can batch-process multiple user requests to minimize the number of on-chain settlements, optimizing transaction costs and network efficiency. ZK-proofs are used to compress transaction data, lowering on-chain settlement costs. Additionally, to reduce the on-chain costs of storing request traces with data keys, 0G Storage allows for scalable off-chain data management, enabling more efficient storage and retrieval while keeping costs low.
- **User-Centric Design:** The platform offers a smooth user experience, with a built-in refund mechanism that ensures users can reclaim unused funds within a clearly defined time window. This process is executed by smart contracts, ensuring a reliable, secure, and frictionless process for both service providers and users.

By decentralizing both services and settlement, 0G Compute Network provides a scalable and trustless alternative to centralized AI platforms.

Over time, we aim to decentralize the entire AI workflow—from inference to data and training—by keeping everything on-chain and autonomous.

## Technical Architecture

The 0G Compute Network consists of several key components:

### Provider Network
- Distributed network of GPU providers offering inference and fine-tuning services
- Provider-controlled pricing and model support
- Decentralized discovery and matching

### Inference Layer
- High-performance model execution
- Support for various model architectures
- Trustless verification of execution

### Fine-tuning Layer
- Decentralized model adaptation
- Support for various training methodologies
- Private training capabilities

### Settlement Layer
- Trustless transaction verification
- Efficient payment distribution
- Support for batched transactions

## Integration with External Systems

0G Compute Network can be easily integrated with existing systems:

### AI Workflows
- Connect existing data pipelines to decentralized inference
- Replace centralized inference services with decentralized alternatives
- Access specialized models not available on centralized platforms

### Application Development
- Embed AI capabilities in any application
- Access GPU resources without cloud provider lock-in
- Scale resources based on demand without centralized limitations

### Model Development
- Test models in a decentralized environment
- Gather inference metrics from diverse hardware setups
- Fine-tune models on specialized hardware

## Getting Started

To start using 0G Compute Network independently:

- [Compute SDK Documentation](/developer-hub/building-on-0g/compute-network/sdk)
- [Compute CLI Guide](/developer-hub/building-on-0g/compute-network/cli)

No other 0G components are required to use these tools and integrate 0G Compute into your applications.