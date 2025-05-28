---
id: sdk
title: Storage SDK
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 0G Storage SDKs
---

0G offers two Software Development Kits (SDKs) to seamlessly integrate decentralized storage into your applications:

* **Go SDK:** Ideal for backend systems and applications built with the Go programming language.
* **TypeScript SDK:** Perfect for frontend development and JavaScript-based projects.

## SDK Features

Both SDKs provide a streamlined interface to interact with the 0G Storage network, enabling you to:

* **Upload and Download Files:** Securely store and retrieve data of various sizes and formats. Note: you can also use the explorers to do so.
* **Manage Data:** List uploaded files, check their status, and control access permissions.
* **Leverage Decentralization:** Benefit from the 0G network's distributed architecture for enhanced data availability, immutability, and censorship resistance.

## Quick Start

To get started quickly, check out our starter kits:

* [**TypeScript Starter Kit**](https://github.com/0glabs/0g-storage-ts-starter-kit) - Complete examples with Express.js server and CLI tool
* [**Go Starter Kit**](https://github.com/0glabs/0g-storage-go-starter-kit) - Ready-to-use examples with Gin server and CLI tool

Both repositories include working examples, API documentation, and everything you need to start building with 0G Storage.

<Tabs>
<TabItem value="binary" label="GO SDK Integration" default>
## Overview

The 0G Go SDK enables seamless interaction with the 0G decentralized storage network. This guide will walk you through the installation, setup, and usage of the SDK, including examples of key functionalities.

## Installation

To install the 0G Storage Client library:

```bash
go get github.com/0glabs/0g-storage-client
```

**First, import the necessary packages:**

```go
import (
    "context"
    "github.com/0glabs/0g-storage-client/common/blockchain"
    "github.com/0glabs/0g-storage-client/indexer"
    "github.com/0glabs/0g-storage-client/transfer"
)
```

## Key Functionalities
### Initialization

Create the necessary clients to interact with the network:

```go
// Create Web3 client for blockchain interactions
w3client := blockchain.MustNewWeb3(evmRpc, privateKey)
defer w3client.Close()

// Create indexer client for node management
indexerClient, err := indexer.NewClient(indRpc)
if err != nil {
    // Handle error
}
```

**Parameters:**
- `evmRpc`: Ethereum RPC URL
- `privateKey`: Your Ethereum private key for signing transactions
- `indRpc`: Indexer RPC endpoint

### Node Selection

Select storage nodes before performing file operations:

```go
nodes, err := indexerClient.SelectNodes(ctx, segmentNumber, expectedReplicas, excludedNodes)
if err != nil {
    // Handle error
}
```

**Parameters:**
- `ctx`: Context for operation management
- `segmentNumber`: Identifies which storage segment to use
- `expectedReplicas`: Number of file copies to maintain (minimum 1)
- `excludedNodes`: List of nodes to exclude from selection

### File Upload

Upload files to the network:

```go
uploader, err := transfer.NewUploader(ctx, w3client, nodes)
if err != nil {
    // Handle error
}

txHash, err := uploader.UploadFile(ctx, filePath)
if err != nil {
    // Handle error
}
```

**Parameters:**
- `ctx`: Context for upload operation
- `w3client`: Web3 client instance
- `nodes`: Selected storage nodes
- `filePath`: Path to the file being uploaded

### File Hash Calculation

Calculate a file's Merkle root hash before upload, this will be used for identify file from 0G storage:

```go
rootHash, err := core.MerkleRoot(filePath)
if err != nil {
    // Handle error
}
fmt.Printf("File hash: %s\n", rootHash.String())
```

**Parameters:**
- `filePath`: Path to the file you want to hash

**Returns:**
- `rootHash`: A unique identifier for the file based on its content
  - Used for file verification
  - Required for downloading files

### File Download

Download files from the network:

```go
downloader, err := transfer.NewDownloader(nodes)
if err != nil {
    // Handle error
}

err = downloader.Download(ctx, rootHash, outputPath, withProof)
if err != nil {
    // Handle error
}
```

**Parameters:**
- `ctx`: Context for download operation
- `rootHash`: File's unique identifier (Merkle root hash)
- `outputPath`: Where to save the downloaded file
- `withProof`: Enable/disable Merkle proof verification
  - `true`: Performs verification
  - `false`: Skips verification

## Best Practices

1. **Error Handling**: Implement proper error handling and cleanup
2. **Context Management**: Use contexts for operation timeouts and cancellation
3. **Resource Cleanup**: Always close clients when done using `defer client.Close()`
4. **Verification**: Enable proof verification for sensitive files
5. **Monitoring**: Track transaction status for important uploads

## Conclusion

The 0G Go SDK provides a robust way to interact with the 0G Storage network, enabling decentralized file storage, data integrity verification, and efficient transaction management. For more detailed information, refer to the [official GitHub repository](https://github.com/0glabs/0g-storage-client).

</TabItem>
<TabItem value="tab2" label="TypeScript SDK Integration">

## Overview

The 0g-ts-sdk is a JavaScript SDK for 0g-storage, a decentralized storage platform. This guide will walk you through the installation, setup, and usage of the SDK, including examples of key functionalities.

## Installation

To install the 0g-ts-sdk and its peer dependency, use npm:

```bash
npm install @0glabs/0g-ts-sdk ethers
```

Note: `ethers` is a peer dependency of this project.

**First, import the necessary components from the SDK:**

```javascript
import { ZgFile, Indexer } from '@0glabs/0g-ts-sdk';
import { ethers } from 'ethers';
```

**Then, set up the necessary configurations:**

```javascript
// Network Constants
const RPC_URL = 'https://evmrpc-testnet.0g.ai/';
const INDEXER_RPC = 'https://indexer-storage-testnet-turbo.0g.ai';

// Initialize provider and signer
// Make sure to use a private key with sufficient balance for transactions
const privateKey = 'YOUR_PRIVATE_KEY'; // Replace with your private key
const provider = new ethers.JsonRpcProvider(RPC_URL);
const signer = new ethers.Wallet(privateKey, provider);

// Initialize indexer
const indexer = new Indexer(INDEXER_RPC);
```

## Key Functionalities

### 1. Creating a File Object and Getting Merkle Tree

The first step in uploading a file is creating a `ZgFile` object and generating its Merkle tree. This is required for file verification:

```javascript
// Create file object from file path
const file = await ZgFile.fromFilePath('<file_path>');

// Generate Merkle tree for verification
const [tree, treeErr] = await file.merkleTree();
if (treeErr !== null) {
  throw new Error(`Error generating Merkle tree: ${treeErr}`);
}

// Get root hash for future reference
console.log("File Root Hash:", tree?.rootHash() ?? '');

// Always close the file when done
await file.close();
```

### 2. Uploading Files

When uploading files, proper error handling is essential. The upload process returns both a transaction hash and potential error:

```javascript
try {
  const [tx, uploadErr] = await indexer.upload(zgFile, RPC_URL, signer);
  if (uploadErr !== null) {
    throw new Error(`Upload error: ${uploadErr}`);
  }
  console.log("Upload successful!");
  console.log("Transaction Hash:", tx);
} catch (error) {
  console.error("Upload error:", error instanceof Error ? error.message : error);
}
```

### 3. Downloading Files

For downloading, you need the root hash of the file. The download process supports optional proof verification:

```javascript
try {
  // withProof = true enables Merkle proof verification
  const err = await indexer.download(rootHash, outputPath, true);
  if (err !== null) {
    throw new Error(`Download error: ${err}`);
  }
  console.log("Download successful!");
} catch (error) {
  console.error("Download error:", error instanceof Error ? error.message : error);
}
```

### 4. Uploading Data to 0g-kv

**To upload data to 0g-kv:**

```javascript
const [nodes, err] = await indexer.selectNodes(1);
if (err !== null) {
    console.log("Error selecting nodes: ", err);
    return;
}

const batcher = new Batcher(1, nodes, flowContract, evmRpc);

const key1 = Uint8Array.from(Buffer.from("TESTKEY0", 'utf-8'));
const val1 = Uint8Array.from(Buffer.from("TESTVALUE0", 'utf-8'));
batcher.streamDataBuilder.set("0x...", key1, val1);

const [tx, batchErr] = await batcher.exec();
if (batchErr === null) {
    console.log("Batcher executed successfully, tx: ", tx);
} else {
    console.log("Error executing batcher: ", batchErr);
}
```

### 5. Downloading Data from 0g-kv

**To download data from 0g-kv:**

```javascript
const KvClientAddr = "http://3.101.147.150:6789"
const streamId = "0x..."
const kvClient = new KvClient(KvClientAddr)

let val = await kvClient.getValue(streamId, ethers.encodeBase64(key1));
console.log(val)
```

### 6. Working with Browser Environment

**For browser environments, import the SDK in your HTML file:**

```html
<script type="module">
  import { Blob, Indexer } from "./dist/zgstorage.esm.js";
  // Your code here...
</script>
```

**Create a file object from a blob:**

```javascript
const file = new Blob(blob);
const [tree, err] = await file.merkleTree();
if (err === null) {
  console.log("File Root Hash: ", tree.rootHash());
}
```
### Working with Streams

**The SDK also supports working with streams for efficient data 
handling:**

```typescript
import { Readable } from 'stream';

// Create a readable stream
const readableStream = new Readable();
readableStream.push('Hello, 0G Storage!');
readableStream.push(null);

// Upload using a stream
const streamRoot = await client.uploadStream(readableStream, 'example.
txt');
console.log("Stream uploaded with root hash:", streamRoot);

// Download as a stream
const downloadStream = await client.downloadFileAsStream(streamRoot);
downloadStream.pipe(process.stdout);
```

## Best Practices

1. **Initialize Once**: Create the indexer once and reuse it for multiple operations.
2. **Handle Errors**: Always implement proper error handling to manage network issues or other potential problems.
3. **Use Appropriate Methods**: Use `ZgFile.fromFilePath` for Node.js environments and `Blob` for browser environments.
4. **Secure Keys**: Never expose your private key in client-side code. Use secure methods to manage and store keys.
5. **Close Files**: Remember to call `file.close()` after operations to free up resources.

## Conclusion

The 0g-ts-sdk provides a powerful and flexible way to interact with the 0G Storage network. By following this guide, you should now be able to perform basic and advanced operations using the SDK. For more detailed information and updates, always refer to the [official GitHub repository](https://github.com/0glabs/0g-ts-sdk).

</TabItem>
</Tabs>
