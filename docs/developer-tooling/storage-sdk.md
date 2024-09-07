
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 0G Storage SDKs

0G offers two Software (SDKs) to seamlessly integrate decentralised storage into your applications:

* **Go SDK:** Ideal for backend systems and applications built with the Go programming language.
* **TypeScript SDK:** Perfect for frontend development and JavaScript-based projects.

Both SDKs provide a streamlined interface to interact with the 0G Storage network, enabling you to:

* **Upload and Download Files:** Securely store and retrieve data of various sizes and formats.
* **Manage Data:** List uploaded files, check their status, and control access permissions.
* **Leverage Decentralisation:** Benefit from the 0G network's distributed architecture for enhanced data availability, immutability, and censorship resistance.
<Tabs>
  <TabItem value="binary" label="GO SDK Integration" default>
## Getting Started with the Go SDK

### 1. Installation

Download and install 0G Storage Client library, which provides the Go SDK functionalities, from the GitHub repository.

```bash
go get github.com/0glabs/0g-storage-client
```

### 2. Initialisation

imports the necessary packages, including the 0G Storage Client library and creates a new `storage.Client` instance, providing it with the required configuration parameters:

```go
import (
    "context"
    "github.com/0glabs/0g-storage-client"
)

func main() {
    // ... (Obtain necessary configuration parameters: network endpoint, contract addresses, private key)

    client, err := storage.NewClient(context.Background(), networkEndpoint, logContractAddress, privateKey)
    if err != nil {
        // Handle error
    }

    // ... (Use the client to interact with the 0G Storage network)
}
```

* `context.Background()`: Creates a background context for managing the lifecycle of the client's operations.
* `networkEndpoint`: The URL of the 0G network's RPC endpoint.
* `logContractAddress`: The address of the 0G Log Contract on the blockchain.
* `privateKey`: Your private key, used for authentication and transaction signing.

The `if err != nil` block handles any potential errors during client creation. Once the client is successfully created, you can use it to interact with the 0G Storage network.

### 3. Uploading a File

utilise the `client.UploadFile` method to upload the file specified by `filePath` to the 0G network. The method returns the `fileRoot` (the unique identifier or hash of the uploaded file) and an error if any occurred during the upload process. The `if err != nil` block handles potential errors. If the upload is successful, the `fileRoot` is printed, which you'll need to retrieve the file later.

```go
fileRoot, err := client.UploadFile(filePath)
if err != nil {
    // Handle error
}

fmt.Println("File uploaded with root hash:", fileRoot)
```

### 4. Downloading a File

uses the `client.DownloadFile` method to download a file from the 0G network. You need to provide the `fileRoot` (obtained during the upload) and the `outputFilePath` where you want to save the downloaded file. The method returns an error if any occurred during the download. The `if err != nil` block handles potential errors. If the download is successful, a success message is printed.

```go
err := client.DownloadFile(fileRoot, outputFilePath)
if err != nil {
    // Handle error
}

fmt.Println("File downloaded successfully!")
```
</TabItem>
  <TabItem value="source" label="TypeScript SDK Integration">

## Getting Started with the TypeScript SDK

### 1. Installation

Install the 0G TypeScript SDK package from the npm registry, making it available for use in your TypeScript or JavaScript project.

```bash
npm install @0glabs/ts-sdk
```
### 2. Initialisation

Import the `ZGStorageClient` class from the 0G TypeScript SDK. then creates a new instance of the `ZGStorageClient`, providing it with the necessary configuration parameters. The `await client.init()` call initialises the client, establishing the connection to the 0G network and preparing it for further interactions.

```typescript
import { ZGStorageClient } from '@0glabs/ts-sdk';

async function main() {
    // ... (Obtain necessary configuration parameters)

    const client = new ZGStorageClient(networkEndpoint, logContractAddress, privateKey);
    await client.init();

    // ... (Use the client to interact with the 0G Storage network)
}

main();
```

### 3. Uploading a File

Use the `client.uploadFile` method to upload the file specified by `filePath`. The `await` keyword ensures that the upload operation completes before proceeding. The method returns a Promise that resolves to the `fileRoot` (the unique identifier of the uploaded file). The `fileRoot` is then logged to the console.

```typescript
const fileRoot = await client.uploadFile(filePath);
console.log("File uploaded with root hash:", fileRoot);
```

### 4. Downloading a File

Download a file using the `client.downloadFile` method. You need to provide the `fileRoot` (obtained during upload) and the `outputFilePath` where you want to save the downloaded file. The `await` keyword ensures the download operation completes before proceeding. Upon successful download, a success message is logged to the console.

```typescript
await client.downloadFile(fileRoot, outputFilePath);
console.log("File downloaded successfully!");
```
  </TabItem>
</Tabs>

## Access Storage through CLI

There are two ways a user can access the 0G Storage System. The first simple and straightforward way is to use the web tool. If a user wants more control on the data location and versioning, he can use 0G Storage CLI to easily upload/download data to 0G Storage System. This section introduces the 0G Storage CLI in detail, including subcommands for storage and kv operations, in order for users to use through the terminal. Users can develop their own scripts, e.g. regular log uploading cron jobs, with the CLI tool.

### Installation

**Download the source code**

```bash
git clone https://github.com/0glabs/0g-storage-client.git
```

**Build the binary (make sure you install go first)**

```bash
cd 0g-storage-client
go build
```

**Add the binary to GOPATH**

```bash
mv 0g-storage-client ~/go/bin
export PATH=~/go/bin:$PATH
```

### Command Line Entrance

The command-line help listing is reproduced below for your convenience. The same information can be obtained at any time from your own client by running:

```bash
0g-storage-client --help
```

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

### Indexer

Due to the sharding mechanism, when the entire network data volume increases, an upload or download request for a single file may need to transfer data between multiple different storage nodes, how to find suitable storage nodes may become a problem for ordinary users.

Indexer is a service used to provide storage node queries, it is usually run by groups or individuals who maintain some stable storage nodes. It returns the trusted node list it maintains or the node list discovered through the p2p network to the user.