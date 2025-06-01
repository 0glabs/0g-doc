---
id: fine-tuning-provider
title: Fine-tuning Provider
sidebar_position: 4
---

# Become a Fine-tuning Provider

## Overview

Transform your high-end GPU infrastructure into a secure, revenue-generating fine-tuning service on the 0G Compute Network. This comprehensive guide walks you through setting up a Confidential Virtual Machine (CVM) environment using Intel TDX and NVIDIA TEE technology.

### What You'll Achieve
- **Secure Fine-tuning Environment**: TEE-protected model training that clients can trust
- **Custom Model Support**: Host specialized models for niche markets
- **Automated Revenue**: Earn from AI researchers and developers worldwide
- **Privacy Guarantee**: Client data never leaves your secure enclave

## Why Become a Fine-tuning Provider?

### Revenue Advantages
- **Premium Pricing**: Fine-tuning commands 2-3x higher rates than inference
- **Extended Sessions**: Multi-hour training jobs provide stable income streams
- **Market Growth**: Exploding demand for custom AI model training
- **Recurring Business**: Clients often return for model iterations

## Prerequisites

### Hardware Requirements

| Component | Minimum Spec | Recommended | Purpose |
|-----------|--------------|-------------|--------|
| **GPU** | NVIDIA H100 (80GB) | NVIDIA H200 (80GB+) | TEE-enabled training |
| **CPU** | Intel with TDX support | Latest Intel Xeon | Secure enclave creation |
| **RAM** | 128GB DDR4/5 | 256GB+ | Large model handling |
| **Storage** | 2TB NVMe SSD | 4TB+ NVMe RAID | Fast dataset access |
| **Network** | 1 Gbps symmetric | 10+ Gbps fiber | Model/data transfer |

:::warning TDX Requirement
Intel TDX (Trust Domain Extensions) is **mandatory** for verifiable fine-tuning. Verify your CPU supports TDX before proceeding.
:::

### Understanding TEE Technology

<details>
<summary><b>What Makes Fine-tuning Secure and Verifiable?</b></summary>

**TEE (Trusted Execution Environment)**
- **Hardware Security**: Encrypts training workloads at the CPU level
- **Tamper Resistance**: Prevents unauthorized access to models or data
- **Cryptographic Proof**: Generates verifiable attestations of computation integrity

**TDX (Trust Domain Extensions)**
- **Intel's TEE**: Built into 4th gen Xeon and newer processors
- **Isolated Domains**: Creates secure "enclaves" for sensitive workloads
- **0G Integration**: Required for verifiable fine-tuning on the network

**Client Benefits:**
- Training happens in a "black box" that even you cannot access
- Cryptographic proof that their data wasn't compromised
- Assurance that the training process wasn't tampered with

</details>

## Installation Guide

### Step 1: System Preparation

**Verify Hardware Compatibility:**
```bash
# Check TDX support
cpuid | grep -i tdx
# Expected output: TDX support available

# Verify NVIDIA GPU
nvidia-smi
# Should show H100/H200 with driver version 535+
```

**Install Dependencies:**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y \
  docker.io \
  docker-compose-plugin \
  git \
  curl \
  cpuid

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

### Step 2: Download Provider Software

```bash
# Create working directory
mkdir -p ~/0g-fine-tuning && cd ~/0g-fine-tuning

# Download latest release
wget https://github.com/0glabs/0g-serving-broker/releases/latest/download/fine-tuning-provider.tar.gz

# Extract and organize
tar -xzf fine-tuning-provider.tar.gz
cd fine-tuning-provider

# Verify contents
ls -la
# Should see: config.example.yaml, docker-compose.yml, models/
```

### Step 3: Configure Your Service

**Create your configuration file:**
```bash
# Copy template
cp config.example.yaml config.local.yaml
```

**Edit `config.local.yaml`:**
```yaml
# Network Configuration
servingUrl: "https://your-domain.com:9090"  # Must be publicly accessible
privateKeys: "YOUR_WALLET_PRIVATE_KEY"       # For automated payments

# Service Settings
service:
  # Start with popular models to attract clients
  customizedModels:
    - name: "distilbert-base-uncased"
      hash: "<MODEL_ROOT_HASH>"                # Upload to 0G Storage first
      image: "distilbert:latest"
      dataType: "text"
      trainingScript: "/app/finetune.py"
      description: "Fast and efficient text classification model ideal for sentiment analysis and document categorization"
      tokenizer: "<TOKENIZER_ROOT_HASH>"
      usageFile: "distilbert-usage.zip"       # Place in ./models/ directory
    
    - name: "mobilenet_v2"
      hash: "<MODEL_ROOT_HASH>"
      image: "mobilenetv2:latest"
      dataType: "image"
      trainingScript: "/app/finetune.py"
      description: "Lightweight image classification model optimized for mobile and edge deployment"
      tokenizer: "<TOKENIZER_ROOT_HASH>"
      usageFile: "mobilenet-usage.zip"
```

:::tip Configuration Fields Explained
- **name**: Unique model identifier clients will see
- **hash**: Root hash from uploading model to 0G Storage
- **image**: Docker image containing training environment
- **dataType**: "text" or "image" - determines dataset format
- **trainingScript**: Path to training script in container
- **description**: Marketing copy to attract clients
- **tokenizer**: Hash of tokenizer files from 0G Storage
- **usageFile**: ZIP with examples, configs, sample data
:::

### Step 4: Build TEE Environment

**Download and build the secure execution environment:**

```bash
# Clone the private ML SDK (includes TDX/TEE tools)
git clone https://github.com/nearai/private-ml-sdk --recursive
cd private-ml-sdk/

# Build secure container images (this takes 10-15 minutes)
./build.sh

# Verify built images
ls images/
# Should see: dstack-nvidia-0.3.0, dstack-nvidia-dev-0.3.0
```

**Initialize Local Key Management System:**
```bash
# Start the Key Management Service (KMS)
cd meta-dstack-nvidia/dstack/key-provider-build/
./run.sh

# This provides cryptographic keys for CVM initialization
# Keep this terminal open - KMS must run continuously
```

:::note What's Happening Here
The KMS derives encryption keys from your TEE hardware, ensuring that training jobs run in a secure, isolated environment that generates cryptographic proofs of integrity.
:::

### Step 5: Create and Launch CVM

**Configure the Confidential Virtual Machine:**
```bash
# Navigate to scripts directory
cd ~/private-ml-sdk/meta-dstack-nvidia/scripts/bin
export PATH=$PATH:$(pwd)
cd ~/private-ml-sdk

# List available GPUs
dstack lsgpu
# Note the GPU ID for your H100/H200

# Create CVM instance (replace GPU_ID and PORT)
dstack new docker-compose.yaml -o my-gpu-cvm \
       --local-key-provider \
       --gpu [GPU_ID] \
       --image images/dstack-nvidia-0.3.0 \
       -c 2 -m 4G -d 100G \
       --port tcp:0.0.0.0:9090:9090
```

**Deploy your configuration:**
```bash
# Copy config to CVM shared directory
cp ~/0g-fine-tuning/fine-tuning-provider/config.local.yaml \
   ~/private-ml-sdk/my-gpu-cvm/shared/

# Start the secure fine-tuning service
sudo -E dstack run my-gpu-cvm
```

### Step 6: Verify Service Registration

**Check network registration:**
```bash
# Verify your service appears in the provider list
curl -s https://api.0g.ai/fine-tuning/providers | \
  jq '.[] | select(.address=="YOUR_WALLET_ADDRESS")'  

# Expected output: Your service details including supported models
```

**Monitor service health:**
```bash
# Watch service logs
docker logs -f my-gpu-cvm

# Check TEE attestation status
curl -s https://your-domain.com:9090/health

# Test model availability
curl -s https://your-domain.com:9090/models
```

:::tip Service Health Indicators
✅ **Healthy**: Returns model list, TEE attestation valid  
⚠️ **Warning**: High latency, partial model availability  
❌ **Unhealthy**: No response, failed attestation  
:::

## Adding Custom Models

### Model Preparation Workflow

**1. Prepare Model Assets:**
```bash
# Upload model to 0G Storage
0g-storage upload ./model-weights/ 
# Returns: MODEL_ROOT_HASH

# Upload tokenizer files
0g-storage upload ./tokenizer/
# Returns: TOKENIZER_ROOT_HASH

# Create usage documentation
zip usage-guide.zip README.md examples/ configs/
```

**2. Add to Configuration:**
```yaml
service:
  customizedModels:
    - name: "llama-2-7b-chat"              # Client-facing name
      hash: "Qm...MODEL_HASH"               # From 0G Storage
      image: "llama2:fine-tune"            # Your training image
      dataType: "text"                     # text | image
      trainingScript: "/app/train.py"      # Entry point
      description: "Llama 2 chat model optimized for conversational AI fine-tuning with custom datasets"
      tokenizer: "Qm...TOKENIZER_HASH"     # From 0G Storage  
      usageFile: "llama2-usage.zip"        # In ./models/ dir
```

### Model Requirements Checklist

✅ **Model Assets**
- Pre-trained weights uploaded to 0G Storage
- Tokenizer files (for text models) uploaded separately
- Model card with capabilities and limitations

✅ **Docker Image**
- Training script that accepts standard parameters
- Required dependencies installed
- Checkpoint saving and resumption support

✅ **Documentation**
- Usage examples with sample datasets
- Configuration templates
- Expected training times and resource usage

### Popular Model Categories

**Text Models:**
- BERT variants (classification, NER)
- GPT models (text generation)
- T5 (text-to-text tasks)
- Specialized domain models (legal, medical)

**Vision Models:**
- ResNet, EfficientNet (classification)
- YOLO, DETR (object detection) 
- Stable Diffusion (image generation)
- Medical imaging models

**Specialized:**
- Code generation models
- Scientific/research models
- Multimodal (vision + text)

## Revenue Optimization

### 1. Strategic Pricing

**Market Research:**
```bash
# Analyze competitor pricing
curl -s https://api.0g.ai/fine-tuning/providers | \
  jq '.[] | {name: .name, models: .models[].pricePerByte}'

# Price competitively (5-10% below average initially)
```

**Pricing Strategy:**
- **Popular models**: Price 5-10% below market rate to gain volume
- **Specialized models**: Premium pricing (20-50% above average)
- **New models**: Introductory pricing to build client base

### 2. Model Portfolio Strategy

**High-Demand Categories:**
- **Text Processing**: BERT, DistilBERT, RoBERTa (sentiment, classification)
- **Conversational AI**: Llama variants, Mistral models
- **Computer Vision**: MobileNet, ResNet, YOLO (classification, detection)
- **Emerging Niches**: Medical, legal, financial domain models

**Revenue Drivers:**
- Support 3-5 popular models initially
- Add 1-2 specialized models for premium pricing
- Monitor demand and expand based on client requests

### 3. Operational Excellence

**Maximize Uptime (Target: 99.5%+):**
```bash
# Power Management
# - Install UPS for power stability
# - Configure auto-restart services

# Monitoring Setup
crontab -e
# Add: */5 * * * * curl -f https://your-domain:9090/health || systemctl restart dstack

# Log Monitoring
tail -f /var/log/dstack.log | grep -i error
```

**Performance Optimization:**
- Keep GPU temperatures below 80°C
- Use high-speed NVMe for dataset caching
- Maintain 10+ Gbps network for large dataset transfers

### 4. Marketing & Client Acquisition

**Community Presence:**
- Active in 0G Discord #fine-tuning channel
- Share success stories and model capabilities
- Offer free trials for first-time clients

**Differentiation:**
- Highlight unique models or specialized domains
- Advertise faster training times (if applicable)
- Emphasize security and privacy guarantees

## Troubleshooting

<details>
<summary><b>CVM Container Fails to Start</b></summary>

**Common Causes & Solutions:**

1. **TDX Not Enabled**
   ```bash
   # Check BIOS settings
   dmesg | grep -i tdx
   # Should show: TDX initialized successfully
   ```

2. **Docker Issues**
   ```bash
   sudo systemctl status docker
   sudo systemctl restart docker
   docker system prune -a  # Clean up if needed
   ```

3. **Port Conflicts**
   ```bash
   netstat -tulpn | grep :9090
   # Kill conflicting processes or use different port
   ```

4. **Insufficient Resources**
   ```bash
   free -h          # Check RAM
   df -h            # Check disk space
   nvidia-smi       # Verify GPU accessibility
   ```

</details>

<details>
<summary><b>No Training Jobs Received</b></summary>

**Diagnosis Steps:**

1. **Service Visibility**
   ```bash
   curl -s https://api.0g.ai/fine-tuning/providers | grep "$(cat config.local.yaml | grep privateKeys | cut -d'"' -f4)"
   # Should return your service info
   ```

2. **Pricing Analysis**
   ```bash
   # Check if your prices are competitive
   curl -s https://api.0g.ai/fine-tuning/providers | jq '.[] | select(.models[].name=="distilbert-base-uncased") | .models[].pricePerByte'
   ```

3. **Service Health**
   ```bash
   curl -v https://your-domain:9090/health
   # Should return 200 OK with service status
   ```

**Solutions:**
- Reduce pricing by 10-20% initially
- Ensure 99%+ uptime monitoring
- Add more popular/demanded models
- Verify network accessibility from external IPs

</details>

<details>
<summary><b>Training Jobs Failing Mid-Process</b></summary>

**Investigation:**

1. **Resource Monitoring**
   ```bash
   nvidia-smi dmon -s pucvmet    # GPU metrics
   iostat -x 1                   # Disk I/O
   free -h                       # Memory usage
   ```

2. **Container Logs**
   ```bash
   docker logs my-gpu-cvm --tail 100
   # Look for OOM errors, CUDA errors, disk full messages
   ```

3. **Model File Integrity**
   ```bash
   # Verify model files are accessible
   0g-storage verify <MODEL_HASH>
   ```

**Common Fixes:**
- Increase swap space for large models
- Use faster storage (NVMe over SATA)
- Verify model files haven't been corrupted
- Check training script error handling

</details>

<details>
<summary><b>Payment/Settlement Issues</b></summary>

**Automatic Payment Verification:**

```bash
# Check your wallet balance
0g-chain query bank balances $(0g-chain keys show provider -a)

# Verify on block explorer
echo "Check: https://chainscan-galileo.0g.ai/address/YOUR_WALLET_ADDRESS"

# Monitor settlement logs
docker logs my-gpu-cvm | grep -i settlement
```

**If Payments Missing:**
1. Verify wallet address in config matches your actual wallet
2. Check if training jobs completed successfully (clients only pay for completed jobs)
3. Review gas fees - ensure your wallet has enough for settlement transactions
4. Contact support with transaction hashes if issues persist

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

## Revenue Expectations

### Monthly Earnings Projections

| GPU Model | Typical Jobs/Month | Revenue Range | Factors |
|-----------|-------------------|---------------|----------|
| **H100 80GB** | 50-100 jobs | $3,000-$8,000 | Popular models, 99% uptime |
| **H200 80GB** | 60-120 jobs | $4,000-$10,000 | Latest hardware, premium pricing |
| **Multi-GPU** | 150-300 jobs | $8,000-$20,000 | Scale advantage, parallel jobs |

### Revenue Factors

**High Impact (±50% earnings):**
- **Uptime**: 99%+ uptime vs 95% = 40% more earnings
- **Model Selection**: Popular models get 3x more jobs
- **Pricing Strategy**: Competitive pricing increases volume

**Medium Impact (±25% earnings):**
- **Performance**: Faster training = more jobs per day
- **Specialization**: Niche models command premium rates
- **Geographic Location**: Some regions have higher demand

**Market Dynamics:**
- Peak demand: Weekdays, academic semester periods
- Seasonal: Q4 increase due to research deadlines
- Growth: 15-25% monthly as 0G ecosystem expands

:::note Earnings Disclaimer
Revenue estimates based on current market conditions and assume competitive pricing, reliable uptime, and popular model support. Actual earnings vary significantly based on market demand, competition, and operational excellence.
:::

## Next Steps

### Immediate Actions

1. **Join the Community**
   - [Discord](https://discord.gg/0glabs) #fine-tuning-providers channel
   - Share your setup progress and get help from experienced providers
   - Stay updated on new model demands and pricing trends

2. **Monitor Your Service**
   - Set up monitoring dashboards for uptime and performance
   - Track earnings and job completion rates
   - Analyze which models generate the most revenue

3. **Optimize Operations**
   - Review pricing weekly based on competition
   - Add new models based on client requests
   - Implement automated restarts and health checks

### Advanced Topics

📈 **[Multi-GPU Setup](./multi-gpu-setup)** - Scale across multiple H100/H200s  
🔧 **[Custom Model Integration](./custom-models)** - Add proprietary models  
📊 **[Provider Analytics](./analytics)** - Deep dive into earnings optimization  
🔐 **[Security Hardening](./security)** - Advanced TEE configurations  

### Success Metrics

**Week 1-2**: Service registration and first jobs  
**Month 1**: Achieve 95%+ uptime, optimize pricing  
**Month 2-3**: Expand model portfolio, build client base  
**Month 3+**: Consider multi-GPU scaling  

---

:::tip Ready to Start Earning?
With H100/H200 GPUs commanding premium rates in the AI training market, becoming a fine-tuning provider on 0G offers one of the highest ROI opportunities in the decentralized compute space.
:::

*Transform your high-end GPU investment into a sustainable revenue stream. Start your fine-tuning provider journey today.*