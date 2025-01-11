---
id: storage-cli
title: Storage CLI
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Overview

The 0G Storage CLI  acts as your gateway to interact directly with the 0G Storage network. It simplifies the process of uploading and downloading files, as well as managing other aspects of your decentralized storage experience. 

If you want more control over the data location and versioning, you can use 0G Storage CLI. This section introduces the 0G Storage CLI in detail, including subcommands for storage and kv operations, in order for users to use through the terminal. You can develop your own scripts, e.g. regular log uploading cron jobs, with the CLI tool.

### 0G Storage Web Tool

If you want a sample web based tool to upload and download your files and directories, the first simple and straightforward way is to use the [Web Tool](https://storagescan-newton.0g.ai/tool). 


## Installation

**Download the source code**

```bash
git clone https://github.com/0glabs/0g-storage-client.git
```

**Build the Source Code**
    
    Command to compile the Go code into an executable binary called `0g-storage-client`, which you will use to run the CLI commands. Make sure you install Go first

    ```bash
    cd 0g-storage-client
    go build
    ```

**Add the binary to GOPATH**

```bash
mv 0g-storage-client ~/go/bin
export PATH=~/go/bin:$PATH
```

## Key Commands

**Commands and Flags**

```
ZeroGStorage client to interact with ZeroGStorage network

Usage:
  0g-storage-client [flags]
  0g-storage-client [command]

Available Commands:
  completion  Generate the autocompletion script for the specified shell
  download    Download file from ZeroGStorage network
  gateway     Start gateway service
  gen         Generate a temp file for test purpose
  help        Help about any command
  indexer     Start indexer service
  kv-read     read kv streams
  kv-write    write to kv streams
  upload      Upload file to ZeroGStorage network

Flags:
      --gas-limit uint       Custom gas limit to send transaction
      --gas-price uint       Custom gas price to send transaction
  -h, --help                 help for 0g-storage-client
      --log-color-disabled   Force to disable colorful logs
      --log-level string     Log level (default "info")
      --web3-log-enabled     Enable log for web3 RPC

Use "0g-storage-client [command] --help" for more information about a command
```

**Help**

The command-line help listing is reproduced below for your convenience. The same information can be obtained at any time from your own client by running:

```bash
0g-storage-client --help
```


**File Upload**

    Uploads a file to the 0G Storage network.
    ```bash
    ./0g-storage-client upload --url <blockchain_rpc_endpoint> --contract <log_contract_address> --key <private_key> --node <storage_node_rpc_endpoint> --file <file_path>
    ```
    *   **Options:**
        *   `--url`: The URL of an RPC endpoint to interact with the blockchain where the 0G smart contracts reside.
        *   `--contract`: The address of the 0G log contract on the blockchain.
        *   `--key`: Your private key, which is necessary to sign the transaction that initiates the file upload.
        *   `--node`: The RPC endpoint of a 0G storage node to handle the actual file storage. You can use the team-deployed node at `https://rpc-storage-testnet.0g.ai` or run your own node.
        *   `--file`: The path to the file you want to upload.

**File Download**
    
    To download a file from the 0G Storage network.

    ```bash
    ./0g-storage-client download --node <storage_node_rpc_endpoint> --root <file_root_hash> --file <output_file_path>
    ```
    *   **Options:**
        *   `--node`: The RPC endpoint of a 0G storage node where the file you want to download is stored.
        *   `--root`: The root hash of the file, a unique identifier used to locate the file on the network.
        *   `--file`: The path where you want to save the downloaded file.

**File Download with Verification**

   Similar to the basic download command, but it additionally requests a proof of data integrity from the storage node, ensuring the downloaded file hasn't been tampered with.

    ```bash
    ./0g-storage-client download --node <storage_node_rpc_endpoint> --root <file_root_hash> --file <output_file_path> --proof
    ```

**Important Considerations**

*   **Contract Addresses:** You need the accurate contract addresses for the 0G log contract on the specific blockchain you are using. You can find these on the 0G Storage explorer or in the official documentation.
*   **File Root Hash:** To download a file, you must have its root hash. This is provided when you upload a file or can be found by looking up your transaction on the [0G Storage explorer](https://storagescan-newton.0g.ai/).
*   **Storage Node RPC Endpoint:** You can use the team-deployed storage node or run your own node for more control and the potential to earn rewards.


**Example Usage**

```bash
# Upload a file named "my_document.txt"
./0g-storage-client upload --url https://rpc-testnet.0g.ai --contract 0x123...abc --key 0x456...def --node https://rpc-storage-testnet.0g.ai --file my_document.txt

# Download a file with root hash "0x789...ghi" and save it as "downloaded_file.txt"
./0g-storage-client download --node https://rpc-storage-testnet.0g.ai --root 0x789...ghi --file downloaded_file.txt
```

## Indexer

Due to the sharding mechanism, when the entire network data volume increases, an upload or download request for a single file may need to transfer data between multiple different storage nodes, how to find suitable storage nodes may become a problem for ordinary users.

Indexer is a service used to provide storage node queries, it is usually run by groups or individuals who maintain some stable storage nodes. It returns the trusted node list it maintains or the node list discovered through the p2p network to the user.


**Remember:** The 0G Storage CLI is a tool for interacting with the 0G network. By understanding its commands and options, you can efficiently manage your data stored on this decentralized platform.

