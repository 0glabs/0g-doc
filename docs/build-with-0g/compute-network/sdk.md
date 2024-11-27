---
id: sdk
title: SDK
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You can integrate the services provided by our provider into their own products using our SDK.

<Tabs>
<TabItem value="ts-web" label="TypeScript SDK" default>

### Step 1: Install the dependency

To get started, you need to install the `@0glabs/0g-serving-broker` package:

```bash
pnpm add @0glabs/0g-serving-broker @types/crypto-js@4.2.2 crypto-js@4.2.0
```

### Step 2: Initialize a Broker Instance

The broker instance is initialized with a `signer`. This signer is an instance that implements the ethers.js Signer interface and is used to sign transactions for a specific Ethereum account. You can create this instance using your private key via the ethers.js library or use a wallet framework tool like [wagmi](https://wagmi.sh/react/guides/ethers) to initialize the signer.

```typescript
import { createZGServingNetworkBroker } from "@0glabs/0g-serving-broker";

/**
 * createZGServingNetworkBroker is used to initialize ZGServingUserBroker
 *
 * @param signer - Signer from ethers.js.
 * @param contractAddress - 0G Serving contract address, use default address if not provided.
 *
 * @returns broker instance.
 *
 * @throws An error if the broker cannot be initialized.
 */
const broker = await createZGServingNetworkBroker(signer);
```

### Step 3: List Available Services

You can retrieve a list of services.

```typescript
/**
 * Retrieves a list of services from the contract.
 *
 * @returns {Promise<ServiceStructOutput[]>} A promise that resolves to an array of ServiceStructOutput objects.
 * @throws An error if the service list cannot be retrieved.
 *
 * type ServiceStructOutput = {
 *   provider: string;  // Address of the provider
 *   name: string;      // Name of the service
 *   serviceType: string;
 *   url: string;
 *   inputPrice: bigint;
 *   outputPrice: bigint;
 *   updatedAt: bigint;
 *   model: string;
 * };
 */
const services = await broker.listService();
```

### Step 4: Manage Accounts

Before using the provider's services, you need to create an account specifically for the chosen provider. The provider checks the account balance before responding to requests. If the balance is insufficient, the request will be denied.

#### 4.1 Create an Account

```typescript
/**
 * Adds a new account to the contract.
 *
 * @param providerAddress - The address of the provider for whom the account is being created.
 * @param balance - The initial balance to be assigned to the new account.
 *
 * @throws  An error if the account creation fails.
 */
await broker.addAccount(providerAddress, balance);
```

#### 4.2 Deposit Funds into the Account

```typescript
/**
 * Deposits a specified amount of funds into the given account.
 *
 * @param {string} account - The account identifier where the funds will be deposited.
 * @param {string} amount - The amount of funds to be deposited.
 *
 * @throws  An error if the deposit fails.
 */
await broker.depositFund(providerAddress, amount);
```

### Step 5: Use the Provider's Services

#### 5.1 Get Service metadata

```typescript
/**
 * Generates request metadata for the provider service.
 * Includes:
 * 1. Request endpoint for the provider service
 * 2. Model information for the provider service
 *
 * @param providerAddress - The address of the provider.
 * @param svcName - The name of the service.
 *
 * @returns { endpoint, model } - Object containing endpoint and model.
 *
 * @throws An error if errors occur during the processing of the request.
 */
const { endpoint, model } = await broker.getRequestMetadata(
  providerAddress,
  serviceName
);
```

#### 5.2 Get Request Headers

```typescript
/**
 * getRequestHeaders generates billing-related headers for the request
 * when the user uses the provider service.
 *
 * In the 0G Serving system, a request with valid billing headers
 * is considered a settlement proof and will be used by the provider
 * for contract settlement.
 *
 * @param providerAddress - The address of the provider.
 * @param svcName - The name of the service.
 * @param content - The content being billed. For example, in a chatbot service, it is the text input by the user.
 *
 * @returns headers. Records information such as the request fee and user signature.
 *
 * @throws An error if errors occur during the processing of the request.
 */
const headers = await broker.getRequestHeaders(
  providerAddress,
  serviceName,
  content
);
```

#### 5.3 Send Request

After obtaining the `endpoint`, `model`, and `headers`, you can use client SDKs
compatible with the OpenAI interface to make requests.

```typescript
/**
 * Use OpenAI TS SDK
 */
const openai = new OpenAI({
  baseURL: endpoint,
  apiKey: "",
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

/**
 * Use fetch
 */
await fetch(`${endpoint}/chat/completions`, {
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

#### 5.4 Process Responses

```typescript
/**
 * processResponse is used after the user successfully obtains a response from the provider service.
 *
 * It will settle the fee for the response content. Additionally, if the service is verifiable,
 * input the chat ID from the response and processResponse will determine the validity of the
 * returned content by checking the provider service's response and corresponding signature associated
 * with the chat ID.
 *
 * @param providerAddress - The address of the provider.
 * @param svcName - The name of the service.
 * @param content - The main content returned by the service. For example, in the case of a chatbot service,
 * it would be the response text.
 * @param chatID - Only for verifiable services. You can provide the chat ID obtained from the response to
 * automatically download the response signature. The function will verify the reliability of the response
 * using the service's signing address.
 *
 * @returns A boolean value. True indicates the returned content is valid, otherwise it is invalid.
 *
 * @throws An error if any issues occur during the processing of the response.
 */
const valid = await broker.processResponse(
  providerAddress,
  serviceName,
  content,
  chatID
);
```

#### 5.5 Settle Fees Manually

```typescript
/**
 * settleFee is used to settle the fee for the provider service.
 *
 * Normally, the fee for each request will be automatically settled in processResponse.
 * However, if processResponse fails due to network issues or other reasons,
 * you can manually call settleFee to settle the fee. The unit of the fee is neuron.
 * 1 A0GI = 1e18 neuron.
 *
 * @param providerAddress - The address of the provider.
 * @param svcName - The name of the service.
 * @param fee - The fee to be settled.
 *
 * @returns A promise that resolves when the fee settlement is successful.
 *
 * @throws An error if any issues occur during the fee settlement process.
 */
await broker.settleFee(providerAddress, serviceName, fee);
```

By following these steps, you can effectively integrate provider services into your applications.
For more information, please [download the example](./data/ts-sdk-example.ts).

</TabItem>

<TabItem value="other" label="Other SDKs">
Coming soon
</TabItem>

</Tabs>
