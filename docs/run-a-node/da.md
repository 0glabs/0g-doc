---
sidebar_position: 4
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Data Availability (DA) Node
---
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

## Step 1: Clone and Build the Repository

1. Open a terminal or command prompt.
2. Clone the repository and checkout the specific version:

   ```
   git clone https://github.com/0glabs/0g-da-node.git
   cd 0g-da-node
   git checkout tags/v1.1.2 -b v1.1.2
   ```

3. Build the project:

   ```
   cargo build --release
   ```

4. Download necessary parameters:

   ```
   ./dev_support/download_params.sh
   ```

## Step 2: Generate BLS Private Key (if needed)

If you don't have a BLS private key, generate one:

```
cargo run --bin key-gen
```

Keep the generated BLS private key secure.

## Step 3: Configure the Node

1. Create a configuration file named `config.toml` in the project root directory.
2. Add the following content to the file, adjusting values as needed:

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
   da_entrance_address = "0x857C0A28A8634614BB2C96039Cf4a20AFF709Aa9" # testnet config
   # deployed block number of da entrance contract
   start_block_number = 940000 # testnet config

   # signer BLS private key
   signer_bls_private_key = ""
   # signer eth account private key
   signer_eth_private_key = ""
   # miner eth account private key, (could be the same as `signer_eth_private_key`, but not recommended)
   miner_eth_private_key = ""

   # whether to enable data availability sampling
   enable_das = "true"
   ```

   Make sure to fill in the `signer_bls_private_key`, `signer_eth_private_key`, and `miner_eth_private_key` fields with your actual private keys.

## Step 4: Run the Node

Start the 0g DA node using the following command:

```
./target/release/server --config config.toml
```

This will start the node using the configuration file you created.

## Step 5: Verify the Node is Running

On the first run, the DA node will register the signer information in the DA contract. You can monitor the console output to ensure the node is running correctly and has successfully registered.

## Node Operations

As a DA node operator, your node will perform the following tasks:
- Encoded blob data verification
- Signing of verified data
- Storing blob data for further farming
- Receiving rewards for these operations

## Troubleshooting

- If you encounter any issues, check the console output for error messages.
- Ensure that the ports specified in your `config.toml` file are not being used by other applications.
- Verify that you have the latest stable version of Rust installed.
- Make sure your system meets the minimum hardware requirements.

## Conclusion

You have now successfully set up and run a 0g DA node as a DA Signer. For more advanced configuration options and usage instructions, please refer to the official GitHub repository.

Remember to keep your private keys secure and regularly update your node software to ensure optimal performance and security.
  </TabItem>
  <TabItem value="binary" label="DA Client" default>
## DA Client Node Installation

**1. Clone the DA Client Node Repo:** 

```bash
git clone https://github.com/0glabs/0g-da-client.git
```
**2. Build the Docker Image:** 

```bash
cd 0g-da-client
docker build -t 0g-da-client -f combined.Dockerfile .
```

**3. Set Environment Variables:**

Create a file named `envfile.env` with the following content. Be sure you paste in your private key.
```bash
# envfile.env
COMBINED_SERVER_CHAIN_RPC=https://evmrpc-testnet.0g.ai
COMBINED_SERVER_PRIVATE_KEY=YOUR_PRIVATE_KEY
ENTRANCE_CONTRACT_ADDR=0x857C0A28A8634614BB2C96039Cf4a20AFF709Aa9

COMBINED_SERVER_RECEIPT_POLLING_ROUNDS=180
COMBINED_SERVER_RECEIPT_POLLING_INTERVAL=1s
COMBINED_SERVER_TX_GAS_LIMIT=2000000
COMBINED_SERVER_USE_MEMORY_DB=true
COMBINED_SERVER_KV_DB_PATH=/runtime/
COMBINED_SERVER_TimeToExpire=2592000
DISPERSER_SERVER_GRPC_PORT=51001
BATCHER_DASIGNERS_CONTRACT_ADDRESS=0x0000000000000000000000000000000000001000
BATCHER_FINALIZER_INTERVAL=20s
BATCHER_CONFIRMER_NUM=3
BATCHER_MAX_NUM_RETRIES_PER_BLOB=3
BATCHER_FINALIZED_BLOCK_COUNT=50
BATCHER_BATCH_SIZE_LIMIT=500
BATCHER_ENCODING_INTERVAL=3s
BATCHER_ENCODING_REQUEST_QUEUE_SIZE=1
BATCHER_PULL_INTERVAL=10s
BATCHER_SIGNING_INTERVAL=3s
BATCHER_SIGNED_PULL_INTERVAL=20s
BATCHER_EXPIRATION_POLL_INTERVAL=3600
BATCHER_ENCODER_ADDRESS=DA_ENCODER_SERVER
BATCHER_ENCODING_TIMEOUT=300s
BATCHER_SIGNING_TIMEOUT=60s
BATCHER_CHAIN_READ_TIMEOUT=12s
BATCHER_CHAIN_WRITE_TIMEOUT=13s
```   



**4. Run the Docker Node:**

```bash
docker run -d --env-file envfile.env --name 0g-da-client -v ./run:/runtime -p 51001:51001 0g-da-client combined 
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

1. Install Dependencies

***For Linux***

```bash
sudo apt-get update
sudo apt-get install cmake build-essential protobuf-compiler
```

***For Mac***

```bash
brew install cmake
```

2. Install Rust

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

3. Download the source code from our github.

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
<TabItem value="signer" label="DA Signers">

# DA Signers

The DASigners contract is an interface through which Solidity contracts can interact with the 0G chain module DASigners. It is registered as a precompiled contract, similar to other precompiled EVM extensions.

# Becoming a DA Signer and Running a 0g DA Node

You can use the DA node installation guide found [here](run-a-node/da.md) To become a DA Signer and run your own DA node you can also our repository: [0G DA node](https://github.com/0glabs/0g-da-node)

## Becoming a DA Signer

To become a DA signer, you must:
1. Have sufficient delegations (10 A0GI) to validators
2. Register your signer information in the DASigners precompile contract

Registration can be automated by operating a DA node. See the DASigners documentation for more details.
## Prerequisites

Ensure you have the following installed on your system:

- Git
- Rust (latest stable version)
- Cargo (comes with Rust)

## Contract Details

**Address**: `0x0000000000000000000000000000000000001000`

### Contract Params (Testnet)

```
TokensPerVote = 10
MaxVotesPerSigner = 1024
MaxQuorums = 10
EpochBlocks = 5760
EncodedSlices = 3072
```

## Terminology

### Signer

A Signer is an address with sufficient delegations (at least `TokensPerVote` A0GI) registered in the DASigners module. Each signer should run a DA node to verify DA blob encoding and generate BLS signatures for signed blobs. The BLS curve used is BN254, and the public keys of signers are registered in the contract.

**Note**: For accounts with delegations to more than 10 validators, only 10 of these delegations are counted and accumulated.

### Epoch

The consecutive blocks in the 0g chain are divided into groups of `EpochBlocks`, and each group is an epoch.

### Quorum

In an epoch, there can be up to `MaxQuorums` quorums. Each quorum is a list of signer addresses with size `EncodedSlices`. The i-th signer in the quorum is responsible for validating, signing, and storing the i-th row of the encoded blob data assigned to this quorum.

### Vote

Signers can submit their signatures on a registration message to request joining the quorums in the next epoch. At the start of each epoch, the DASigners module calculates the voting power for registered signers based on their delegated token amounts. Each delegated `TokensPerVote` A0GI counts as one vote, and each signer can have up to `MaxVotesPerSigner` votes. All votes are then randomly ordered and distributed into quorums.

## Interface

Find the Solidity interface in the [0g-da-contract repo](https://github.com/0glabs/0g-da-contract).

## ABI

Find the ABI in the [0g-chain repo](https://github.com/0glabs/0g-chain).

## Transactions

### registerSigner

Register signer's information, including signer address, DA node service socket address, signer BLS public key on G1 and G2 group, and a signature signed by the BLS private key of the following message:

```
Keccak256(signerAddress, chainID, "0G_BN254_Pubkey_Registration")
```

Here `chainID` is left-padded to 32 bytes by zeros.

```solidity
function registerSigner(
    SignerDetail memory _signer, 
    BN254.G1Point memory _signature
) external;
```

### updateSocket

Update signer's socket address.

```solidity
function updateSocket(string memory _socket) external;
```

### registerNextEpoch

Register to join the quorums in the next epoch. The signer needs to submit a signature signed by their BLS private key:

```
Keccak256(signerAddress, epoch, chainID)
```

Here `chainID` is left-padded to 32 bytes by zeros and `epoch` is an unsigned 64-bit number in big-endian format.

```solidity
function registerNextEpoch(BN254.G1Point memory _signature) external;
```

## Queries

### epochNumber

Get the current epoch number.

```solidity
function epochNumber() external view returns (uint);
```

### quorumCount

Get the number of quorums for a given epoch.

```solidity
function quorumCount(uint _epoch) external view returns (uint);
```

### isSigner

Check if a given address is a registered signer.

```solidity
function isSigner(address _account) external view returns (bool);
```

### getSigner

Get the information of given signers.

```solidity
function getSigner(address[] memory _account) external view returns (SignerDetail[] memory);
```

### getQuorum

Get the signer list of a given epoch and quorum id.

```solidity
function getQuorum(uint _epoch, uint _quorumId) external view returns (address[] memory);
```

### getQuorumRow

Get the signer of a specific row in a given epoch and quorum id.

```solidity
function getQuorumRow(uint _epoch, uint _quorumId, uint32 _rowIndex) external view returns (address);
```

### registeredEpoch

Check if a given address is registered to join the given epoch.

```solidity
function registeredEpoch(address _account, uint _epoch) external view returns (bool);
```

### getAggPkG1

Get the aggregated G1 public key for a given signers set. The signers set is specified by the epoch, quorum id, and a bitmap. The bitmap has `EncodedSlices` bits, and each bit denotes whether the row is chosen or not.

```solidity
function getAggPkG1(
    uint _epoch,
    uint _quorumId,
    bytes memory _quorumBitmap
) external view returns (BN254.G1Point memory aggPkG1, uint total, uint hit);
```
  </TabItem>
</Tabs>
