---
id: 0g-chain
title: 0G Chain 
sidebar_position: 5
---

# 0G Chain: The Fastest Modular AI Chain
---

0G is the largest AI Layer 1 ecosystem, powered by the fastest DeAIOS (decentralized AI Operating System). With $325M raised, 0G is the ultimate home for DeAI. Built with a modular architecture, it allows for the independent optimization of key components like consensus, execution, and storage—making it ideal for AI-driven workflows. 0G is fully **EVM-compatible**, so decentralized applications (dApps) already deployed on other L1 or L2 chains (such as Ethereum or rollups) can easily leverage 0G's products without needing to migrate entirely.

0G Chain supports a [data availability network](./da/0g-da.md), [distributed storage network](0g-storage.md), and [AI compute network](0g-compute.md). These networks integrate with 0G Chain's highly scalable consensus network, which is built to handle massive data volumes suitable for AI.

As the demand for network capacity increases, new consensus networks can be added to enable horizontal scalability, thereby boosting the overall bandwidth and performance of the system. By **decoupling data publication from data storage**, 0G optimizes both throughput and scalability, surpassing the limitations seen in existing data availability (DA) solutions.

0G Chain has 3 unique features:

1. Modular Scalability for AI
2. Custom Consensus
3. Shared Staking

## Modular Scalability for AI

A key differentiator of 0G is its **ability to efficiently manage large volumes of data with exceptional throughput**, thanks to its horizontally scalable architecture. At the core of this architecture is **0G Consensus**, the system's unique consensus mechanism.

0G Chain is also designed with modularity in mind, making it highly adaptable for AI and other data-heavy applications. Its ability to separate the DA layer from the data storage layer allows AI tasks, including large-scale training or inference, to access and store data efficiently. This makes 0G an optimal solution for decentralized AI infrastructures.

## 0G Consensus: A Distributed Approach

Unlike traditional blockchains that rely on a single, monolithic consensus layer, 0G Consensus is a distributed system composed of multiple independent consensus networks. These networks can expand dynamically based on demand, ensuring that as data volumes grow exponentially, 0G's throughput scales accordingly (e.g. 1, 100, or even 1,000 networks). 

This works by having 0G Consensus collaborate with #0G_Storage to validate data. DA Nodes are randomly queried (using a VRF) and collectively reach a consensus on the validity of the data, which is broadcasted to 0G Consensus. As the amount of data to be confirmed grows exponentially, the consensus networks (that in aggregate form 0G Consensus) can expand.  
<div style={{textAlign: 'center'}}>
  <img src="/img/broadcasted to 0G Consensus.png" alt="0G Consensus" style={{maxWidth: '100%'}} />
</div>
<br />
## Shared Staking

Traditionally, adding more consensus networks would require validators to stake additional assets for each network, making it difficult to maintain sufficient security across the entire system. 0G overcomes this challenge by implementing a **shared staking model**.

In this model, validators stake their funds on the Ethereum mainnet, providing security across all the 0G Consensus networks they participate in. If a slashable event occurs on any of the 0G networks, the validator's stake on the Ethereum mainnet is subject to slashing. This ensures that **mainnet-level security** is extended to all of 0G's consensus networks simultaneously, creating a unified and secure staking environment.

## Reward Mechanism

Validators participating in 0G Consensus earn tokens as rewards for their work. These tokens are burned on the 0G networks, and equivalent tokens are minted on the Ethereum mainnet, where the original funds were staked. This ensures a seamless and efficient reward system that bridges 0G Consensus with Ethereum's robust infrastructure.
<div style={{textAlign: 'center'}}>
  <img src="/img/0G Consensus.png" alt="0G Consensus Image" style={{maxWidth: '100%'}} />
</div>
<br />
## Why 0G?

0G is designed with AI applications in mind, offering a highly scalable, modular infrastructure that addresses the unique challenges of data-heavy use cases. Its EVM compatibility ensures that developers already using Ethereum, Layer 2 rollups, or other chains can easily integrate 0G's services—such as DA and storage—without leaving their current platforms. We are also actively exploring the ability to support the Solana VM, Near VM, and BTC compatibility so that AI applications may scale across a broader user base.

0G is not just another Layer 1 chain. It's a modular, AI-optimized system built for the future of decentralized applications. Whether you're working on AI, large-scale data tasks, or any application needing high performance and scalability, 0G provides the tools to grow without compromising on security, speed, or flexibility.
