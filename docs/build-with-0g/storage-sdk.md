---
id: storage-sdk
title: Storage SDK
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 0G Storage SDKs
---

0G offers two Software (SDKs) to seamlessly integrate decentralized storage into your applications:

* **Go SDK:** Ideal for backend systems and applications built with the Go programming language.
* **TypeScript SDK:** Perfect for frontend development and JavaScript-based projects.

Both SDKs provide a streamlined interface to interact with the 0G Storage network, enabling you to:

* **Upload and Download Files:** Securely store and retrieve data of various sizes and formats. Note: you can also use the explorers to do so.
* **Manage Data:** List uploaded files, check their status, and control access permissions.
* **Leverage Decentralization:** Benefit from the 0G network's distributed architecture for enhanced data availability, immutability, and censorship resistance.
<Tabs>
<TabItem value="binary" label="GO SDK Integration" default>

## Getting Started with the Go SDK

### 1. Installation

Download and install 0G Storage Client library, which provides the Go SDK functionalities, from the GitHub repository.

```bash
go get github.com/0glabs/0g-storage-client
```

### 2. Initialization

Imports the necessary packages, including the 0G Storage Client library and creates a new `storage.Client` instance, providing it with the required configuration parameters:

```go
import (
    "context"
    "github.com/0glabs/0g-storage-client"
)

func main() {
    // ... (Obtain necessary configuration parameters: network endpoint, contract addresses, private key)

    client, err := storage.NewClient(context.Background(), networkEndpoint, flowContractAddress, privateKey)
    if err != nil {
        // Handle error
    }

    // ... (Use the client to interact with the 0G Storage network)
}
```

* `context.Background()`: Creates a background context for managing the lifecycle of the client's operations.
* `networkEndpoint`: The URL of the 0G network's RPC endpoint.
* `flowContractAddress`: The address of the 0G Flow Contract on the blockchain.
* `privateKey`: Your private key, used for authentication and transaction signing.

The `if err != nil` block handles any potential errors during client creation. Once the client is successfully created, you can use it to interact with the 0G Storage network.

### 3. Uploading a File

Utilize the `client.UploadFile` method to upload the file specified by `filePath` to the 0G network. The method returns the `fileRoot` (the unique identifier or hash of the uploaded file) and an error if any occurred during the upload process. The `if err != nil` block handles potential errors. If the upload is successful, the `fileRoot` is printed, which you'll need to retrieve the file later.

```go
fileRoot, err := client.UploadFile(filePath)
if err != nil {
    // Handle error
}

fmt.Println("File uploaded with root hash:", fileRoot)
```

### 4. Downloading a File

Uses the `client.DownloadFile` method to download a file from the 0G network. You need to provide the `fileRoot` (obtained during the upload) and the `outputFilePath` where you want to save the downloaded file. The method returns an error if any occurred during the download. The `if err != nil` block handles potential errors. If the download is successful, a success message is printed.

```go
err := client.DownloadFile(fileRoot, outputFilePath)
if err != nil {
    // Handle error
}

fmt.Println("File downloaded successfully!")
```
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
import { ZgFile, Indexer, getFlowContract } from '@0glabs/0g-ts-sdk';
import { ethers } from 'ethers';
```

**Then, set up the necessary configurations:**

```javascript
const evmRpc = 'https://evmrpc-testnet.0g.ai/';
const privateKey = ''; // Add your private key with balance to pay for gas
const flowAddr = "0xbD2C3F0E65eDF5582141C35969d66e34629cC768"; 
// The flowAddr can be either Turbo or Standard. Turbo (0xbD2C3F0E65eDF5582141C35969d66e34629cC768) is faster but more expensive, Standard (0x0460aA47b41a66694c0a73f667a1b795A5ED3556) is cheaper but slower. Check testnet page for the latest info.

const indRpc = 'https://indexer-storage-testnet-standard.0g.ai';

const provider = new ethers.JsonRpcProvider(evmRpc);
const signer = new ethers.Wallet(privateKey, provider);
const flowContract = getFlowContract(flowAddr, signer);
const indexer = new Indexer(indRpc);
```


## Key Functionalities

### 1. Creating a File Object and Getting Merkle Tree

To create a file object and get its Merkle tree:

```javascript
const file = await ZgFile.fromFilePath('<file_path>');
const [tree, err] = await file.merkleTree();
console.log("File Root Hash: ", tree.rootHash());
await file.close();
```

### 2. Uploading Files

**To upload a file to the 0G Storage network:**

```javascript
const [tx, err] = await indexer.upload(file, 0, evmRpc, signer, flowAddr);
if (err === null) {
  console.log("File uploaded successfully, tx: ", tx);
} else {
  console.log("Error uploading file: ", err);
}
```

### 3. Downloading Files

**To download a file from the 0G Storage network:**

```javascript
const err = await indexer.download('<root_hash>', '<output_file>', <with_proof>);
if (err !== null) {
  console.log("Error downloading file: ", err);
} else {
  console.log("File downloaded successfully");
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

### Working with Browser Environment

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
### Error Handling

**Always implement proper error handling in your code:**

```javascript
try {
    const [tx, err] = await indexer.upload(file, 0, evmRpc, signer, flowAddr);
    if (err === null) {
        console.log("File uploaded successfully, tx: ", tx);
    } else {
        throw err;
    }
} catch (error) {
    console.error("Error uploading file: ", error);
}
```
### Working with Streams

**The SDK also supports working with streams for efficient data handling:**

```typescript
import { Readable } from 'stream';

// Create a readable stream
const readableStream = new Readable();
readableStream.push('Hello, 0G Storage!');
readableStream.push(null);

// Upload using a stream
const streamRoot = await client.uploadStream(readableStream, 'example.txt');
console.log("Stream uploaded with root hash:", streamRoot);

// Download as a stream
const downloadStream = await client.downloadFileAsStream(streamRoot);
downloadStream.pipe(process.stdout);
```
## Best Practices

1. **Initialize Once**: Create the indexer and flow contract once and reuse them for multiple operations.
2. **Handle Errors**: Always implement proper error handling to manage network issues or other potential problems.
3. **Use Appropriate Methods**: Use `ZgFile.fromFilePath` for Node.js environments and `Blob` for browser environments.
4. **Secure Keys**: Never expose your private key in client-side code. Use secure methods to manage and store keys.
5. **Close Files**: Remember to call `file.close()` after operations to free up resources.

## Conclusion

The 0g-ts-sdk provides a powerful and flexible way to interact with the 0G Storage network. By following this guide, you should now be able to perform basic and advanced operations using the SDK. For more detailed information and updates, always refer to the [official GitHub repository](https://github.com/0glabs/0g-ts-sdk).

</TabItem>
</Tabs>
