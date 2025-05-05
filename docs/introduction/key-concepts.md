---
id: key-concepts
title: Key Concepts
sidebar_position: 2
description: Essential terminology and foundational concepts in the 0G ecosystem
keywords: [concepts, decentralized storage, data availability, AI compute, modular blockchain]
---

# Key Concepts

This page introduces essential concepts and terminology that form the foundation of the 0G ecosystem.

## Decentralized Storage

Decentralized storage distributes data across multiple network nodes rather than relying on a central server. This approach enhances data security, resilience, and accessibility by eliminating the single point of failure common in centralized systems.

0G Storage Network implements a decentralized storage solution optimized for massive data loads required by AI applications. It ensures data is securely distributed, easily retrievable, and persistently available.

## Data Availability

Data availability guarantees that data stored within the system is readily accessible and retrievable whenever required. 0G's data availability network employs erasure coding and a quorum-based attestation system to ensure data remains available even in scenarios where some nodes might fail.

The 0G DA layer is specifically designed to provide high-performance, infinitely scalable data availability services for rollups, appchains, and other Layer 2 solutions.

## AI Compute Network

An AI compute network is a system that facilitates the deployment and execution of AI models. 0G's decentralized compute network supports data retrieval, AI inference, and model training, ensuring efficient resource management for AI applications.

The 0G Compute Network allows developers to run inference and fine-tuning workloads in a decentralized environment, unlocking new possibilities for AI applications.

## Modular Blockchain

A modular blockchain is one where each layer or component is specialized for a particular function, improving scalability and flexibility. 0G Chain uses this architecture to optimize its components, allowing for independent optimization of consensus, execution, and chain storage. 

This modular architecture enables each component to be fine-tuned for its specific requirements, resulting in enhanced performance, scalability, and flexibility for decentralized AI applications.

## Component Independence

A key principle of 0G's architecture is that all components (Chain, Storage, Compute, DA) are designed to function independently. This means:

1. **Selective Adoption**: Developers can adopt individual components based on their specific needs.
2. **Integration Flexibility**: Each component can integrate with existing non-0G systems.
3. **Optional Combination**: Components can be used together for enhanced functionality but there's no requirement to use the full stack.

For example, you can use 0G Storage without deploying contracts on 0G Chain, or leverage 0G Compute while maintaining your existing storage solution.

## Infinite Horizontal Scalability

0G employs innovative sharding mechanisms across all network components to achieve infinite horizontal scalability. This approach distributes workloads across multiple nodes, allowing the network to scale by adding more nodes rather than requiring more powerful individual nodes.

This horizontal scaling capability is critical for handling the massive data and computation requirements of advanced AI applications.

## INFTs (Intelligent NFTs)

Intelligent NFTs (INFTs) are an extension of the NFT standard that embed AI capabilities directly into the token. They follow the ERC-7857 standard and enable a new class of on-chain AI applications.

INFTs allow for tokenization of AI models, agents, and capabilities, creating new possibilities for AI ownership, monetization, and interoperability.

## Decentralized AI Operating System (deAIOS)

The concept of a deAIOS (decentralized AI Operating System) represents a new paradigm in computing. Similar to how traditional operating systems manage computer resources, a deAIOS orchestrates decentralized resources (storage, compute, chain) specifically optimized for AI workloads.

0G serves as the first complete deAIOS, providing the fundamental infrastructure layer for the next generation of decentralized AI applications.