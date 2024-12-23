---
sidebar_position: 1
---

# Overview
---
Want to become an active participant in the 0G network and earn rewards while you're at it? 👇

Each node type plays a crucial role in maintaining the 0G network's functionality, from transaction validation and data storage to ensuring data availability and retrieval. Here, we'll introduce you to the various types of nodes you can run, each contributing to the network's health and security.

### What Nodes Can I Run?

##### **Validator Nodes**
The guardians of the network, validator nodes are responsible for verifying transactions, ensuring consensus, and maintaining the blockchain. They're essential for keeping the 0G blockchain secure and running smoothly.

##### **Storage Nodes**
Unlike Validator Nodes that focus on securing the blockchain itself, Storage Nodes focus on managing and serving data. They are the backbone of the network's data storage capabilities, ensuring persistence and availability for long-term data storage (e.g., training datasets, large AI models). By running a storage node, you'll contribute to the decentralized storage of 0G data, making it accessible and resilient.

##### **Data Availability Services**
DA Nodes are similar to Storage Nodes but focus on immediacy and short-term accessibility to support real-time operations. This data is typically used by Layer 2 and rollup solutions for data availability and is not typically stored long-term. Think of these nodes as the network's librarians, ensuring that data can be quickly retrieved when needed.

### Why Run a Node?

Running a node isn't just about supporting the network; it's also a way to earn rewards for your contribution. By actively participating in the 0G ecosystem, you'll be eligible to receive rewards that incentivize your efforts.

#### Ready to Dive In?

We've made it easy to get started. The table below outlines the hardware requirements for each type of node, so you can choose the one that best suits your setup. Once you're ready, head over to the 0G documentation for detailed instructions on how to set up and run your chosen node.

| Node Type | Description | Memory | CPU | Disk | Bandwidth |
|-----------|-------------|--------|-----|------|-----------|
| Validator Node | Validates transactions and maintains network consensus | 64 GB | 8 cores | 1 TB NVME SSD (4 TB on Testnet) | 100 MBps |
| Storage Node | Stores data within the 0g network | 16 GB | 4 cores | 500GB / 1T NVME SSD | 500 MBps |
| Storage KV | Handles key-value storage operations | 4 GB | 2 cores | Matches KV streams size | - |
| DA Node | Performs blob data verification, signing, and storage | 16 GB | 8 cores | 1 TB NVME SSD | 100 MBps |
| DA Retriever | Retrieves data availability information | 8 GB | 2 cores | - | 100 MBps |
| DA Encoder* | Encodes data for availability purposes | - | - | - | - |
| DA Client | Interacts with the Data Availability layer | 8 GB | 2 cores | - | 100 MBps |

*Note: For DA Encoder, GPU support is currently tested with NVIDIA 12.04 drivers on the RTX 4090. Other NVIDIA GPUs may require parameter adjustments and have not been tuned yet.*

#### Next Steps
Ready to set up your node? Check out our detailed guides:

- [Validator Node Setup Guide](validator-node.md)
- [Storage Node Setup Guide](storage-node.md)
- [Data Availability Service Setup Guide](da-node.md)
