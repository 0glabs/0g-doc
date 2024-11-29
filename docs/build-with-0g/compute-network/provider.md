---
id: provider
title: Becoming a Service Provider
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

To integrate your AI services into the 0G Compute Network and become a Service Provider, you must first transform your service into a verifiable service and connect it through the provider broker container.

This is easy to do, and we will provide a walkthrough below.

## Verifiable Services

### Service Interface Requirements

Large Language Models (LLMs) revolutionize communication, knowledge access, and automation by generating human-like text, so we start with supporting language models. To have a consistent experience, providers shall support the [OpenAI API Interface Standards](https://platform.openai.com/docs/api-reference/chat).

### Verification Interfaces

To ensure the integrity and trustworthiness of services, different verification mechanisms are employed. Each mechanism comes with its own specific set of protocols and requirements to ensure service verification and security.

<Tabs>
<TabItem value="TEEML" label="TEEML" default>

For TEE (Trusted Execution Environment) verification, when a service starts, it should generate a signing key within the TEE. We require CPU and GPU attestations to ensure the service is running in a Confidential VM with an NVIDIA GPU in TEE mode. These attestations should include the public key of the signing key, verifying its creation within the TEE. All inference results must be signed with this signing key.

_Note_: Ensure that Intel TDX (Trusted Domain Extensions) is enabled on the CPU. Additionally, an H100 or H200 GPU is required for GPU TEE.

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

_Note_: Ensure that the "nvidia_payload" can be verified using NVIDIA's GPU Attestation API. Support for decentralized TEE attestation is planned for the future, and relevant interfaces will be provided. Stay tuned.

#### 2. Signature Download Interface

To facilitate the downloading of response signatures, provide an API endpoint at:

```
GET https://{PUBLIC_IP}/signature/{response_id}
```

Each response should include a unique ID that can be utilized to retrieve its signature using the above endpoint.

- **Signature Generation**: Ensure the signature is generated using the ECDSA algorithm.
- **Verification**: The signature should be verifiable with the signing address, along with the corresponding request and response content.

</TabItem>

<TabItem value="OPML_ZKML_and_others" label="OPML, ZKML, and others">
Coming soon
</TabItem>

</Tabs>

## Provider Broker

To register and manage services, handle user request proxies, and perform settlements, you need to use the Provider Broker.

### Prerequisites

- Docker Compose: 1.27+

### Download the Installation Package

Please visit the [releases page](https://github.com/0glabs/0g-serving-broker/releases) to download and extract the latest version of the installation package.

### Configuration Setup

- Copy the `config.example.yaml` file.
- Modify `servingUrl` to point to your publicly exposed URL.
- Set `privateKeys` to your wallet's private key for the 0G blockchain.
- Save the file as `config.local.yaml`.
- Replace `#PORT#` in `docker-compose.yml` with the port you want to use. It should be the same as the port of `servingUrl` in `config.local.yaml`.

### Start the Provider Broker

```bash
docker compose -f docker-compose.yml up -d
```

### Key Commands

1. **Register the Service**

   The compute network currently supports `chatbot` services. Additional services are in the pipeline to be released soon.

   ```bash
   curl -X POST http://127.0.0.1:<PORT>/v1/service \
   -H "Content-Type: application/json" \
   -d '{
         "URL": "<endpoint_of_the_prepared_service>",
         "inputPrice": "10000000",
         "outputPrice": "20000000",
         "Type": "chatbot",
         "Name": "llama8Bb",
         "Model": "llama-3.1-8B-Instruct",
         "verifiability":"TeeML"
   }'
   ```

   - `inputPrice` and `outputPrice` vary by service type, for `chatbot`, they represent the cost per token. The unit is in neuron. 1 A0GI = 1e18 neuron.

2. **Settle the Fee**

   ```bash
   curl -X POST http://127.0.0.1:<PORT>/v1/settle
   ```

   - The provider broker has an automatic settlement engine that ensures you can collect fees promptly before your customer's account balance is insufficient, while also minimizing the frequency of charges to reduce gas consumption.

### Additional API Information

For more details, please refer to the <a href="/html/compute-network-provider-api.html" target="_blank" rel="noopener noreferrer">API Page</a>.
