---
id: op-stack-on-0g-da
title: OP Stack on 0G DA
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Run an OP Stack Rollup on 0G DA

Optimism is a lightning-fast Ethereum L2 blockchain, built with the OP Stack.

0G DA is a high-performance data availability layer that can be used with Optimism to provide a cost-effective and secure solution for storing transaction data.

## OP 0G implementation

To implement this server specification, 0G DA provides a `da-server` that runs as a sidecar process alongside the OP Stack rollup node. This server connects to a 0G DA client to securely communicate with the 0G DA network.

Below are the requisite steps to deploy an OP Stack rollup on 0G DA, which the following documentation will walk you through:

* Follow the instructions to set up a [0G DA client node]('../build-with-0g/da-integration')
* Set up a [0G DA encoder node]('../build-with-0g/da-integration')
* Deploy a 0G DA Server as shown below
* Deploy the OP Stack components with configuation adjustments as shown below

## GitHub Repository

Find the repository for this integration at [https://github.com/0glabs/0g-da-op-plasma](https://github.com/0glabs/0g-da-op-plasma)

The Optimism codebase has been extended to integrate with the 0G DA `da-server`. This server utilizes the 0G DA Open API to efficiently store and retrieve rollup data.


## Deployment Steps

### 1. Deploy DA Server

<Tabs>
  <TabItem value="docker" label="Run with Docker" default>
    **Build the Docker image:**

    ```bash
    docker build -t 0g-da-op-plasma .
    ```

    **Run the Docker container:**

    Adjust commands and parameters as required for your setup:

    ```bash
    docker run -p 3100:3100 0g-da-op-plasma:latest da-server --addr 0.0.0.0 --port 3100 --zg.server 127.0.0.1:51001
    ```
 </TabItem>

  <TabItem value="source" label="Build from Source">
    **Build DA Server**

    ```bash
        make da-server
    ```

    **Run DA Server**
    ```bash
        ./bin/da-server --addr 127.0.0.1 --port 3100 --zg.server 127.0.0.1:51001
    ```

  </TabItem>
</Tabs>

0G DA DA-server accepts the following flags for 0G DA storage using
[0G DA Open API](https://docs.0g.ai/0g-doc/docs/0g-da/rpc-api/api-1)

````
    --zg.server    (default: "localhost:51001") 
        0G DA client server endpoint
    
    --addr
        server listening address
    
    --port
        server listening port
````

### 2. Deploy DA Client and DA Encoder

    For guidance on setting up a 0G DA client and DA Encoder, refer to the [DA integration documentation]('../build-with-0g/da-integration').


### 3. Deploying OP Stack

Next deploy the OP Stack components according to the official OP Stack deployment docs, but with the following modifications:

**op-node rollup.json configuration**

In the op-node rollup.json configuration the following should be set:
```
{
  "plasma_config": {
    "da_challenge_contract_address": "0x0000000000000000000000000000000000000000",
    "da_commitment_type": "GenericCommitment",
    "da_challenge_window": 300,
    "da_resolve_window": 300
  }
}
```

**op-node CLI configuration**

The following configuration values should be set to ensure proper communication between op-node and da-server.

```
    --plasma.enabled=true
    --plasma.da-server=http://localhost:3100
    --plasma.verify-on-read=false
    --plasma.da-service=true
```

**op-batcher CLI configuration**

The following configuration values should be set accordingly to ensure proper communication between OP Batcher and da-server.

```
    --plasma.enabled=true
    --plasma.da-server=http://localhost:3100
    --plasma.verify-on-read=false
    --plasma.da-service=true
```


:::important note 
* This is a beta integration, and active development is ongoing
* Ensure all necessary ports are open in your firewall configuration
* Refer to the [Optimism documentation](https://docs.optimism.io/) for additional configuration options and troubleshooting
:::
