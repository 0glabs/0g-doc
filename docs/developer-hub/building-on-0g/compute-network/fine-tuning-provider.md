---
id: fine-tuning-provider
title: Fine-tuning Provider
sidebar_position: 4
---

# Become a Fine-tuning Provider

Offer GPU computing power for AI model training and earn revenue from the 0G Compute Network.

## Why Provide Fine-tuning Services?

- **Higher Revenue**: Fine-tuning jobs pay 2-3x more than inference
- **Longer Jobs**: Stable income from multi-hour training sessions
- **Growing Demand**: Increasing need for custom AI models

## Requirements

### Hardware Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **GPU** | NVIDIA H100 | NVIDIA H200 |
| **VRAM** | 80GB | 80GB+ |
| **CPU** | Intel with TDX | Latest Intel Xeon |
| **RAM** | 128GB | 256GB+ |
| **Storage** | 2TB NVMe | 4TB+ NVMe |
| **Network** | 1 Gbps | 10 Gbps |

### What is TEE/TDX?

<details>
<summary><b>Understanding Trusted Execution Environments</b></summary>

**TEE (Trusted Execution Environment)** provides hardware-level security:
- Isolates training workloads in encrypted memory
- Prevents tampering with models or data
- Provides cryptographic proof of computation

**TDX (Trust Domain Extensions)** is Intel's TEE technology:
- Built into modern Intel CPUs
- Creates secure "domains" for workloads
- Required for verifiable fine-tuning on 0G

Think of it as a bank vault for AI training - even you can't peek inside while it's running.
</details>

## Setup Guide

### Step 1: Prepare Your System

```bash
# Check if your CPU supports TDX
cpuid | grep -i tdx

# Install required packages
sudo apt update
sudo apt install -y docker.io docker-compose git
```

### Step 2: Get Provider Software

```bash
# Download the installation package
wget https://github.com/0glabs/0g-serving-broker/releases/latest/download/fine-tuning-provider.tar.gz
tar -xzf fine-tuning-provider.tar.gz
cd fine-tuning-provider
```

### Step 3: Configure Your Service

Create `config.local.yaml`:
```yaml
# Basic configuration
servingUrl: "https://your-domain.com:9090"  # Your public URL
privateKeys: "YOUR_WALLET_PRIVATE_KEY"       # For receiving payments

# Supported models (start with popular ones)
service:
  models:
    - name: "distilbert-base-uncased"
      description: "Fast text classification model"
      pricePerByte: 0.000000001
    
    - name: "mobilenet_v2"
      description: "Efficient image classification"
      pricePerByte: 0.000000002
```

### Step 4: Set Up Secure Environment

This step creates a secure environment for training:

```bash
# 1. Clone security toolkit
git clone https://github.com/nearai/private-ml-sdk --recursive
cd private-ml-sdk/

# 2. Build secure container image
./build.sh

# 3. Start local key management
cd meta-dstack-nvidia/dstack/key-provider-build/
./run.sh
```

### Step 5: Launch Your Service

```bash
# Return to provider directory
cd ~/fine-tuning-provider

# Copy your config
cp config.local.yaml ~/private-ml-sdk/my-gpu-cvm/shared/

# Start the secure container
cd ~/private-ml-sdk
sudo -E dstack run my-gpu-cvm
```

### Step 6: Verify It's Working

```bash
# Check if registered
curl https://api.0g.ai/fine-tuning/providers | grep YOUR_WALLET_ADDRESS

# Monitor logs
docker logs -f fine-tuning-provider
```

## Adding Custom Models

Want to support more models? Add them to your config:

```yaml
service:
  customizedModels:
    - name: "llama-2-7b-chat"
      hash: "MODEL_HASH_FROM_0G_STORAGE"
      image: "llama2:latest"
      dataType: "text"
      description: "Llama 2 chat model for conversational AI"
      pricePerByte: 0.000000003
```

### Model Requirements
- Pre-trained weights stored on 0G Storage
- Docker image with training script
- Clear documentation for users

## Earnings Optimization

### 1. Competitive Pricing
```bash
# Check competitor prices
0g-compute-cli list-providers

# Price slightly below average for more jobs
```

### 2. Support Popular Models
- Text: BERT variants, Llama models
- Vision: MobileNet, ResNet, YOLO
- Specialized: Medical, finance, code models

### 3. Maximize Uptime
- Use UPS for power stability
- Set up monitoring alerts
- Auto-restart on failures

### 4. Marketing Your Service
- List unique models you support
- Highlight fast training times
- Advertise in 0G Discord

## Troubleshooting

<details>
<summary><b>Container won't start</b></summary>

1. Verify TDX is enabled in BIOS
2. Check Docker is running: `sudo systemctl status docker`
3. Ensure ports aren't blocked by firewall
</details>

<details>
<summary><b>No jobs coming in</b></summary>

- Lower your prices initially
- Ensure 99%+ uptime
- Support more popular models
- Check network connectivity
</details>

<details>
<summary><b>Training jobs failing</b></summary>

- Monitor GPU memory usage
- Check disk space (training needs scratch space)
- Verify model files are accessible
- Review container logs
</details>

<details>
<summary><b>Payment issues</b></summary>

Payments are automatic after job completion:
- Check wallet address is correct
- Verify on [block explorer](https://chainscan-galileo.0g.ai)
- Contact support if issues persist
</details>

## Best Practices

### Security
1. **Regular Updates**: Keep system and software updated
2. **Firewall Rules**: Only expose required ports
3. **Key Management**: Backup private keys securely
4. **Monitoring**: Set up alerts for suspicious activity

### Performance
1. **GPU Optimization**: Use latest drivers
2. **Storage**: Use fast NVMe for datasets
3. **Cooling**: Ensure adequate GPU cooling
4. **Network**: Stable, high-bandwidth connection

### Business
1. **Start Small**: Begin with 1-2 popular models
2. **Build Reputation**: Focus on reliability first
3. **Expand Gradually**: Add models as demand grows
4. **Community**: Engage in provider channels

## Advanced Topics

### Multi-GPU Setup
```yaml
# Run multiple instances for multiple GPUs
services:
  provider1:
    environment:
      CUDA_VISIBLE_DEVICES: "0"
    ports: ["9090:9090"]
  
  provider2:
    environment:
      CUDA_VISIBLE_DEVICES: "1"
    ports: ["9091:9091"]
```

### Custom Training Scripts
```python
# Your training script should:
# 1. Accept standard parameters
# 2. Save checkpoints regularly
# 3. Output logs to stdout
# 4. Handle interruptions gracefully
```

### Monitoring Dashboard
```yaml
# Add monitoring webhook
monitoring:
  webhook: "https://your-monitor.com/webhook"
  metrics: ["gpu_usage", "job_status", "earnings"]
```

## Expected Earnings

| GPU Type | Jobs/Month | Revenue Range |
|----------|------------|---------------|
| H100 80GB | 50-100 | $3,000-$8,000 |
| H200 80GB | 60-120 | $4,000-$10,000 |

*Earnings vary based on demand, pricing, and uptime*

## Next Steps

1. **Join Provider Community** → [Discord](https://discord.gg/0glabs) #fine-tuning-providers
2. **Advanced Setup** → [Multi-Node Configuration](./multi-node-setup)
3. **Provider Dashboard** → Monitor your earnings and jobs

---

*Turn your H100/H200 into a revenue generator. Start providing fine-tuning services today.*