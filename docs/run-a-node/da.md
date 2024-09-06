---
sidebar_position: 4
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Data Availability(DA)
## Overview

While there are various approaches to running a DA (Data Availability) node, this guide outlines our recommended method and the necessary hardware specifications. It's important to note that your DA signer needs to operate a DA node to verify encoded blob data, sign it, and store it for future farming and rewards.

## Hardware Requirements

The following table outlines the hardware requirements for different types of DA nodes:

| Node Type | Memory | CPU | Disk | Bandwidth | Additional Notes |
|-----------|--------|-----|------|-----------|------------------|
| DA Node | 16 GB | 8 cores | 1 TB NVME SSD | 100 MBps | For Download / Upload |
| DA Retriever | 8 GB | 2 cores | - | 100 MBps | For Download / Upload |
| DA Client | 8 GB | 2 cores | - | 100 MBps | For Download / Upload |
| DA Encoder | - | - | - | - | NVIDIA Drivers: 12.04 on the RTX 4090* |


*Note Other NVIDIA GPUs might require parameter adjustments and haven't been optimized yet.* 

## Additional Information
Each type of DA node plays a crucial role in the Data Availability system:
- **DA Node**: Performs the core functions of verifying, signing, and storing encoded blob data.
- **DA Retriever**: Responsible for retrieving data from the network.
- **DA Client**: Interacts with the DA layer, facilitating data operations.
- **DA Encoder**: Handles the encoding of data, utilizing GPU acceleration where available.

For detailed setup instructions and best practices for each node type, please refer to our comprehensive documentation.
<Tabs>
<TabItem value="Da-node" label="DA Node" default>

## DA Node Installation

```bash
git clone https://github.com/0glabs/0g-da-node.git
git checkout tags/v1.0.1 -b v1.0.1
cargo build --release
./dev_support/download_params.sh
```

## Configuration

Create a `config.toml` file and set the following fields to proper values:

```toml
log_level = "info"

data_path = "./db/"

# path to downloaded params folder
encoder_params_dir = "params/" 

# grpc server listen address
grpc_listen_address = "0.0.0.0:34000"
# chain eth rpc endpoint
eth_rpc_endpoint = "https://rpc-testnet.0g.ai"
# public grpc service socket address to register in DA contract
# ip:34000 (keep same port as the grpc listen address)
# or if you have dns, fill your dns
socket_address = "<public_ip/dns>:34000"

# data availability contract to interact with
da_entrance_address = ""
# deployed block number of da entrance contract
start_block_number = 0

# signer BLS private key
signer_bls_private_key = ""
# signer eth account private key
signer_eth_private_key = ""

# whether to enable data availability sampling
enable_das = "false"
```

On the first run of DA node, it will register the signer information in DA contract. To generate a BLS private key if you don't have one:

```bash
cargo run --bin key-gen
```

:::caution
Please keep the generated BLS private key carefully.
:::

## Run

```bash
./target/release/server --config config.toml
```
  </TabItem>
  <TabItem value="binary" label="DA client Node" default>

### Install dependencies

#### For Linux

```bash
sudo apt-get update
sudo apt-get install cmake 
```

#### For Mac

```bash
brew install cmake
```

### Install Go

#### For Linux

Download the Go installer:

```bash
wget https://go.dev/dl/go1.22.0.linux-amd64.tar.gz
```

Extract the archive:

```bash
rm -rf /usr/local/go && tar -C /usr/local -xzf go1.22.0.linux-amd64.tar.gz
```

Add `/usr/local/go/bin` to the PATH environment variable by adding the following line to your `~/.profile`:

```bash
export PATH=$PATH:/usr/local/go/bin
```

#### For Mac

1. Download the Go installer from [https://go.dev/dl/go1.22.0.darwin-amd64.pkg](https://go.dev/dl/go1.19.3.darwin-amd64.pkg).
2. Open the package file you downloaded and follow the prompts to install Go.

### Download the source code

```bash
git clone -b v1.0.0-testnet https://github.com/0glabs/0g-da-client.git
```

## Configuration

| Field | Description |
|-------|-------------|
| `--chain.rpc` | JSON RPC node endpoint for the blockchain network. |
| `--chain.private-key` | Hex-encoded signer private key. |
| `--chain.receipt-wait-rounds` | Maximum retries to wait for transaction receipt. |
| `--chain.receipt-wait-interval` | Interval between retries when waiting for transaction receipt. |
| `--chain.gas-limit` | Transaction gas limit. |
| `--combined-server.use-memory-db` | Whether to use mem-db for blob storage. |
| `--combined-server.storage.kv-db-path` | Path for level db. |
| `--combined-server.storage.time-to-expire` | Expiration duration for blobs in level db. |
| `--combined-server.log.level-file` | File log level. |
| `--combined-server.log.level-std` | Standard output log level. |
| `--combined-server.log.path` | Log file path. |
| `--disperser-server.grpc-port` | Server listening port. |
| `--disperser-server.retriever-address` | GRPC host for retriever. |
| `--batcher.da-entrance-contract` | Hex-encoded da-entrance contract address. |
| `--batcher.da-signers-contract` | Hex-encoded da-signers contract address. |
| `--batcher.finalizer-interval` | Interval for finalizing operations. |
| `--batcher.finalized-block-count` | Default number of blocks between finalized block and latest block. |
| `--batcher.confirmer-num` | Number of Confirmer threads. |
| `--batcher.max-num-retries-for-sign` | Number of retries before signing fails. |
| `--batcher.batch-size-limit` | Maximum batch size in MiB. |
| `--batcher.encoding-request-queue-size` | Size of the encoding request queue. |
| `--batcher.encoding-interval` | Interval between blob encoding requests. |
| `--batcher.pull-interval` | Interval for pulling from the encoded queue. |
| `--batcher.signing-interval` | Interval between slice signing requests. |
| `--batcher.signed-pull-interval` | Interval for pulling from the signed queue. |
| `--encoder-socket` | GRPC host of the encoder. |
| `--encoding-timeout` | Total time to wait for a response from encoder. |
| `--signing-timeout` | Total time to wait for a response from signer. |

## Run

### Build combined server

```bash
make build
```

### Run combined server

Update the following command by referencing the Configuration:

```bash
./bin/combined \
    --chain.rpc L1_RPC_ENDPOINT \
    --chain.private-key YOUR_PRIVATE_KEY \
    --chain.receipt-wait-rounds 180 \
    --chain.receipt-wait-interval 1s \
    --chain.gas-limit 2000000 \
    --combined-server.use-memory-db \
    --combined-server.storage.kv-db-path ./../run/ \
    --combined-server.storage.time-to-expire 2592000 \
    --disperser-server.grpc-port 51001 \
    --batcher.da-entrance-contract ENTRANCE_CONTRACT_ADDR \
    --batcher.da-signers-contract 0x0000000000000000000000000000000000001000 \
    --batcher.finalizer-interval 20s \
    --batcher.confirmer-num 3 \
    --batcher.max-num-retries-for-sign 3 \
    --batcher.finalized-block-count 50 \
    --batcher.batch-size-limit 500 \
    --batcher.encoding-interval 3s \
    --batcher.encoding-request-queue-size 1 \
    --batcher.pull-interval 10s \
    --batcher.signing-interval 3s \
    --batcher.signed-pull-interval 20s \
    --encoder-socket DA_ENCODER_SERVER \
    --encoding-timeout 300s \
    --signing-timeout 60s \
    --chain-read-timeout 12s \
    --chain-write-timeout 13s \
    --combined-server.log.level-file trace \
    --combined-server.log.level-std trace \
    --combined-server.log.path ./../run/run.log
```
  </TabItem>
  <TabItem value="source" label="DA Encoder">

## Features

- `parallel`: Uses parallel algorithms for computations, maximizing CPU resource utilization.
- `cuda`: Uses GPU for computations, applicable only on platforms with NVIDIA GPUs.

:::note
GPU support is currently tested with NVIDIA 12.04 drivers on the RTX 4090. Other NVIDIA GPUs may require parameter adjustments and have not been tuned yet.
:::

## Preparation

### Install Rust

Ensure you have curl installed.

Run the following command to install Rust:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

After installation, add the cargo bin directory to your PATH environment variable:

```bash
source $HOME/.cargo/env
```

Verify the installation:

```bash
rustc --version
```

### Install other dependencies

```bash
# Install Protocol Buffers Compiler
sudo apt-get install -y protobuf-compiler

# Install a specific nightly Rust toolchain and rustfmt
rustup toolchain install nightly-2024-02-04-x86_64-unknown-linux-gnu
rustup component add --toolchain nightly-2024-02-04-x86_64-unknown-linux-gnu rustfmt

# Add the necessary Rust target
rustup target add x86_64-unknown-linux-gnu
```

### Install CUDA (for GPU feature)

Ensure you have an NVIDIA GPU with the required drivers. Then follow the instructions from [CUDA Toolkit](https://developer.nvidia.com/cuda-toolkit).

Verify the installation:

```bash
nvidia-smi
nvcc --version
```

## Building Public Parameters

The public parameters for the cryptographic protocol are built in two steps:

### 1. Download and process the perpetual power of tau

We use the challenge_0084 file from the nearly most recent submission.

```bash
curl https://pse-trusted-setup-ppot.s3.eu-central-1.amazonaws.com/challenge_0084 -o challenge_0084
```

### 2. Build the AMT parameters

You can either construct these parameters yourself or download pre-built files.

#### Choice 1: Download the pre-built files

```bash
./dev-support/download_params.sh
```

#### Choice 2: Construct the parameters yourself

```bash
./dev_support/build_params.sh challenge_0084
```

## Running the Server

Run the server with the following command:

```bash
cargo run -r -p server --features grpc/parallel,grpc/cuda -- --config run/config.toml
```

:::note
If you do not have a CUDA environment, remove the cuda feature.
:::

DA Encoder will serve on port 34000 with specified gRPC interface.

## Using the Verification Logic

Add the following to `Cargo.toml` of your crate:

```toml
zg-encoder = { git = "https://github.com/0glabs/0g-da-encoder.git" }
```

Use the `zg_encoder::EncodedSlice::verify` function for verifying.

## Benchmark the Performance

Run the following task:

```bash
cargo bench -p grpc --features grpc/parallel,grpc/cuda --bench process_data --features zg-encoder/production_mode -- --nocapture
```

## Development and Testing

Run the following script for complete testing:

```bash
./dev_support/test.sh
```
  </TabItem>
  <TabItem value="docker" label="DA retriever">
  
## Installation

### Install Dependencies

#### For Linux

```bash
sudo apt-get update
sudo apt-get install cmake build-essential protobuf-compiler
```

#### For Mac

```bash
brew install cmake
```

### Install Rust

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### Download the Source Code

```bash
git clone https://github.com/0glabs/0g-da-retriever.git
```

## Configuration

| Field | Description |
|-------|-------------|
| log_level | Set log level. |
| grpc_listen_address | Server listening address. |
| eth_rpc_endpoint | JSON RPC node endpoint for the blockchain network. |

## Run

### Build in Release Mode

```bash
cargo build --release
```

### Run Retriever

Update configuration file `run/config.toml` as required by referencing the Configuration. Run:

```bash
./target/release/retriever --config ./run/config.toml
```
  </TabItem>
</Tabs>