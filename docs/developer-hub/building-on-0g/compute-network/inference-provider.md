---
id: inference-provider
title: Inference Provider
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Become an Inference Provider

Transform your AI services into verifiable, revenue-generating endpoints on the 0G Compute Network. This guide covers setting up your service and connecting it through the provider broker.

## Why Become a Provider?

- **Monetize Your Infrastructure**: Turn idle GPU resources into revenue
- **Automated Settlements**: The broker handles billing and payments automatically
- **Flexible Pricing**: Set your own rates based on market demand
- **Trust Through Verification**: Offer verifiable services for premium rates

## Prerequisites

### Hardware Requirements
- **GPU**: NVIDIA GPU with sufficient VRAM for your model
- **Network**: Stable internet connection with public IP
- **OS**: Linux server (Ubuntu 20.04+ recommended)

### Software Requirements
- Docker Compose 1.27+
- OpenAI-compatible model service
- Wallet with OG tokens for gas fees

## Setup Process

### Step 1: Prepare Your Model Service

Your AI service must implement the [OpenAI API Interface](https://platform.openai.com/docs/api-reference/chat) for compatibility:

```
POST /chat/completions
```

This ensures consistent user experience across all providers.

### Step 2: Download and Configure Provider Broker

```bash
# Download from releases page
wget https://github.com/0glabs/0g-serving-broker/releases/latest/download/provider-broker.tar.gz
tar -xzf provider-broker.tar.gz
cd provider-broker

# Copy configuration template
cp config.example.yaml config.local.yaml
```

Edit `config.local.yaml`:
```yaml
servingUrl: "https://your-public-ip:8080"    # Public endpoint
privateKeys: "YOUR_WALLET_PRIVATE_KEY"       # For settlements
targetUrl: "http://localhost:8000"           # Your model service
model: "llama-3.3-70b-instruct"              # Model identifier
```

### Step 3: Configure Docker Port

```bash
# Replace #PORT# with your service port (must match servingUrl)
sed -i 's/#PORT#/8080/g' docker-compose.yml
```

### Step 4: Launch Provider Broker

```bash
# Start the broker service
docker compose -f docker-compose.yml up -d

# Monitor logs
docker compose logs -f
```

The broker will:
- Register your service on the network
- Handle user authentication and request routing
- Manage automatic settlement of payments
- Minimize gas costs through intelligent batching

## Verification Services

Make your service verifiable to build trust and potentially earn higher rates:

<Tabs>
<TabItem value="teeml" label="TEE Verification (TeeML)" default>

### Overview

TEE (Trusted Execution Environment) verification ensures your computations are tamper-proof. Services running in TEE:
- Generate signing keys within the secure environment
- Provide CPU and GPU attestations
- Sign all inference results

### Requirements

- **CPU**: Intel TDX (Trusted Domain Extensions) enabled
- **GPU**: NVIDIA H100 or H200 with TEE support
- **Attestation**: Both CPU and GPU attestations including the public key

### Implementation

#### 1. Attestation Download Interface

Expose this endpoint:
```
GET https://{PUBLIC_IP}/attestation/report
```

Return format:
```json
{
  "signing_address": "0x...",
  "nvidia_payload": "..."
}
```

*Note: The nvidia_payload must be verifiable via NVIDIA's GPU Attestation API*

#### 2. Signature Download Interface

For each response with a unique ID:
```
GET https://{PUBLIC_IP}/signature/{response_id}
```

Requirements:
- Use ECDSA algorithm for signatures
- Signatures must be verifiable with the signing address
- Include both request and response content in signature

</TabItem>
<TabItem value="future" label="OPML, ZKML (Coming Soon)">

Support for additional verification methods including:
- **OPML**: Optimistic Machine Learning proofs
- **ZKML**: Zero-knowledge ML verification

Stay tuned for updates.

</TabItem>
</Tabs>

## Best Practices

### Service Reliability
- Ensure stable internet connection and power supply
- Implement proper error handling in your model service
- Monitor service health and uptime

### Security
- Keep your private keys secure
- Use HTTPS for all public endpoints
- Regularly update your software dependencies

### Performance
- Optimize model loading and inference times
- Consider batching requests when possible
- Monitor resource utilization

## Troubleshooting

<details>
<summary><b>Broker fails to start</b></summary>

- Verify Docker Compose is installed correctly
- Check port availability
- Ensure config.local.yaml syntax is valid
- Review logs: `docker compose logs`
</details>

<details>
<summary><b>Service not accessible</b></summary>

- Confirm firewall allows incoming connections
- Verify public IP/domain is correct
- Test local service: `curl http://localhost:8000/chat/completions`
</details>

<details>
<summary><b>Settlement issues</b></summary>

The automatic settlement engine handles payments. If issues occur:
- Check wallet has sufficient gas
- Verify network connectivity
- Monitor settlement logs in broker output
</details>

## Advanced Features

### Settlement Engine

The provider broker includes an intelligent settlement system that:
- Automatically collects fees before customer balance depletion
- Batches transactions to minimize gas costs
- Provides real-time settlement status
- Handles failed transactions gracefully

### Service Discovery

Your service is automatically registered and discoverable by:
- Model type and capabilities
- Pricing structure
- Verification status
- Availability and performance metrics

## Next Steps

- **Test Your Service** → Verify everything works before going live
- **Monitor Performance** → Track requests and earnings
- **Join Community** → [Discord](https://discord.gg/0glabs) for support
- **Explore SDK** → [SDK Documentation](./sdk) for integration details