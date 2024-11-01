---
id: sdk
title: SDK
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Developers can integrate the services provided by our provider into their own products using our SDK.

<Tabs>
<TabItem value="ts-web" label="TS SDK for Web Dev" default>

### Step 1: Install the dependency

To get started, you need to install the `@0glabs/0g-serving-broker` package:

```bash
pnpm install @0glabs/0g-serving-broker
```

### Step 2: Initialize a Broker Instance

The broker instance is initialized with a `signer`. This signer is an instance that implements the ethers.js Signer interface and is used to sign transactions for a specific Ethereum account. Developers can create this instance using their private key via the ethers.js library or use a wallet framework tool like [wagmi](https://wagmi.sh/react/guides/ethers) to initialize the signer.

```typescript
import { createZGServingUserBroker } from "@0glabs/0g-serving-broker";

/**
 * @param signer - An instance that implements the ethers.js Signer interface.
 * @returns The broker instance.
 */
const broker = await createZGServingUserBroker(signer);
```

### Step 3: List Available Services

You can retrieve a list of services offered:

```typescript
/**
 * @returns A list of services as an array of ServiceStructOutput.
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
const services = await broker.modelProcessor.listService();
```

### Step 4: Manage Accounts

Before using the provider's services, you need to create an account specifically for the chosen provider. The provider checks the account balance before responding to requests. If the balance is insufficient, the request will be denied.

#### 4.1 Create an Account

```typescript
/**
 * @param providerAddress - The address of the provider.
 */
await broker.accountProcessor.addAccount(providerAddress);
```

#### 4.2 Deposit Funds into the Account

```typescript
/**
 * @param providerAddress - The address of the provider.
 * @param amount - The amount to deposit into the account.
 */
await broker.accountProcessor.depositFund(providerAddress, amount);
```

### Step 5: Use the Provider's Services

#### 5.1 Process Requests

Requests to 0G Serving must include specific headers with signature and fee information. Only valid requests will be processed by the provider. The `processRequest` function generates these headers.

```typescript
/**
 * @param providerAddress - The address of the provider.
 * @param svcName - The name of the service.
 * @param content - The content to be processed, like user input text in a chatbot.
 * @returns Headers containing request cost and user signature information.
 */
const headers = broker.requestProcessor.processRequest(
  providerAddress,
  serviceName,
  content
);
```

#### 5.2 Process Responses

After receiving a response from a provider's service, use this function to verify the response's legitimacy by checking its content and corresponding signature. It also stores necessary information in localStorage for future billing header generation.

```typescript
/**
 * @param providerAddress - The address of the provider.
 * @param serviceName - The name of the service.
 * @param content - The main content of the provider's response, such as chatbot response text.
 * @param chatID - The chat ID for each conversation, which can be obtained from the provider's response.
 * @returns A boolean, true if the response is valid, false otherwise.
 */
const valid = broker.responseProcessor.processResponse(
  providerAddress,
  serviceName,
  content,
  chatID
);
```

By following these steps, developers can effectively integrate provider services into their applications.

</TabItem>

<TabItem value="other" label="Other SDKs">
Under construction...
</TabItem>

</Tabs>
