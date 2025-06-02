---
id: sdk
title: Inference SDK
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

The 0G Compute Network SDK enables developers to integrate AI inference services from the 0G Compute Network into their applications. Currently, the 0G Compute Network SDK supports Large Language Model (LLM) inference services, with fine-tuning and additional features planned for future releases.

In just five minutes, you can initialize your broker to manage operations, set up and fund your account to pay for inference services, and learn how to send inference requests and handle responses.

## Features

- Easy integration with AI providers on the 0G Network with built-in billing and account management
- Compatible with OpenAI SDK format
- Support for verifiable responses

<Tabs>
<TabItem value="ts-web" label="TypeScript SDK" default>

## Installation

```bash
pnpm add @0glabs/0g-serving-broker @types/crypto-js@4.2.2 crypto-js@4.2.0
```

## Quick Start Guide

### Initialize the Broker

The broker is your main interface to the 0G Compute Network. It handles authentication, billing, and service communication.

Before initializing the broker, you need:

1. A wallet signer (implements either `JsonRpcSigner` or `Wallet` from ethers package)
2. (Optional) The contract address for the 0G Serving contract

**Option 1: Using a private key**

```typescript
const { ethers } = require("ethers");
const { createZGComputeNetworkBroker } = require("@0glabs/0g-serving-broker");

const provider = new ethers.JsonRpcProvider("https://evmrpc-testnet.0g.ai");

// Get the signer
const privateKey = "INPUT_PRIVATE_KEY_HERE";
const wallet = new ethers.Wallet(privateKey, provider);

// Initialize broker
const broker = await createZGComputeNetworkBroker(wallet);
```

**Option 2: Using a browser wallet**

```typescript
import { BrowserProvider } from "ethers";
import { createZGComputeNetworkBroker } from "@0glabs/0g-serving-broker";

async function initializeBrokerWithWallet() {
  // Ensure wallet is installed
  if (typeof window.ethereum !== "undefined") {
    // Create a provider
    const provider = new BrowserProvider(window.ethereum);

    // Get the signer
    const signer = await provider.getSigner();

    // Initialize broker
    const broker = await createZGComputeNetworkBroker(signer);
  }
}
```

> 💡 The `contractAddress` parameter is optional - the SDK uses a default address if not provided.

### Discover Available Services

The 0G Compute Network hosts multiple AI service providers. The service discovery process helps you find and select the appropriate services for your needs.

```typescript
const services = await broker.inference.listService();
```

Each service contains the following information:

```typescript
type ServiceStructOutput = {
  provider: string; // Provider's wallet address (unique identifier)
  serviceType: string; // Type of service
  url: string; // Service URL
  inputPrice: bigint; // Price for input processing
  outputPrice: bigint; // Price for output generation
  updatedAt: bigint; // Last update timestamp
  model: string; // Model identifier
  verifiability: string; // Indicates how the service's outputs can be verified. 'TeeML' means it runs with verification in a Trusted Execution Environment. An empty value means no verification.
  additionalInfo: string // Provider-defined metadata, currently used to store the provider's encrypted key, but can be extended to include other custom information in future.
};
```

Currently, we provide two official services:

1. **llama-3.3-70b-instruct**

- Provider address: `0xf07240Efa67755B5311bc75784a061eDB47165Dd`

2. **deepseek-r1-70b**

- Provider address: `0x3feE5a4dd5FDb8a32dDA97Bed899830605dBD9D3`

### Account Management

The 0G Compute Network uses a prepaid account system for each provider. Before using any services, you need to set up and fund an account for each provider you want to use.

#### Create an Account

```typescript
await broker.ledger.addLedger(initialBalance);
```

The `initialBalance` needs to be specified in OG units.

#### Add Funds

```typescript
await broker.ledger.depositFund(amount);
```

The `amount` needs to be specified in OG units.

### Acknowledge Provider
Before using a service provided by a provider, you must first acknowledge the provider on-chain by following API:

```typescript
await broker.inference.acknowledgeProviderSigner(providerAddress)
```

The `providerAddress` can be obtained from from service metadata. For details on how to retrieve it, see [Discover Available Services](#discover-available-services)

### Making Service Requests

Service usage in the 0G Network involves two key steps:

1. Retrieving service metadata
2. Generating authenticated request headers

```typescript
// Get service metadata
const { endpoint, model } = await broker.inference.getServiceMetadata(
  providerAddress
);

// Generate request headers
const headers = await broker.inference.getRequestHeaders(
  providerAddress,
  content
);
```

**Note:** Headers generated by `getRequestHeaders` are single-use only & Each request requires new headers

### Send Request

You can make requests using either the native fetch API or the OpenAI SDK.

**Using fetch:**

```typescript
const response = await fetch(`${endpoint}/chat/completions`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    ...headers,
  },
  body: JSON.stringify({
    messages: [{ role: "system", content }],
    model: model,
  }),
});
```

**Using OpenAI SDK:**

```typescript
const openai = new OpenAI({
  baseURL: endpoint,
  apiKey: "", // Leave empty
});

const completion = await openai.chat.completions.create(
  {
    messages: [{ role: "system", content }],
    model: model,
  },
  {
    headers: {
      ...headers,
    },
  }
);
```

### Response Processing

This function is used to verify the response. If it is a verifiable service, it will return whether the response is valid.

For streaming services, `content` should be the total content received from the service. And chatID can be any chat ID of the chunk.

```typescript
const valid = await broker.inference.processResponse(
  providerAddress,
  content,
  chatID // Optional: Only for verifiable services
);
```

### Fee Settlement

Fee settlement by the broker service occurs at scheduled intervals.

### Helper Functions

#### Get Account Details

This function is used to get account details (like balance) on the given provider address.

```typescript
const accountDetails = await broker.ledger.getLedger();
```

#### Request Refund

This function is used to request a refund from your account.

```typescript
await broker.ledger.retrieveFund("inference", amount);
```

</TabItem>

<TabItem value="other" label="Other SDKs">
Coming soon
</TabItem>

</Tabs>
