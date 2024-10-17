---
id: op-stack-on-0g-da
title: OP Stack on 0G DA
sidebar_position: 1
---

# Run an OP Stack Rollup on 0G DA

Optimism is a high-performance Ethereum rollup that uses the Optimistic Virtual Machine (OVM) to achieve scalability and efficiency.

0G DA is a high-performance data availability layer that can be used with Optimism to provide a cost-effective and secure solution for storing transaction data.

To implement this server specification, 0G DA provides a `da-server` that runs as a sidecar process alongside the Optimism rollup node. This server connects to a 0G DA client to securely communicate with the 0G DA network.

### DA-Server Implementation

The Optimism codebase has been extended to integrate with the 0G DA `da-server`. This server utilizes the 0G DA Open API to efficiently store and retrieve rollup data.

## GitHub Repository

Find the repository for this integration at [https://github.com/0glabs/0g-da-op-plasma](https://github.com/0glabs/0g-da-op-plasma)


## Prerequisites

* Follow the instructions to set up a [0G DA client node]('../build-with-0g/da-integration')
* Set up a [0G DA encoder node]('../build-with-0g/da-integration')
* [0G 0P stack rollup kit](https://github.com/0glabs/0g-da-op-plasma)

Refer here for a more comprehensive guide: [run OP Stack with 0G DA](https://github.com/0glabs/0g-da-op-plasma/blob/main/OP%20Stack%20integration.md)

:::important note 
* This is a beta integration, and active development is ongoing
* Ensure all necessary ports are open in your firewall configuration
* Refer to the [Optimism documentation](https://docs.optimism.io/) for additional configuration options and troubleshooting:::
