# Storage Node
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### Overview

In the 0G network, storage nodes play a vital role in maintaining the system's decentralized storage layer. They are responsible for storing and serving data, ensuring data availability and reliability across the network. By running a storage node, you actively contribute to the network and earn rewards for your participation.
This guide details the process of running a storage node, including hardware specifications and interaction with on-chain contracts.

### Hardware Requirements

| Component | Storage Node | Storage KV |
|-----------|--------------|------------|
| Memory    | 32 GB RAM    | 32 GB RAM   |
| CPU       | 8 cores      | 8 cores    |
| Disk      | 500GB / 1TB NVMe SSD | Size matches the KV streams it maintains |
| Bandwidth | 100 Mbps (Download / Upload) | - |

:::note
- For Storage Node: The NVMe SSD ensures fast read/write operations, critical for efficient blob storage and retrieval.
- For Storage KV: The disk size requirement is flexible and should be adjusted based on the volume of KV streams you intend to maintain.
:::
### Next Steps
For detailed instructions on setting up and operating your Storage Node or Storage KV, please refer to our comprehensive setup guides below:

<Tabs>
  <TabItem value="binary" label="Storage Node" default>

## Overview

The 0G System comprises multiple components, each with specific functionalities. This guide provides detailed steps to deploy and run a storage node, a crucial part of the 0G network.

## Prerequisites

Before setting up your storage node:

- Understand that 0G Storage interacts with on-chain contracts for blob root confirmation and PoRA mining.
- Check [here](run-a-node/testnet-information.md) for deployed contract addresses.

**Deployment Steps**
**Install Dependencies**
start by installing all the essential tools and libraries required to build the 0G storage node software.

<Tabs
  defaultValue="linux"
  values={[
    {label: 'Linux', value: 'linux'},
    {label: 'Mac', value: 'mac'},
    ]}>
  <TabItem value="linux">

        ```bash
        sudo apt-get update
        sudo apt-get install clang cmake build-essential pkg-config libssl-dev
        ```
</TabItem>
  <TabItem value="mac">
        ```bash
        brew install llvm cmake
        ```
</TabItem>
</Tabs>
**Install `rustup`**: (`rustup`) is the Rust toolchain installer, necessary as the 0G node software is written in Rust.

    ```bash
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    ```   

**Install Go**

<Tabs
  defaultValue="linux"
  values={[
    {label: 'Linux', value: 'linux'},
    {label: 'Mac', value: 'mac'},
    ]}>

  <TabItem value="linux">

        ```bash
        # Download the Go installer
        wget https://go.dev/dl/go1.23.0.linux-amd64.tar.gz

        # Extract the archive
        sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.23.0.linux-amd64.tar.gz

        # Add /usr/local/go/bin to the PATH environment variable
        export PATH=$PATH:/usr/local/go/bin
        ```
</TabItem>
  <TabItem value="mac">

        ```bash
        brew install go
        ```
</TabItem>
</Tabs>
        *   Or download the Go installer from https://go.dev/dl.

        *   Go is a programming language used for certain components of the 0G node.

 **Download the Source Code**: clones the 0G storage node repository from GitHub, specifically the `v0.4.6` branch.

    ```bash
    git clone -b v0.4.6 https://github.com/0glabs/0g-storage-node.git
    ```

5.  **Build the Source Code**

    ```bash
    cd 0g-storage-node

    # Build in release mode
    cargo build --release
    ```

    *   This compiles the Rust code into an executable binary. The `--release` flag optimizes the build for performance.

6.  **Configure the Node**

 Navigate to the run directory and open config.toml for editing:

## Configuration

1. Edit the configuration file:

```bash
cd run
nano config.toml
```

2. Update `config.toml` with your settings:

```toml
# ENR address: Your instance's public IP
network_enr_address = "YOUR_PUBLIC_IP"

# Peer nodes: Check 0g-storage/run/config-testnet.toml for official configurations
network_boot_nodes = []

# Contract addresses
log_contract_address = "CONTRACT_ADDRESS"
mine_contract_address = "CONTRACT_ADDRESS"

# Layer one blockchain RPC endpoint
blockchain_rpc_endpoint = "RPC_ENDPOINT"

# Start sync block number
log_sync_start_block_number = BLOCK_NUMBER

# Your private key (64 chars, no '0x' prefix, include leading zeros)
miner_key = "YOUR_PRIVATE_KEY"

# Max chunk entries in db (affects storage size)
db_max_num_chunks = MAX_CHUNKS
```
:::note
*   `network_enr_address`: Your node's public IP address, essential for other nodes to discover and connect to you.
        *   `network_boot_nodes`: A list of peer nodes to help your node join the network. You can find official configurations in the `0g-storage/run/config-t` file.
        *   `log_contract_address`, `mine_contract_address`: The addresses of the smart contracts on the host blockchain that manage the log and mining processes, respectively.
        *   `blockchain_rpc_endpoint`: The URL of an RPC endpoint to interact with the host blockchain.
        *   `log_sync_start_block_number`: The block number from which your node should start synchronizing the log data.
        *   `miner_key`: Your private key (without the `0x` prefix) if you want to participate in PoRA mining and earn rewards.
        *   `db_max_num_chunks`: The maximum number of chunk entries (each 256 bytes) to store in the database. This effectively limits the database size.
        :::
## Running the Storage Node

1. Check configuration options:
```bash
../target/release/zgs_node -h
```

2. Run the storage service:
```bash
cd run
../target/release/zgs_node --config config-testnet.toml --miner-key <your_private_key>
```

For long-running sessions, use `tmux` or `screen`.

**Additional Notes**

*   **Security:** Keep your private key (`miner_key`) safe and secure. Anyone with access to it can control your node and potentially claim your mining rewards.

*   **Network Connectivity:** Ensure your node has a stable internet connection and that the necessary ports are open for communication with other nodes.

*   **Monitoring:** Monitor your node's logs and resource usage to ensure it's running smoothly.

*   **Updates:** Stay informed about updates to the 0G storage node software and follow the project's documentation for any changes in the setup process.

**Remember:** Running a storage node is a valuable contribution to the 0G network. You'll be helping to maintain its decentralization and robustness while earning rewards for your efforts.

  </TabItem>
  <TabItem value="docker" label="Storage KV">

  ## Overview
  0G Storage KV is a key-value store built on top of the 0G Storage system. This guide provides detailed steps to deploy and run a 0G Storage KV node.

## Prerequisites

Before setting up your 0G Storage KV node:

- Understand that 0G KV interacts with on-chain contracts and storage nodes to simulate KV data streams.
- For official deployed contract addresses, visit the [official 0G documentation page].
  Follow the same steps to install dependencies and Rust as in the storage node setup:

### Install Dependencies

Follow the same steps to install dependencies and Rust as in the storage node setup:
<Tabs
  defaultValue="linux"
  values={[
    {label: 'Linux', value: 'linux'},
    {label: 'Mac', value: 'mac'},
    ]}>
  <TabItem value="linux">

        ```bash
        sudo apt-get update
        sudo apt-get install clang cmake build-essential pkg-config libssl-dev
        ```
</TabItem>
  <TabItem value="mac">
        ```bash
        brew install llvm cmake
        ```
</TabItem>
</Tabs>
**Install `rustup`**: (`rustup`) is the Rust toolchain installer, necessary as the 0G node software is written in Rust.

    ```bash
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    ```   

**Install Go**

<Tabs
  defaultValue="linux"
  values={[
    {label: 'Linux', value: 'linux'},
    {label: 'Mac', value: 'mac'},
    ]}>

  <TabItem value="linux">

        ```bash
        # Download the Go installer
        wget https://go.dev/dl/go1.23.0.linux-amd64.tar.gz

        # Extract the archive
        sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.23.0.linux-amd64.tar.gz

        # Add /usr/local/go/bin to the PATH environment variable
        export PATH=$PATH:/usr/local/go/bin
        ```
</TabItem>
  <TabItem value="mac">

        ```bash
        brew install go
        ```
</TabItem>
</Tabs>
#### 1. Download the Source Code

```bash
git clone -b v1.2.1 https://github.com/0glabs/0g-storage-kv.git
```

#### 2. Build the Source Code

```bash
cd 0g-storage-kv
git submodule update --init --recursive

# Build in release mode
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

## Running the Storage KV Node

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
</TabItem>
  <TabItem value="source" label="Storage Node CLI">

## **0G Storage (CLI) Overview**

The 0G Storage CLI  acts as your gateway to interact directly with the 0G Storage network. It simplifies the process of uploading and downloading files, as well as managing other aspects of your decentralized storage experience. The CLI translates your commands into actions that the network can interpret and execute, making it easier to control your data without needing in-depth knowledge of the underlying blockchain technology.

**Getting Started**

1.  **Download the Source Code**

    Downloads the source code for the 0G Storage CLI from the GitHub repository onto your local machine.

    ```bash
    git clone https://github.com/0glabs/0g-storage-client.git
    ```
2.  **Build the Source Code**
    
    Command to compiles the Go code into an executable binary called `0g-storage-client`, which you will use to run the CLI commands.

    ```bash
    cd 0g-storage-client
    go build
    ```
**Key Commands**

*   **File Upload**

    uploads a file to the 0G Storage network.
    ```bash
    ./0g-storage-client upload --url <blockchain_rpc_endpoint> --contract <log_contract_address> --key <private_key> --node <storage_node_rpc_endpoint> --file <file_path>
    ```
    *   **Options:**
        *   `--url`: The URL of an RPC endpoint to interact with the blockchain where the 0G smart contracts reside.
        *   `--contract`: The address of the 0G log contract on the blockchain.
        *   `--key`: Your private key, which is necessary to sign the transaction that initiates the file upload.
        *   `--node`: The RPC endpoint of a 0G storage node to handle the actual file storage. You can use the team-deployed node at `https://rpc-storage-testnet.0g.ai` or run your own node.
        *   `--file`: The path to the file you want to upload.

*   **File Download**
    
    To download a file from the 0G Storage network.

    ```bash
    ./0g-storage-client download --node <storage_node_rpc_endpoint> --root <file_root_hash> --file <output_file_path>
    ```
    *   **Options:**
        *   `--node`: The RPC endpoint of a 0G storage node where the file you want to download is stored.
        *   `--root`: The root hash of the file, a unique identifier used to locate the file on the network.
        *   `--file`: The path where you want to save the downloaded file.

*   **File Download with Verification**

   Similar to the basic download command, but it additionally requests a proof of data integrity from the storage node, ensuring the downloaded file hasn't been tampered with.

    ```bash
    ./0g-storage-client download --node <storage_node_rpc_endpoint> --root <file_root_hash> --file <output_file_path> --proof
    ```

**Important Considerations**

*   **Contract Addresses:** You need the accurate contract addresses for the 0G log contract on the specific blockchain you are using. You can find these on the 0G Storage explorer or in the official documentation.
*   **File Root Hash:** To download a file, you must have its root hash. This is provided when you upload a file or can be found by looking up your transaction on the 0G Storage explorer ([https://storagescan-newton.0g.ai/](https://storagescan-newton.0g.ai/)).
*   **Storage Node RPC Endpoint:** You can use the team-deployed storage node or run your own node for more control and the potential to earn rewards.

**Example Usage**

```bash
# Upload a file named "my_document.txt"
./0g-storage-client upload --url https://rpc-testnet.0g.ai --contract 0x123...abc --key 0x456...def --node https://rpc-storage-testnet.0g.ai --file my_document.txt

# Download a file with root hash "0x789...ghi" and save it as "downloaded_file.txt"
./0g-storage-client download --node https://rpc-storage-testnet.0g.ai --root 0x789...ghi --file downloaded_file.txt
```

**Remember:** The 0G Storage CLI is a tool for interacting with the 0G network. By understanding its commands and options, you can efficiently manage your data stored on this decentralized platform.


</TabItem>
</Tabs>
