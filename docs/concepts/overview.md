---
id: overview
title: Overview
sidebar_position: 1
---

# Overview

Before diving into code or running nodes, let's understand the four technologies that make 0G unique. This 10-minute read will give you the foundation to build effectively on 0G.

💡 **Why read this?** Understanding these concepts will help you:
- Choose the right components for your project
- Optimize performance and costs
- Troubleshoot issues effectively

## Quick Reference

| Component | What It Does | Who Needs It | Time to Learn |
|-----------|--------------|--------------|---------------|
| [Chain](/concepts/chain) | Fast blockchain for AI | dApp builders | 8 min |
| [Compute](/concepts/compute) | Run AI models | AI developers | 7 min |
| [Storage](/concepts/storage) | Store files/data cheaply | Everyone | 5 min |
| [DA](/concepts/da) | Scale data availability | Rollup devs | 6 min |

## 🎯 Important: You Don't Need to Use Everything

:::info Flexible Integration
Most projects only use 1-2 components of 0G. That's perfectly fine! Our architecture is designed for à la carte usage.🧑‍🍳
:::

**Common Integration Patterns**:
- **Just Storage**: Many Ethereum dApps use only 0G Storage for large files
- **Compute + Your Chain**: Run AI on 0G Compute while staying on your existing chain (Ethereum, Polygon, etc.)
- **Full Stack**: Some projects use all four for maximum performance

<details>
<summary>🤔 **Still confused about modularity?**</summary>

Think of it like cloud services:
- You can use AWS S3 (storage) without EC2 (compute)
- You can use Google's AI APIs without Google Cloud Storage
- 0G works the same way - use what you need, ignore what you don't!

**Example**: A DeFi protocol on Ethereum can use only 0G Storage to store historical trading data, without touching 0G Chain or Compute.

</details>

## The Four Pillars of 0G

### ⛓️ [Chain](/concepts/chain)
**The Problem It Solves**: Current blockchains can't handle AI-scale data volumes  
**0G's Solution**: Modular blockchain built specifically for AI throughput  
**Read Time**: 8 minutes

### 🤖 [Compute](/concepts/compute)  
**The Problem It Solves**: Running AI on blockchain is impossibly slow and expensive  
**0G's Solution**: Distributed GPU network for AI inference and training  
**Read Time**: 7 minutes

### 💾 [Storage](/concepts/storage)
**The Problem It Solves**: Storing AI models on-chain costs millions in gas fees  
**0G's Solution**: 100x cheaper decentralized storage that works with any chain  
**Read Time**: 5 minutes

### 📊 [Data Availability (DA)](/concepts/da)
**The Problem It Solves**: Data bottlenecks kill rollup and blockchain performance  
**0G's Solution**: Infinitely scalable data layer for any chain  
**Read Time**: 6 minutes

## Key Design Principles

All 0G components are built with these principles in mind:

1. **Scalability First**: Every component is designed to scale horizontally without limits
2. **AI-Optimized**: Purpose-built for AI workloads, not retrofitted from general-purpose systems
3. **Modular Architecture**: Each component can be used independently or as part of the full stack
4. **Developer-Friendly**: Simple APIs and comprehensive tooling make integration straightforward
5. **Decentralized by Design**: No single points of failure or control

## How Components Work Together

While each component functions independently, they achieve maximum efficiency when combined:

- **Chain + Storage**: Smart contracts can directly access and manage stored AI models and datasets
- **Storage + Compute**: Models stored in 0G Storage can be seamlessly loaded for inference or training
- **Compute + DA**: Training results and inference outputs can be efficiently propagated across the network

## Your Learning Path

Choose your path based on your goals:

### 📚 **Full Understanding**
Read all four concepts in the order presented above to understand the basics

### 🚀 **Just Want to Build?**
Skip to the [Developer Hub](/developer-hub/getting-started) and reference concepts as needed