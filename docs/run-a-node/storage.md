# Storage Node

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### Overview

This guide details the process of running a storage node, including hardware specifications and interaction with on-chain contracts.

Your 0G Storage interacts with on-chain contracts for blob root confirmation and PoRA mining. We provide a client tool (Storage Node CLI) for direct interaction with the storage node.
Storage KV interacts with both on-chain contracts and storage nodes to simulate KV data streams. A guideline for deploying the Storage KV Client, a KV runtime built on top of the log layer, is available below.
### Hardware Requirements

| Component | Storage Node | Storage KV |
|-----------|--------------|------------|
| Memory    | 16 GB RAM    | 4 GB RAM   |
| CPU       | 4 cores      | 2 cores    |
| Disk      | 500GB / 1TB NVMe SSD | Size matches the KV streams it maintains |
| Bandwidth | 500 Mbps (Download / Upload) | - |

:::note
- For Storage Node: The NVMe SSD ensures fast read/write operations, critical for efficient blob storage and retrieval.
- For Storage KV: The disk size requirement is flexible and should be adjusted based on the volume of KV streams you intend to maintain.
:::
### Next Steps
For detailed instructions on setting up and operating your Storage Node or Storage KV, please refer to our comprehensive setup guides below:

<Tabs>
  <TabItem value="binary" label="Storage Node" default>

## 1. Install dependencies

#### For Linux

```bash
sudo apt-get update
sudo apt-get install clang cmake build-essential pkg-config libssl-dev
```

#### For Mac

```bash
brew install llvm cmake
```

## 2. Install rustup

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

## 3. Install Go

### For Linux

```bash
# Download the Go installer
wget https://go.dev/dl/go1.23.0.linux-amd64.tar.gz

# Extract the archive
sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.23.0.linux-amd64.tar.gz

# Add /usr/local/go/bin to the PATH environment variable by adding the following line to your ~/.profile.
export PATH=$PATH:/usr/local/go/bin
```

### For Mac

```bash
brew install go
```

Or download the Go installer from https://go.dev/dl/. Open the package file you downloaded and follow the prompts to install Go.

## 4. Download the source code

```bash
git clone -b v0.4.6 https://github.com/0glabs/0g-storage-node.git
```

## 5. Build the source code

```bash
cd 0g-storage-node

# Build in release mode
cargo build --release
```

## 6. Check and update the `run/config.toml` if necessary

```toml
# enr address, must fill your instance's public ip to support peer discovery
network_enr_address

# peer nodes, check the 0g-storage/run/config-tfor the official configurations
network_boot_nodes = []

# flow contract address
log_contract_address

# mine contract address
mine_contract_address

# layer one blockchain rpc endpoint
blockchain_rpc_endpoint

# block number to start the sync
log_sync_start_block_number

# your private key with 64 length
# do not include leading 0x
# do not omit leading 0
# must fill if you want to participate in the pora and get mining reward
miner_key

# The max number of chunk entries to store in db.
# Each entry is 256B, so the db size is roughly limited to
# `256 * db_max_num_chunks` Bytes.
# If this limit is reached, the node will update its `shard_position`
# and store only half data.
db_max_num_chunks
```

## 7. Run the storage service

Check the command line configuration with `zgs_node -h`
We provide a `run/config-testnet.toml` for testnet usage.

```bash
cd run

# consider using tmux in order to run in background
../target/release/zgs_node --config config-testnet.toml --miner-key <your_private_key> --blockchain-rpc-endpoint <blockchain_rpc> --db-max-num-chunks <max_chunk_num>
```

  </TabItem>
  <TabItem value="source" label="Storage Node CLI">

## Download the Source Code

```bash
git clone https://github.com/0glabs/0g-storage-client.git
```

## Build the Source Code

```bash
cd 0g-storage-client
go build
```

## Run the File Upload/Download Commands

### File Upload

```bash
./0g-storage-client upload --url <blockchain_rpc_endpoint> --contract <log_contract_address> --key <private_key> --node <storage_node_rpc_endpoint> --file <file_path>
```

### File Download

```bash
./0g-storage-client download --node <storage_node_rpc_endpoint> --root <file_root_hash> --file <output_file_path>
```

### File Download with Verification

```bash
./0g-storage-client download --node <storage_node_rpc_endpoint> --root <file_root_hash> --file <output_file_path> --proof
```

Check Contract Addresses for log contract address.

:::note
You need to have the file root in order to download the file.
:::

For the storage node rpc endpoint, you could use the team deployed `https://rpc-storage-testnet.0g.ai` or you could deploy yourself by following the above instructions.

## Retrieving File Root Hash

During download, the `file_root_hash` can be retrieved from these places:

1. When you upload the file, the log will give you information about the file root. Look for `Data merkle root calculated root=`.
2. Locate your transaction with the transaction hash in the [0g Storage Scanner](https://storagescan-newton.0g.ai/). Check the Overview -> File Hash in the tx detail page.

## Q&A

### My command fails to execute with error "Transaction execution failed"

Try to set a higher gas limit with `--gas-limit`. For the reason why you need to set a customized gas limit, check the [Ethereum EIP-150](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-150.md).

  </TabItem>
  <TabItem value="docker" label="Storage KV">

## 1. Download the Source Code

```bash
git clone -b v1.2.1 https://github.com/0glabs/0g-storage-kv.git
```

## 2. Build the Source Code

```bash
cd 0g-storage-kv
git submodule update --init --recursive

# Build in release mode
cargo build --release
```

## 3. Configure the Service

Copy the `config_example.toml` to `config.toml` and update the parameters:

```toml
#######################################################################
###                   Key-Value Stream Options                      ###
#######################################################################

# In KV Scenario, each independent KV database abstraction has a unique stream id.

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

blockchain_rpc_endpoint = ""
log_contract_address = ""
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

## 4. Run the KV Service

```bash
cd run

# consider using tmux in order to run in background
../target/release/zgs_kv --config config.toml
```
:::note
The recommended system configuration is the same as the storage node.
:::
  </TabItem>
</Tabs>