---
id: provider
title: Provider
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

To integrate a service into the 0G Serving Network, a provider must transform their service into a **verifiable service** and connect it through the **provider broker container**.

## Verifiable Services

### Service Interface Requirements

Your service must adhere to the [OpenAI API Interface Standards](https://platform.openai.com/docs/api-reference/chat).

### Verification Interfaces

To ensure the integrity and trustworthiness of services, different verification mechanisms are employed. Each mechanism comes with its own specific set of protocols and requirements to ensure service verification and security.

<Tabs>
<TabItem value="tee" label="TEE" default>

For TEE (Trusted Execution Environment) verification, when a service starts, it should generate a signing key within the TEE. We require CPU and GPU attestations to ensure the service is running in a Confidential VM with an NVIDIA GPU in TEE mode. These attestations should include the public key of the signing key, verifying its creation within the TEE. All inference results must be signed with this signing key.

#### 1. Attestation Download Interface

To facilitate attestation downloads, set up an API endpoint at:

```
GET https://{PUBLIC_IP}/attestation/report
```

This endpoint should return a JSON structure in the following format:

```json
{
  "signing_address": "...",
  "nvidia_payload": "..."
}
```

_Note_: Ensure that the "nvidia_payload" can be verified using NVIDIA's [GPU Attestation API](https://docs.attestation.nvidia.com/api-docs/nras.html#tag--GPU-Attestation-API).

#### 2. Signature Download Interface

To facilitate the downloading of response signatures, provide an API endpoint at:

```
GET https://{PUBLIC_IP}/signature/{response_id}
```

Each response should include a unique ID that can be utilized to retrieve its signature using the above endpoint.

- **Signature Generation**: Ensure the signature is generated using the ECDSA algorithm.
- **Verification**: The signature should be verifiable with the signing address, along with the corresponding request and response content.

</TabItem>

<TabItem value="zk" label="ZK">
Under construction...
</TabItem>
</Tabs>

## Provider Broker

The Provider Broker registers and manages services, proxies user requests, and provides settlement endpoints.

### Prerequisites

- Docker Compose: 1.27+

### Download the Installation Package

[Download the Package](./data/provider-broker.tar.gz).

### Extract the Installation Package

```bash
tar -zxvf provider-broker.tar.gz
```

### Configuration Setup

- Copy the `provider-broker/config.example.yaml` file.
- Modify `servingUrl` to point to your publicly exposed URL.
- Set `privateKeys` to your wallet's private key for the 0G blockchain.
- Save the file as `provider-broker/config.local.yaml`.

### Start the Provider Broker

```bash
docker compose -f provider-broker/docker-compose.yml up -d
```

- The broker listening on `127.0.0.1:3080` by default.

### Key Commands

1. **Register the Service**

   The serving system currently supports `chatbot` services, with plans to support additional types.

   ```bash
   curl -X POST http://127.0.0.1:3080/v1/service \
   -H "Content-Type: application/json" \
   -d '{
         "URL": "<endpoint_of_the_prepared_service>",
         "inputPrice": 100000,
         "outputPrice": 200000,
         "Type": "chatbot",
         "Name": "llama8Bb",
         "Model": "llama-3.1-8B-Instruct"
   }'
   ```

   - `inputPrice` and `outputPrice` vary by service type, for `chatbot`, they represent the cost per token.

2. **Settle the Fee**

   ```bash
   curl -X POST http://127.0.0.1:3080/v1/settle
   ```

   - The provider broker has an automatic settlement engine that ensures efficient fee collection, minimizing users' overdue payments. Users may request refunds, which are temporarily locked during processing. Additionally, the engine manages settlement frequency to control gas costs.

### Additional API Information

For more details, please [Download the PDF](./0G-Serving-Broker-API.pdf).
