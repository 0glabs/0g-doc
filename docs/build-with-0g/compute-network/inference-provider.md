---
id: provider
title: Inference Provider
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

To integrate your AI services into the 0G Compute Network and become a Service Provider, you must first transform your service into a verifiable service and connect it through the provider broker container.

This guide will walk you through the process of setting up your verifiable model service and integrating it with the network.

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
- Set `servingUrl` to your service's public URL.
- Set `targetUrl` to your internal URL corresponding to the prepared LLM service.
- Set `model` to the model name of your LLM service.
- Save the file as `config.local.yaml`.
- Replace `#PORT#` in `docker-compose.yml` with the port you want to use. It should be the same as the port of `servingUrl` in `config.local.yaml`.

### Start the Provider Broker

```bash
docker compose -f docker-compose.yml up -d
```

The provider broker has an automatic settlement engine that ensures you can collect fees promptly before your customer's account balance is insufficient, while also minimizing the frequency of charges to reduce gas consumption.
