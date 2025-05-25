---
id: overview
title: 0G Components Overview
sidebar_position: 1
description: A high-level overview of 0G's core components and their architecture
keywords: [overview, architecture, components, integration]
---

# 0G Components Overview

0G consists of four core components that together form a complete decentralized AI operating system (deAIOS), while also functioning independently to meet diverse needs. This page provides a technical overview of each component and how they can be integrated.

## Component Architecture

<div style={{textAlign: 'center'}}>
  <img src="/img/0g-architecture.png" alt="0G Architecture" style={{maxWidth: '100%'}} />
</div>

### Independent Components

Each component of 0G is designed as a standalone system with its own architecture, protocols, and functionalities:

1. **0G Chain**: A modular blockchain optimized for high throughput and complex applications
2. **0G Storage**: A decentralized storage system supporting both structured and unstructured data
3. **0G Compute**: A distributed AI compute framework for inference and fine-tuning
4. **0G DA**: A horizontally scalable data availability layer for rollups and appchains

## Integration Patterns

These components can be used in various combinations according to specific needs:

### Standalone Usage

Each component has its own API, SDK, and integration points for standalone use:

- **0G Storage**: Direct integration via SDK for any application needing decentralized storage
- **0G Compute**: API access for AI inference and fine-tuning without other 0G dependencies
- **0G Chain**: Standard blockchain interfaces for contract deployment and transactions
- **0G DA**: Integration with any rollup or L2 solution needing data availability

### Partial Integration

Components can be combined selectively:

- **Storage + Compute**: For AI applications needing both data storage and inference
- **Chain + DA**: For appchains requiring both execution and data availability
- **Storage + Chain**: For dApps requiring on-chain logic with large data storage
- **DA + Compute**: For AI-powered rollup solutions

### Full Stack Integration

When all components are used together, they provide a seamless experience with:

- Unified authentication and access
- Optimized data flow between components
- Integrated economic incentives
- Consistent developer experience

## Technical Specifications

Each component has been built with specific technical considerations to ensure performance, security, and scalability:

### 0G Chain
- **Consensus**: Modular consensus with specialized transaction processing
- **Execution**: EVM-compatible with AI-specific optimizations
- **Throughput**: High transaction throughput for data-intensive applications

### 0G Storage
- **Architecture**: Two-layer system (Log Layer and Key-Value Layer)
- **Consensus**: Proof of Random Access (PoRA)
- **Data Structure**: Support for both structured and unstructured data

### 0G Compute
- **Inference**: Distributed AI model execution
- **Fine-tuning**: Decentralized model adaptation
- **Resource Allocation**: Dynamic compute resource management

### 0G DA
- **Scalability**: Horizontal scaling through sharding
- **Availability**: Strong data availability guarantees
- **Integration**: Supports various rollup frameworks

## System Requirements

Each component has different requirements for optimal performance:

- **Network**: High-bandwidth connections for data transfer
- **Hardware**: Varied requirements from consumer hardware (basic nodes) to specialized hardware (compute nodes)
- **Storage**: From gigabytes to petabytes depending on node type and role

## Next Steps

Explore each component in detail:

- [0G Chain](/concepts/chain) - Blockchain architecture and capabilities
- [0G Storage](/concepts/storage) - Storage system design and functionality
- [0G Compute](/concepts/compute) - AI compute framework and features
- [0G DA](/concepts/da) - Data availability layer architecture and integration