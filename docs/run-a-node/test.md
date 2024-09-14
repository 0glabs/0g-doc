---
sidebar_position: 7
---
# 0G Storage KV

## Introduction

0G Storage KV is a key-value store built on top of the 0G Storage system. This guide provides detailed steps to deploy and run a 0G Storage KV node.

## Prerequisites

Before setting up your 0G Storage KV node:

- Understand that 0G KV interacts with on-chain contracts and storage nodes to simulate KV data streams.
- For official deployed contract addresses, visit the [official 0G documentation page].

## Hardware Requirements

To run a 0G Storage KV node effectively, your system should meet or exceed the following specifications:

- Memory: 4 GB RAM
- CPU: 2 cores
- Disk: Matches the size of KV streams it maintains

## Installation Steps

### 1. Install Dependencies

Follow the same steps to install dependencies and Rust as in the storage node setup:

#### For Linux:
```bash
sudo apt-get update
sudo apt-get install clang cmake build-essential pkg-config libssl-dev
```

#### For Mac:
```bash
brew install llvm cmake
```

### 2. Install Rustup

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### 3. Download the Source Code

```bash
git clone -b v1.2.1 https://github.com/0glabs/0g-storage-kv.git
```

### 4. Build the Source Code

```bash
cd 0g-storage-kv
git submodule update --init --recursive
cargo build --release
```

## Configuration

1. Copy the example configuration file and update it:

```bash
cp config_example.toml config.toml
nano config.toml
```

2. Update the following fields in `config.toml`:

```toml
#######################################################################
###                   Key-Value Stream Options                      ###
#######################################################################

# Streams to monitor.
stream_ids = ["000000000000000000000000000000000000000000000000000000000000f2bd", "000000000000000000000000000000000000000000000000000000000000f009", "0000000000000000000000000000000000000000000000000000000000016879", "0000000000000000000000000000000000000000000000000000000000002e3d"]

#######################################################################
###                     DB Config Options                           ###
#######################################################################

# Directory to store data.
db_dir = "db"
# Directory to store KV Metadata.
kv_db_dir = "kv.DB"

#######################################################################
###                     Log Sync Config Options                     ###
#######################################################################

blockchain_rpc_endpoint = "YOUR_BLOCKCHAIN_RPC_ENDPOINT"
log_contract_address = "YOUR_LOG_CONTRACT_ADDRESS"
# log_sync_start_block_number should be earlier than the block number of the first transaction that writes to the stream being monitored.
log_sync_start_block_number = 0

#######################################################################
###                     RPC Config Options                          ###
#######################################################################

# Whether to provide RPC service.
rpc_enabled = true

# HTTP server address to bind for public RPC.
rpc_listen_address = "0.0.0.0:6789"

# Zerog storage nodes to download data from.
zgs_node_urls = "http://127.0.0.1:5678,http://127.0.0.1:5679"

#######################################################################
###                     Misc Config Options                         ###
#######################################################################

log_config_file = "log_config"
```

## Running the 0G Storage KV Node

1. Navigate to the `run` directory:
```bash
cd run
```

2. Run the KV service:
```bash
../target/release/zgs_kv --config config.toml
```

For long-running sessions, consider using `tmux` or `screen` to run the node in the background.

## Monitoring and Maintenance

1. Check logs:
   The node outputs logs based on the `log_config` file specified in your configuration.

2. Updating the node:
   To update to the latest version, pull the latest changes from the repository and rebuild:
   ```bash
   git pull
   cargo build --release
   ```

## Troubleshooting

If you encounter issues:

1. Check the logs for any error messages.
2. Ensure your node meets the hardware requirements.
3. Verify that your `config.toml` file is correctly formatted and contains valid settings.
4. Check your internet connection and firewall settings.
5. Ensure the specified blockchain RPC endpoint and contract addresses are correct and accessible.

## Getting Help

If you need assistance:

1. Check the [GitHub Issues](https://github.com/0glabs/0g-storage-kv/issues) for known problems and solutions.
2. Join the 0G community channels (Discord, Telegram, etc.) for community support.
3. For critical issues, consider reaching out to the 0G team directly.

## Conclusion

Running a 0G Storage KV node is an important part of the 0G ecosystem, providing key-value storage capabilities. By following this guide, you should be able to set up and operate your node successfully. Remember to keep your node updated and monitor its performance regularly to ensure optimal operation.