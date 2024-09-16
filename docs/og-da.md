---
id: og-da
title: 0G DA 
sidebar_position: 4
---

# 0G DA: Infinitely Scalable and Programmable DA
---

0G DA is a groundbreaking Data Availability Layer that offers unparalleled throughput and scalability, making it uniquely suited for high-performance applications like on-chain AI and large-scale data processing.

## What is DA and Why is it Important?

Data availability (DA) refers to proving that data is readily accessible, verifiable, and retrievable. For example, Layer 2 rollups such as Arbitrum or Base handle transactions off-chain and then publish the data to Ethereum. On Ethereum, validators confirm that transactions were indeed handled honestly, and they store this data as well.

The amount of data stored on Ethereum is therefore growing exponentially alongside blockchain adoption, posing a risk to decentralization as fewer and fewer validators will be able to efficiently store vast amounts of data.

This led to the arrival of Data Availability Layers (DALs), which provide a significantly more efficient manner of storing and verifying data than publishing directly to Ethereum. However, existing DALs cannot adequately support high-performance dApps or use cases such as on-chain AI.

DALs are critical for several reasons:
- **Scalability**: DALs allow networks to process more transactions and larger datasets without overwhelming the system, reducing the burden on network nodes and significantly enhancing network scalability.
- **Increased Efficiencies**: DALs optimize how and where data is stored and made available, increasing data throughput and reducing latency while also minimizing associated costs.
- **Interoperability & Innovation**: DALs that can interact with multiple ecosystems allow for fast and highly secure interoperability for data and assets.

However, it's worth noting that not all DALs are built equally.

## The Challenge Today

While existing DA solutions like Celestia and Avail have been instrumental for Layer 2s, they fall short in critical ways that make them ill-suited for high-performance needs such as on-chain AI, high-frequency trading, fully on-chain gaming, and much more.

This is for several reasons:
- DALs tend to require that data be simultaneously sent to all of their network nodes, preventing horizontal scalability and limiting network speed to its slowest node.
- They also do not have built-in storage systems, requiring connectivity to external systems that impact throughput, latency, and cost.
- 0G inherits Ethereum's security, while other systems rely upon their own security mechanisms that fall short.
- Even more issues exist, including EigenDA's lack of randomization over its data committees.

0G's core differentiation is massive throughput and scalability. This is possible through 0G's unique design, which includes a built-in storage system and horizontally scalable consensus design, alongside other clever design mechanisms.

The result is that 0G serves as the foundational layer for decentralized AI applications, bringing on-chain AI and more to life.

## Why 0G Is The Superior DA Solution

There are 4 key differentiators of 0G:

1. **Infinitely Scalable DA**: 0G DA is 0G's infinitely scalable DAL that can quickly query or confirm data as valid, whether data held by 0G Storage, or held in external sources. Infinite scalability comes from the ability to continuously add new consensus networks, supporting workloads that far surpass the capacity of existing systems.

2. **Modular and Layered Architecture**: 0G is designed with a modular blockchain approach, where each component (storage, data availability, and consensus) is optimized for its specific function. This approach makes 0G particularly well-suited for handling complex AI workflows.

3. **Decentralized AI Operating System (dAIOS)**: 0G is the first decentralized AI operating system designed to give users control over their data while ensuring transparency and fairness throughout the AI lifecycle.

4. **High Throughput for AI Workloads**: 0G's infrastructure is specifically built to handle the large data throughput demands of AI applications, which current blockchain platforms cannot meet. With a demonstrated throughput of 50 Gbps on the Newton Testnet, 0G supports all on-chain AI requirements, including training large language models and storing entire AI agent networks.

These differentiators make 0G uniquely positioned to tackle the challenges of scaling AI on a decentralized platform, which is critical for the future of Web3 and decentralized intelligence.

## How Does This Work?

As covered in [0G Storage](./og-storage.md), data within the 0G ecosystem is first erasure-coded and split into "data chunks," which are then distributed across various Storage Nodes in the 0G Storage network. 

To ensure data availability, 0G utilizes DA nodes that are randomly selected through a Verifiable Random Function (VRF). These DA nodes form quorums to query and verify the stored data, operating under an "honest majority" assumption. Once consensus is reached on the availability of the data, the availability proofs are submitted to the 0G Consensus network.

[... previous content ...]

## How Does This Work?

As covered in [0G Storage](./og-storage.md), data within the 0G ecosystem is first erasure-coded and split into "data chunks," which are then distributed across various Storage Nodes in the 0G Storage network. 

To ensure data availability, 0G utilizes DA nodes that are randomly selected through a Verifiable Random Function (VRF). These DA nodes form quorums to query and verify the stored data, operating under an "honest majority" assumption. Once consensus is reached on the availability of the data, the availability proofs are submitted to the 0G Consensus network.

Validators in the 0G Consensus network, who are separate from the DA nodes, verify and finalize these proofs. Although DA nodes ensure data availability, they do not directly participate in the final consensus process, which is the responsibility of 0G validators. Validators use a shared staking mechanism where they stake $0G tokens on a primary network (likely Ethereum). Any slashable event across connected networks leads to slashing on the main network, securing the system's scalability while maintaining robust security. 

This is a key mechanism that allows for the system to scale infinitely while maintaining data availability. In return, validators engaged in shared staking receive $0G tokens on any network managed, which can then be burnt in return for $0G tokens on the mainnet.

## Getting Started

[Link to guide]

## Use Cases

0G DA offers an infinitely scalable and high-performance DA solution for a wide range of applications across Web3, AI, and more.

### L1s / L2s

Layer 1 and Layer 2 chains can utilize 0G DA to handle data availability and storage requirements for decentralized AI models, large datasets, and on-chain applications. Existing partners include networks like **Polygon, Arbitrum, Fuel, Manta Network**, **and countless more,** which leverage 0G's scalable infrastructure to store data more efficiently and support fast retrieval.

### Decentralized Shared Sequencers

Decentralized Shared Sequencers help order L2 transactions before final settlement on Ethereum. By integrating 0G DA, shared sequencers can streamline data across multiple networks in a decentralized manner, unlike existing sequencers which are often centralized. This also means fast and secure data transfers between L2s.

### Bridges

Cross-chain bridges benefit from 0G DA's scalable storage and data availability features. Networks can store and retrieve state data using 0G DA, making state migration between networks faster and more secure. For example, a network can confirm a user's assets and transfer them securely to another chain using 0G's highly efficient data verification.

### Rollups-as-a-Service (RaaS)

0G DA can serve as a reliable DA solution for RaaS providers like **Caldera and AltLayer**, enabling seamless configuration and deployment of rollups. With 0G DA's highly scalable infrastructure, RaaS providers can ensure the secure availability of data across multiple rollups without compromising performance.

### DeFi

0G's DA infrastructure is ideally suited for DeFi applications that require fast settlement and high-frequency trading. For example, by storing order book data on 0G, DeFi projects can achieve faster transaction throughput and enhanced scalability across L2s and L3s.

### On-Chain Gaming

On-chain gaming platforms rely on cryptographic proofs and metadata related to player assets, actions, and scores. 0G DA's ability to handle large volumes of data securely and efficiently makes it an optimal solution for gaming applications that require reliable data storage and fast retrieval.

### Data Markets

Web3 data markets can benefit from 0G DA by storing datasets on-chain. The decentralized storage and retrieval capabilities of 0G enable real-time updates and querying of data, providing a reliable solution for data market platforms.

### AI & Machine Learning

0G DA is particularly focused on supporting decentralized AI, allowing full AI models and vast datasets to be stored and accessed on-chain. This infrastructure is essential for advanced AI applications that demand high data throughput and availability, such as training large language models (LLMs) and managing entire AI agent networks.
