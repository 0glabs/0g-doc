---
id: ecosystem
title: The 0G Ecosystem
sidebar_position: 4
description: An overview of the 0G ecosystem components and how they interact
keywords: [ecosystem, components, architecture, integration]
---

# The 0G Ecosystem

The 0G ecosystem consists of four major components that work together to create a complete decentralized AI operating system (deAIOS), while also being usable independently. This page provides an overview of these components and how they can interact with each other and external systems.

## Core Components

### 0G Chain

0G Chain is a high-performance modular blockchain specifically designed for AI applications and gaming. 

**Key features:**
- Optimized for high throughput and low latency
- Support for complex smart contracts and AI integration
- Modular architecture allowing for flexible configuration
- Compatibility with Ethereum tools and infrastructure

**Independent usage:**
- Deploy contracts without using other 0G components
- Integrate with external storage and compute solutions
- Use as a foundation for your own appchains or dApps

### 0G Storage Network

0G Storage is a decentralized storage network optimized for handling the massive data requirements of AI applications.

**Key features:**
- Efficient storage of large datasets and models
- Secure and resilient data distribution
- High-speed data retrieval
- Cost-effective compared to centralized alternatives

**Independent usage:**
- Store and retrieve data from any application
- Use with non-0G blockchains or centralized applications
- Implement as a standalone storage solution

### 0G Compute Network

0G Compute provides a decentralized framework for AI inference and fine-tuning.

**Key features:**
- Distributed AI model inference
- Decentralized fine-tuning capabilities
- Efficient resource allocation
- Support for various model types and sizes

**Independent usage:**
- Run AI inference workloads without other 0G components
- Connect to existing storage systems
- Integrate with any client application

### 0G DA (Data Availability)

0G DA offers an infinitely scalable data availability layer designed for high-performance chains and rollups.

**Key features:**
- Horizontal scalability through sharding
- Optimized for rollups and Layer 2 solutions
- High throughput and low latency
- Strong data availability guarantees

**Independent usage:**
- Use as a DA layer for any rollup solution
- Integrate with alternative execution environments
- Deploy with existing blockchain infrastructure

## Component Interaction

While each component can be used independently, they are designed to work seamlessly together for enhanced functionality:

### Integration Scenarios

**Partial Integration Examples:**

1. **0G Storage + External Compute**
   - Store large datasets on 0G Storage
   - Process data using your preferred compute solution
   - Benefit from cost-effective decentralized storage while maintaining your existing compute infrastructure

2. **0G Compute + External Storage**
   - Keep your data in your current storage solution
   - Leverage 0G Compute for decentralized AI inference
   - Maintain data sovereignty while accessing decentralized compute resources

3. **0G Chain + External Infrastructure**
   - Deploy smart contracts on 0G Chain
   - Connect to external storage and compute services
   - Benefit from high-performance blockchain while using your preferred infrastructure

4. **0G DA + External Rollups**
   - Use 0G DA as the data availability layer for your rollup
   - Maintain your own execution environment
   - Scale your rollup solution with 0G's DA capabilities

**Full Stack Integration:**

When used together, the components offer enhanced features:
- Seamless data flow between storage, compute, and chain
- Integrated authentication and access control
- Optimized performance through specialized protocols
- Unified development experience

## Ecosystem Tools

The 0G ecosystem also includes several tools to support development and operation:

- **Explorer**: Blockchain explorer for 0G Chain
- **Faucet**: Tool for obtaining testnet tokens
- **Marketplace**: Platform for discovering and deploying AI models and datasets
- **SDKs and APIs**: Developer tools for integration with each component

## Getting Started

Depending on your needs, you can start with any component of the 0G ecosystem:

- For blockchain developers: [Explore 0G Chain](/concepts/chain)
- For data storage needs: [Learn about 0G Storage](/concepts/storage)
- For AI capabilities: [Discover 0G Compute](/concepts/compute)
- For rollup solutions: [Understand 0G DA](/concepts/da)

Each component has its own documentation, SDKs, and integration guides to help you get started quickly.