---
id: arbitrum-nitro-on-0g-da
title: Arbitrum Nitro on 0G DA
sidebar_position: 2
---

# Run an Arbitrum Nitro Rollup on 0G DA

Arbitrum Nitro is a high-performance Ethereum rollup that uses a new consensus mechanism called "Nitro" to achieve scalability and efficiency. 0G DA is a high-performance data availability layer that can be used for Arbitrum Nitro to provide a cost-effective and secure solution for storing transaction data.

## Overview

### DA Provider Implementation

The Arbitrum Nitro code includes a `DataAvailabilityProvider` interface, which is utilized throughout the codebase for storing and retrieving data from various providers, including EIP-4844 blobs, Anytrust, and now 0G.

This integration adds an implementation of the `DataAvailabilityProvider` interface specifically for 0G. The main functionality for posting and retrieving data is found in the `das/zerogravity.go` file, where the data is stored on 0G.

### GitHub Repository

Find the repository for this integration at: https://github.com/0glabs/nitro

## Prerequisites

Before setting up your Arbitrum Nitro rollup with 0G DA, ensure you have:

- [0G DA Client Node](../da-integration.md)
- [0G DA Encoder Node](../da-integration.md)
- [0G Arbitrum Nitro Rollup Kit](https://github.com/0glabs/nitro)

:::warning Beta Integration
This is a beta integration and we are working on resolving open issues. Please check the repository for the latest updates and known issues.
:::

## Next Steps

For detailed setup instructions and configuration:

1. **Set up DA infrastructure** → Follow the [DA integration guide](../da-integration.md)
2. **Clone the integration** → Visit the [0G Nitro repository](https://github.com/0glabs/nitro)
3. **Follow setup guide** → Check the repository README for specific deployment steps

## Support

- **Technical Issues** → [GitHub Issues](https://github.com/0glabs/nitro/issues)
- **Community Support** → [Discord](https://discord.gg/0glabs)

---

*Stay tuned for more detailed documentation as this integration matures.*