# Building with 0G
---
0G provides robust tools and SDKs to seamlessly integrate decentralized storage and data availability into your applications. Whether you're building decentralized applications (dApps), working on blockchain projects, or seeking efficient data storage solutions, 0G has you covered.

### Storage Integration

On the next page, you'll find a detailed guide for integrating with 0G storage using the [Storage CLI](build-with-0g/sdk.md) and SDKs. These tools allow you to easily store, retrieve, and manage data on the 0G network.

#### SDK Quick Links
<div class="nodeLinksContainer">
<a href="../build-with-0g/sdk" class="nodeLink">
    <div class="nodeLinkInner">Go SDK</div>
</a>
<a href="../build-with-0g/sdk" class="nodeLink">
    <div class="nodeLinkInner">TypeScript SDK</div>
  </a>
</div>

### Data Availability (DA) Node

The 0G Data Availability (DA) node is a crucial component of the 0G ecosystem, ensuring data availability and integrity across the network. Here's an overview of how you can leverage the DA node in your projects:

#### What is a DA Node?

A DA node is responsible for:

1. Verifying encoded blob data
2. Signing verified data
3. Storing blob data for farming
4. Participating in the network consensus

#### Key Components of the DA Node

1. **Encoder**: Processes and encodes data for efficient storage and retrieval.
2. **Verifier**: Ensures the integrity and correctness of stored data.
3. **Signer**: Cryptographically signs data to prove its authenticity.
4. **Storage**: Manages the actual storage of blob data on the node.

#### Integrating with the DA Node

To interact with the DA node, you can:

1. Use the gRPC API to submit and retrieve data
2. Leverage the provided SDKs for easier integration
3. Interact directly with the DA contracts on the 0G chain

#### Running a DA Node

If you're interested in running your own DA node:

<div>

[🖥️ DA Node Setup Guide](/docs/0g-da)

Learn how to set up and operate your own DA node, contributing to the network's resilience and earning rewards.

</div>

## Next Steps

Explore our detailed guides and documentation to start building with 0G:

- [Storage Integration Guide](build-with-0g/sdk.md)
- [DA Node API Reference](run-a-node/da.md)
- [Smart Contract Examples](run-a-node/testnet-information.md)

We're excited to see what you'll build with 0G! If you have any questions or need support, don't hesitate to reach out to our community forums or developer support channels.