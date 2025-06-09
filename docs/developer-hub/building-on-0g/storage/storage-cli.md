---
id: storage-cli
title: Storage CLI
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 0G Storage CLI

The 0G Storage CLI is your command-line gateway to interact directly with the 0G Storage network. It simplifies the process of uploading and downloading files while providing full control over your decentralized storage operations.

## Why Use the CLI?

- **Direct Control**: Manage data location and versioning with precision
- **Automation Ready**: Build scripts and cron jobs for regular operations
- **Full Feature Access**: Access all storage and KV operations from the terminal
- **Developer Friendly**: Perfect for integrating into your development workflow

:::tip Web-Based Alternative
For a quick and easy web interface, try the [0G Storage Web Tool](https://storagescan-galileo.0g.ai/tool) - perfect for one-off uploads and downloads.
:::

## Installation

### Prerequisites
- Go 1.18 or higher installed on your system
- Git for cloning the repository

### Setup Steps

**1. Clone the Repository**

```bash
git clone https://github.com/0glabs/0g-storage-client.git
cd 0g-storage-client
```

**2. Build the Binary**

```bash
go build
```

**3. Add to PATH** (Optional but recommended)

```bash
# Move binary to Go bin directory
mv 0g-storage-client ~/go/bin

# Add to PATH if not already configured
export PATH=~/go/bin:$PATH
```

## Command Overview

The CLI provides a comprehensive set of commands for storage operations:

```
0g-storage-client [command] [flags]

Available Commands:
  upload      Upload file to 0G Storage network
  download    Download file from 0G Storage network
  kv-write    Write to KV streams
  kv-read     Read KV streams
  gen         Generate test files
  gateway     Start gateway service
  indexer     Start indexer service
  completion  Generate shell completion scripts
  help        Get help for any command

Global Flags:
  --gas-limit uint       Custom gas limit for transactions
  --gas-price uint       Custom gas price for transactions
  --log-level string     Set log level (default "info")
  --log-color-disabled   Disable colorful log output
  --web3-log-enabled     Enable Web3 RPC logging
```

## Core Operations

### File Upload

Upload files to the 0G Storage network:

```bash
0g-storage-client upload \
  --url <blockchain_rpc_endpoint> \
  --contract <log_contract_address> \
  --key <private_key> \
  --node <storage_node_rpc_endpoint> \
  --file <file_path>
```

**Parameters:**
- `--url`: 0G Chain RPC endpoint (e.g., `https://evmrpc-testnet.0g.ai`)
- `--contract`: 0G log contract address on the blockchain
- `--key`: Your private key for signing transactions
- `--node`: Storage node RPC endpoint (e.g., `https://rpc-storage-testnet.0g.ai`)
- `--file`: Path to the file you want to upload

### File Download

Download files from the network:

```bash
0g-storage-client download \
  --node <storage_node_rpc_endpoint> \
  --root <file_root_hash> \
  --file <output_file_path>
```

**Parameters:**
- `--node`: Storage node RPC endpoint
- `--root`: File's Merkle root hash (obtained during upload)
- `--file`: Where to save the downloaded file

### Download with Verification

Enable proof verification for enhanced security:

```bash
0g-storage-client download \
  --node <storage_node_rpc_endpoint> \
  --root <file_root_hash> \
  --file <output_file_path> \
  --proof
```

The `--proof` flag requests cryptographic proof of data integrity from the storage node.

## Practical Examples

### Upload Example

```bash
# Upload a document to 0G Storage
0g-storage-client upload \
  --url https://evmrpc-testnet.0g.ai \
  --contract 0x8873cc79c5b3b5666535C825205C9a128B1D75F1 \
  --key YOUR_PRIVATE_KEY \
  --node https://rpc-storage-testnet.0g.ai \
  --file ./documents/report.pdf

# Output:
# ✓ File uploaded successfully
# Root hash: 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470
# Transaction: 0x742d35cc6634c0532925a3b844bc454e8e4a0e3f...
```

### Download Example

```bash
# Download file using root hash
0g-storage-client download \
  --node https://rpc-storage-testnet.0g.ai \
  --root 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470 \
  --file ./downloads/report.pdf

# With verification
0g-storage-client download \
  --node https://rpc-storage-testnet.0g.ai \
  --root 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470 \
  --file ./downloads/report.pdf \
  --proof
```

## Key-Value Operations

### Write to KV Store

```bash
0g-storage-client kv-write \
  --url <blockchain_rpc_endpoint> \
  --contract <kv_contract_address> \
  --key <private_key> \
  --stream-id <stream_id> \
  --stream-key <key> \
  --stream-value <value>
```

### Read from KV Store

```bash
0g-storage-client kv-read \
  --node <kv_node_endpoint> \
  --stream-id <stream_id> \
  --stream-key <key>
```

## Advanced Features

### Custom Gas Settings

Control transaction costs with custom gas parameters:

```bash
0g-storage-client upload \
  --gas-limit 3000000 \
  --gas-price 10000000000 \
  # ... other parameters
```

### Logging Configuration

Adjust logging for debugging:

```bash
# Verbose logging with Web3 details
0g-storage-client upload \
  --log-level debug \
  --web3-log-enabled \
  # ... other parameters

# Minimal logging
0g-storage-client download \
  --log-level error \
  --log-color-disabled \
  # ... other parameters
```

### Shell Completion

Enable tab completion for easier command entry:

```bash
# Bash
0g-storage-client completion bash > /etc/bash_completion.d/0g-storage-client

# Zsh
0g-storage-client completion zsh > "${fpath[1]}/_0g-storage-client"

# Fish
0g-storage-client completion fish > ~/.config/fish/completions/0g-storage-client.fish
```

## Important Considerations

### Network Configuration

:::info Required Information
- **Contract Addresses**: Find the latest contract addresses in the [0G documentation](https://docs.0g.ai) or on the [Storage Explorer](https://storagescan-galileo.0g.ai/)
- **Node Endpoints**: Use team-provided endpoints or run your own storage node
- **Private Keys**: Keep your private keys secure and never share them
:::

### File Management

- **Root Hash Storage**: Save file root hashes after upload - they're required for downloads
- **Transaction Monitoring**: Track upload transactions on the blockchain explorer
- **Node Selection**: Choose reliable storage nodes or run your own for better control

## Running Services

### Indexer Service

The indexer helps users find suitable storage nodes:

```bash
0g-storage-client indexer \
  --listen :8080 \
  --node <storage_node_endpoint>
```

### Gateway Service

Run a gateway to provide HTTP access to storage:

```bash
0g-storage-client gateway \
  --listen :9000 \
  --node <storage_node_endpoint>
```

## Automation Examples

### Backup Script

Create automated backup scripts:

```bash
#!/bin/bash
# backup.sh - Daily backup to 0G Storage

DATE=$(date +%Y%m%d)
BACKUP_FILE="/backups/daily-${DATE}.tar.gz"

# Create backup
tar -czf $BACKUP_FILE /important/data

# Upload to 0G
ROOT_HASH=$(0g-storage-client upload \
  --url $RPC_URL \
  --contract $CONTRACT \
  --key $PRIVATE_KEY \
  --node $NODE_URL \
  --file $BACKUP_FILE | grep "Root hash" | cut -d' ' -f3)

# Save root hash
echo "${DATE}: ${ROOT_HASH}" >> /backups/manifest.txt
```

### Monitoring Integration

Monitor uploads with logging:

```bash
# upload-with-monitoring.sh
0g-storage-client upload \
  --file $1 \
  --log-level info \
  # ... other parameters \
  2>&1 | tee -a /var/log/0g-uploads.log
```

## Troubleshooting

<details>
<summary>**Upload fails with "insufficient funds" error**</summary>

Ensure your wallet has enough tokens for:
- Gas fees on 0G Chain
- Storage fees for the file size

Check balance: Use a blockchain explorer or wallet to verify funds.
</details>

<details>
<summary>**"Node not found" error during download**</summary>

This can happen if:
- The storage node is offline
- The file hasn't propagated to the specified node
- The root hash is incorrect

Try using a different node endpoint or verify the root hash.
</details>

## Best Practices

1. **Security First**: Store private keys in environment variables, not command line
2. **Backup Root Hashes**: Always save file root hashes after uploads
3. **Use Verification**: Enable `--proof` for important downloads
4. **Monitor Transactions**: Track uploads on the blockchain explorer
5. **Test First**: Use testnet before mainnet operations

---

*Need more control? Consider running your own [storage node](/run-a-node/storage-node) to participate in the network and earn rewards.*