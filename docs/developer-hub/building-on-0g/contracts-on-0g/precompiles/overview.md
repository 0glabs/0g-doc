---
id: precompiles-overview
title: Overview
---

# 0G Chain Precompiles

Precompiled contracts that extend 0G Chain with powerful native features for AI and blockchain operations.

## What Are Precompiles?

Precompiles are special contracts deployed at fixed addresses that execute native code instead of EVM bytecode. They provide:
- **Gas Efficiency**: 10-100x cheaper than Solidity implementations
- **Native Features**: Access chain-level functionality
- **Complex Operations**: Cryptographic functions and state management

## 0G Chain Precompiles

Beyond standard Ethereum precompiles, 0G Chain adds specialized contracts for decentralized AI infrastructure:

### 🔐 [DASigners](./precompiles-dasigners)
`0x0000000000000000000000000000000000001000`

Manages data availability signatures for 0G's DA layer.

**Key Features**:
- Register and manage DA node signers
- Query quorum information
- Verify data availability proofs

**Common Use Case**: Building applications that need to verify data availability directly on-chain.


<!-- ### 💰 Staking (`0x0000000000000000000000000000000000001001`)
Native staking operations for validators and delegators.

**Key Features**:
- Delegate tokens to validators
- Query staking rewards
- Manage validator operations

**Common Use Case**: Building staking interfaces or automated delegation strategies.

[Full Staking Documentation](./staking) -->

### 🪙 [WrappedOGBase](./precompiles-wrappedogbase)
`0x0000000000000000000000000000000000001002`

Wrapped version of native OG token for DeFi compatibility.

**Key Features**:
- Wrap/unwrap native OG tokens
- ERC20-compatible interface
- Efficient gas operations

**Common Use Case**: Integrating OG tokens with DEXs, lending protocols, or other DeFi applications.

---

Questions? Get help in our [Discord](https://discord.gg/0glabs) #dev-support channel.