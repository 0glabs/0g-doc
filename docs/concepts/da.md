---
id: da
title: 0G DA
sidebar_position: 1
---

# 0G DA: Infinitely Scalable and Programmable DA

Running applications on L2s requires posting transaction data for verification. Current limitations include:

- **High costs** for posting data to Ethereum
- **Limited throughput** constraining application growth
- **Ecosystem lock-in** with no cross-chain flexibility

**0G DA offers:**
- Significantly reduced costs
- Massively increased throughput (50 GB/s demonstrated on testnet)
- Universal compatibility across blockchains

## What is Data Availability?

<details>
<summary><b>New to DA? Start here</b></summary>

Think of Data Availability (DA) like a public library's catalog system:
- When someone borrows a book (makes a transaction), it needs to be recorded
- Anyone should be able to verify what books were borrowed (validate transactions)
- The records must be accessible to prevent fraud

In blockchain terms, DA ensures that transaction data is available for anyone to verify, maintaining the network's trustless nature.
</details>

### Why DA Matters

1. **For Rollups**: L2s like Arbitrum need to prove their transactions are valid
2. **For Security**: Anyone can challenge fraudulent transactions during dispute periods
3. **For Scaling**: Efficient DA allows blockchains to process more transactions

## 0G's Solution: Infinite Scalability

### 🚀 Key Innovation
**Horizontal scaling through multiple consensus networks** - like adding more highways instead of widening existing ones.

### 🔌 Universal Integration

**Use 0G DA anywhere**:
- **Existing L2s**: Enhance Arbitrum, Optimism, or any rollup
- **New Rollups**: OP Stack, Arbitrum Orbit, Polygon CDK compatible
- **No Lock-in**: One DA solution for all your needs

## Why 0G Wins

### Performance Comparison

| Feature | 0G DA | Other DA Solutions |
|---------|--------|-------------------|
| **Throughput** | 50 GB/s (testnet) | Varies by solution |
| **Security Model** | Ethereum-inherited via shared staking | Varies (native tokens or Ethereum) |
| **Storage** | Built-in storage layer | Typically requires external systems |
| **Cross-chain** | ✅ Universal compatibility | Often limited to specific ecosystems |

### 4 Key Differentiators

#### 1. 🔄 Infinite Horizontal Scaling
**What it means**: Add new consensus networks on-demand, like adding new servers to a web app.

**Why it matters**: 
- No theoretical throughput limit
- Scale with your application's growth
- Pay only for what you use

#### 2. 🧩 Modular Architecture
**Components work independently**:
- **Storage Layer**: Handles data persistence
- **DA Layer**: Manages availability proofs
- **Consensus Layer**: Validates and finalizes

**Benefits**:
- Upgrade components without affecting others
- Optimize each layer for its specific function
- Mix and match with existing infrastructure

#### 3. 🛡️ Ethereum-Inherited Security
**$80 billion** in staked ETH secures 0G through shared staking:
- Validators stake on Ethereum
- Slashing events affect all connected networks
- Security scales with Ethereum's growth

#### 4. 🤖 AI-Native Design
**Built for AI workloads from day one**:
- **50 GB/s throughput**: Train LLMs on-chain
- **Low latency**: Real-time AI inference
- **Large file support**: Store complete models

> **Use Case**: 0G DA is designed to support AI workloads with high throughput requirements and cost-effective data availability.

## How 0G DA Works

### Simple Explanation

```
1. Data arrives → 2. Split & encode → 3. Distribute to nodes
                                          ↓
6. Data available ← 5. Consensus ← 4. Nodes verify samples
```

### Technical Deep Dive

<details>
<summary><b>Step 1: Data Preparation</b></summary>

**Erasure Coding**: Like RAID for blockchain
- Data split into chunks with redundancy
- Can reconstruct even if some nodes fail
- Optimized for parallel processing

```javascript
// Conceptual example
const data = "Transaction data...";
const chunks = erasureEncode(data, {
  dataShards: 10,
  parityShards: 4  // 40% redundancy
});
```
</details>

<details>
<summary><b>Step 2: Random Node Selection</b></summary>

**Verifiable Random Function (VRF)**:
- Cryptographically secure randomness
- Nodes can't predict selection
- Prevents collusion attacks

**Why this matters**: EigenDA's lack of randomization allows potential collusion
</details>

<details>
<summary><b>Step 3: Verification Process</b></summary>

**Data Sampling** instead of full verification:
- Nodes verify random samples (like quality control)
- Statistical guarantees with minimal data
- 1000x faster than full verification

**Quorum Formation**:
- Small groups of nodes work together
- Honest majority assumption (67%+ honest)
- Multiple quorums for redundancy
</details>

<div style={{textAlign: 'center'}}>
  <img src="/img/Validators in the 0G Consensus network.png" alt="Validators in the 0G Consensus network Image" style={{maxWidth: '100%'}} />
</div>

### Consensus & Security

<div style={{textAlign: 'center'}}>
  <img src="/img/consensus process.png" alt="consensus process Image" style={{maxWidth: '100%'}} />
</div>

**Two-Layer Security Model**:
1. **DA Nodes**: Verify data availability
2. **Validators**: Finalize proofs on consensus layer

**Shared Staking Mechanism**:
- Validators stake on Ethereum
- Slashing applies across all networks
- Earn rewards on any connected network

> **Key Innovation**: Separation of DA verification and consensus allows infinite scaling while maintaining Ethereum-level security.

### 🚀 Ready to Run a Node?
**Earn rewards** by contributing to the network's data availability.

[**Run a DA Node →**](../run-a-node/da-node.md)

## Real-World Use Cases

### 🏛️ L1s & L2s
**Partners**: Polygon, Optimism, Arbitrum, Fuel, Manta Network

**Impact**:
- 90% cost reduction vs Ethereum DA
- 1000x throughput improvement
- Cross-chain data portability

**Benefit**: Significant cost reduction and throughput improvements for L2 data availability needs

### 🔄 Shared Sequencers
**Problem Solved**: Centralized sequencers create single points of failure

**0G Solution**:
- Decentralized transaction ordering
- Cross-L2 atomic transactions
- Sub-second finality

### 🌉 Cross-Chain Bridges
**Enhanced Security**:
- Cryptographic state proofs
- Fast state verification
- Reduced bridge hacks

**Benefit**: Faster state verification and enhanced security for cross-chain transfers

### 🚀 Rollups-as-a-Service
**Partners**: Caldera, AltLayer

**Benefits**:
- One-click DA integration
- No infrastructure management
- Pay-as-you-grow pricing

### 💱 DeFi Applications
**High-Frequency Trading**:
- Store complete order books on-chain
- Sub-second settlement
- Cross-chain liquidity

**Use Case**: High-frequency trading applications requiring fast data availability

### 🎮 On-Chain Gaming
**Capabilities**:
- Store game state for millions of players
- Real-time asset verification
- Cross-game item portability

**Capability**: Scalable infrastructure for games with large player bases

### 🤖 AI & Machine Learning
**Breakthrough Applications**:
- **On-chain LLM Training**: Store training data and model checkpoints
- **AI Agent Networks**: Coordinate thousands of autonomous agents
- **Decentralized Compute**: Match AI workloads with GPU providers

**Real Example**:
```python
# Store AI model on 0G
model_hash = 0g_da.store_model(
    model_data=gpt_model,
    size="7B parameters",
    access="public"
)

# Anyone can verify and use
model = 0g_da.retrieve_model(model_hash)
```

## Frequently Asked Questions

<details>
<summary><b>How does "infinite scalability" actually work?</b></summary>

0G can spawn new consensus networks as demand grows. Think of it like cloud computing - you can add more servers as needed. Each new network adds capacity without affecting existing ones.
</details>

<details>
<summary><b>How does 0G DA reduce costs?</b></summary>

0G DA achieves cost reduction through:
- Efficient data encoding and compression
- Distributed storage across many nodes
- Optimized consensus mechanism
- Purpose-built infrastructure for DA

The exact cost savings depend on usage patterns and network conditions.
</details>

<details>
<summary><b>How is 50 GB/s possible when Ethereum does 130 KB/s?</b></summary>

1. **Parallel processing**: Multiple consensus networks work simultaneously
2. **Data sampling**: Verify statistically instead of every byte
3. **Purpose-built**: Optimized specifically for DA, not general computation
4. **Erasure coding**: Efficient data distribution with redundancy
</details>

<details>
<summary><b>Can I use 0G DA with my existing rollup?</b></summary>

Yes! 0G DA is compatible with:
- OP Stack (Optimism, Base, etc.)
- Arbitrum Orbit chains
- Polygon CDK
- Custom rollup frameworks

Integration typically takes 1-2 days.
</details>

<details>
<summary><b>What happens if 0G nodes go offline?</b></summary>

- **Erasure coding**: Data recoverable even with 30% nodes offline
- **Automatic replication**: System detects and replaces failed nodes
- **Economic incentives**: Nodes penalized for downtime
- **No single point of failure**: Distributed across thousands of nodes
</details>

## Get Started

### For Developers
```bash
# Install 0G DA SDK
npm install @0g/da-sdk

# Initialize client
const da = new ZeroGDA({
  network: 'mainnet',
  apiKey: 'your-api-key'
});
```

[**📖 Full Integration Guide**](../developer-hub/building-on-0g/da-integration.md)

### For Node Operators
**Earn rewards** by running a DA node:
- Hardware requirements vary by node type
- See documentation for specific requirements
- Rewards based on network participation

[**🖥️ Run a DA Node**](../run-a-node/da-node.md)

### For Projects
**Ready to reduce costs by 99%?**

[**💬 Contact Integration Team**](https://0g.ai/contact)
