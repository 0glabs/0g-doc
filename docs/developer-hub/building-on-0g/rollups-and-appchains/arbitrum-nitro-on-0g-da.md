---
id: arbitrum-nitro-on-0g-da
title: Arbitrum Nitro on 0G DA
sidebar_position: 2
---

# Run an Arbitrum Nitro Rollup on 0G DA

Arbitrum Nitro is a high-performance Ethereum rollup that uses a new consensus mechanism called "Nitro" to achieve scalability and efficiency. 

0G DA is a high-performance data availability layer that can be used for Arbitrum Nitro to provide a cost-effective and secure solution for storing transaction data.

## Component Independence

0G DA is a fully independent component of the 0G ecosystem. When building Arbitrum Nitro rollups with 0G DA, you can:

- Use 0G DA as a standalone data availability layer without other 0G components
- Implement Arbitrum Nitro with 0G DA while maintaining full control over your execution environment
- Leverage 0G DA's security and cost-effectiveness independently
- Integrate with any other components or services as needed, without dependency requirements

### DA provider implementation
The Arbitrum Nitro code includes a DataAvailabilityProvider interface, which is utilized throughout the codebase for storing and retrieving data from various providers, including EIP-4844 blobs, Anytrust, and now 0G.

This integration adds an implementation of the DataAvailabilityProvider interface specifically for Celestia. The main functionality for posting and retrieving data is found in the das/zerogravity.go file, where the data is stored on 0G.

## GitHub repository

Find the [repository for this integration](https://github.com/0glabs/nitro) at https://github.com/0glabs/nitro.

## Prerequisites

- [0G DA Client Node](/docs/developer-hub/building-on-0g/da-integration)
- [0G DA Encoder Node](/docs/developer-hub/building-on-0g/da-integration)
- [0G Arbitrum Nitro Rollup Kit](https://github.com/0glabs/nitro)


> **WARNING:** This is a beta integration and we are working on resolving open issues.