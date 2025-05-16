---
id: introduction
title: Building on 0G
sidebar_position: 1
description: Introduction to building applications and services on the 0G platform
keywords: [development, integration, building, 0G, components]
---

# Building on 0G

0G provides a modular ecosystem of components that developers can use independently or in combination to build powerful decentralized AI applications. This section provides comprehensive guides for integrating with each component of the 0G platform.

## Component Independence

A key advantage of the 0G platform is that each component is designed to function independently. You can:

- Use 0G Storage without deploying contracts on 0G Chain
- Leverage 0G Compute while using your own storage solution
- Build on 0G Chain without using other 0G components
- Integrate 0G DA with any rollup framework

This modularity gives you the flexibility to adopt only the components that meet your specific needs, while maintaining compatibility with your existing technology stack.

## Start Building

### 0G Chain
- [Deploy Smart Contracts](./contracts-on-0g/deploy-contracts)
- [Utilize precompiled contracts](./contracts-on-0g/precompiles/overview)

### 0G Compute
- [Set up as a Service Provider](./compute-network/inference-provider)
- [Use the Compute SDK](./compute-network/sdk)

### 0G Storage
- [Storage SDK Integration](./storage/sdk)
- [Storage CLI Usage](./storage/cli)

### 0G Data Availability
- [DA Integration Guide](./da-integration)
- [Build Rollups](./rollups-and-appchains/arbitrum-nitro-on-0g-da)

### INFTs
- [Implement Tokenized AI](./inft/overview)
- [ERC-7857 Standard](./inft/erc7857)
- [Integration Guide](./inft/integration)

## Integration Patterns

Depending on your application needs, you might consider these common integration patterns:

### Standalone Component Integration

Use a single 0G component as part of your existing technology stack:

- **Storage-Only**: Use 0G Storage SDK to store and retrieve data from any application
- **Compute-Only**: Access AI inference capabilities while maintaining your existing data storage
- **Chain-Only**: Deploy smart contracts on 0G Chain while using external services for other needs
- **DA-Only**: Use 0G DA as the data availability layer for your rollup solution

### Multi-Component Integration

Combine multiple 0G components to create more powerful applications:

- **Storage + Compute**: Store large datasets and run AI inference on them
- **Chain + Storage**: Deploy contracts that interact with decentralized storage
- **Compute + INFT**: Create tokenized AI capabilities with execution rights
- **DA + Chain**: Build scaling solutions with secure data availability

### Full-Stack Integration

For comprehensive deAI applications, leverage the entire 0G ecosystem:

- **AI-Powered dApps**: Combine all components for full-featured AI applications
- **Decentralized AI Platforms**: Build platforms that offer AI capabilities to users
- **Data Marketplaces**: Create markets for AI models and datasets

## Community Projects

Explore our growing ecosystem of DeAI applications in the [awesome-0g](https://github.com/0glabs/awesome-0g) repository, which showcases community projects, tools, and resources built on 0G.

## Developer Support

If you need assistance while building on 0G:

- Join the [0G Discord community](https://discord.gg/0gLabs)
- Explore sample code in our [GitHub repositories](https://github.com/0G-Labs)
- Refer to the [API Reference Documentation](https://docs.0g.network/api)