---
sidebar_position: 3
---
# Testnet Information

Welcome to Testnet-V2, where you can contribute to our network by operating various node types, including Validator, Storage, and DA (Data Availability) nodes. This page provides an overview of the testnet process and important information for participants.

## Important Notes

- The validator selection process described here applies **only to the testnet**. The mainnet will have a different selection mechanism.
- Your chances of being selected as a validator increase if you run multiple node types. However, it's also possible to run nodes independently.
- After a validator is selected, they are manually delegated within a few days.

## Node Types and Selection Process

In Testnet-V2, we've implemented a fair and transparent process for selecting validators and managing various node types. Here's a summary of the key features:

### Key Features

1. **Objective Validator Selection**: We've implemented a fair and transparent process for selecting validators, which is essential for maintaining network integrity.

2. **Performance Monitoring**: We use a sophisticated monitoring service to track performance and optimize the network. For security reasons, the specific details of this monitoring system are not made public.

3. **Limited Validator Slots**: Due to current Cosmos limitations, we can only select 125 validators at a time. However, we anticipate this number will increase in the future when we transition to mainnet.

4. **Rotation System**: Validators are rotated every two weeks, though this period may occasionally be longer.

### Application Process

While we receive numerous validator applications, the limited slots mean not all applicants can be accommodated due to the limitation of cosmos. We appreciate your patience and continued interest in contributing to our network.

For detailed instructions on how to apply and operate each node type, please refer to our comprehensive setup guides:

- [How to Run a Storage Node](run-a-node/storage.md)
- [How to Run a DA Node](run-a-node/da.md)
- [How to Run a Validator Node](run-a-node/validator.md)

## 0G Testnet Configuration

| Field | Value |
|-------|-------|
| Chain Name | 0G-Newton-Testnet |
| Chain ID | 16600 (`zgtendermint_16600-2`) |
| Token Symbol | A0GI |
| Chain RPC | https://evmrpc-testnet.0g.ai |
| Chain Websocket | https://cosmosrpc-testnet.0g.ai |
| Storage RPC | https://rpc-storage-testnet.0g.ai |
| Storage Turbo RPC | https://rpc-storage-testnet-turbo.0g.ai |
| Chain Explorer | https://chainscan-newton.0g.ai/ |
| Storage Explorer | https://storagescan-newton.0g.ai/ |

## Contract Addresses

:::caution
The contract address might change during the public testnet phase, so please check this page regularly for updates. 
:::

| Component | Contract | Address |
|-----------|----------|---------|
| **0G Storage Turbo** | Flow Contract | `0xbD2C3F0E65eDF5582141C35969d66e34629cC768` |
| | Mine Contract | `0x6815F41019255e00D6F34aAB8397a6Af5b6D806f` |
| | Market Contract | `0xBa697dB4e9293e6d7674045373508823A85d0798` |
| | Reward Contract | `0x51998C4d486F406a788B766d93510980ae1f9360` |
| **0G Storage Standard** | Flow Contract | `0x0460aA47b41a66694c0a73f667a1b795A5ED3556` |
| | Mine Contract | `0x1785c8683b3c527618eFfF78d876d9dCB4b70285` |
| | Market Contract | `0x20f7e27cD0FaBD87F96afC4E83A88a47E9Ce4689` |
| | Reward Contract | `0x0496D0817BD8519e0de4894Dc379D35c35275609` |
| **0G DA** | DAEntrance Contract | `0x857C0A28A8634614BB2C96039Cf4a20AFF709Aa9` |

Deployed Block Number: `595059`

### Third-party RPCs

- [thirdweb RPC](https://thirdweb.com/0g-newton-testnet)

### Community RPCs

[community RPCs will be listed here]

