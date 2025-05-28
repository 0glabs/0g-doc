---
id: da-integration
title: DA Client Nodes
sidebar_position: 2
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 0G Data Availability Integration Guide

## Overview

This guide walks you through setting up the infrastructure needed to integrate 0G DA into your application. You'll learn how to run the required nodes and configure them for your use case.

### Integration Architecture

:::tip
**TODO**: Add architecture diagram showing:
- Your application connecting to DA Client
- DA Client communicating with Encoder for data processing
- DA Client interacting with Retriever for data access
- Connection to 0G DA network and on-chain contracts
:::

### Required Components

| Component | Purpose | Required For |
|-----------|---------|-------------|
| **DA Client** | Main interface to 0G DA network | All integrations |
| **Encoder** | Handles erasure coding and data processing | Submitting data |
| **Retriever** | Enables data retrieval from network | Reading data |

## When to Use 0G DA

<details>
<summary><b>Common Integration Patterns</b></summary>

**1. Rollup Data Availability**
- Store transaction batches
- Post state roots
- Archive execution proofs

**2. Cross-Chain Messaging**
- Bridge state synchronization
- Message passing between chains
- Proof storage for verification

**3. Decentralized Storage**
- Large file storage
- AI model distribution
- Gaming assets and state

</details>

## Quick Start

### System Limits & Fees

| Parameter | Value | Notes |
|-----------|-------|-------|
| **Maximum Blob Size** | 32,505,852 bytes (~32 MB) | Per submission |
| **Submission Fee** | `BLOB_PRICE` (dynamic) | Paid in native token |
| **Processing Time** | ~30 seconds | From submission to finalization |
| **Data Retention** | Permanent* | *Subject to node incentives |

### Example Integration

```bash
# Quick test submission
curl -X POST http://localhost:51001/submit \
  -H "Content-Type: application/json" \
  -d '{"data": "your_base64_encoded_data"}'  
```

For production examples, see the [Rust integration example](https://github.com/0glabs/0g-da-example-rust).

## Hardware Requirements

### Minimum Specifications

| Node Type | Memory | CPU | Disk | Network | GPU |
|-----------|--------|-----|------|---------|-----|
| **DA Client** | 8 GB | 2 cores | 50 GB SSD | 100 Mbps | Not required |
| **Encoder** | 16 GB | 4 cores | 100 GB SSD | 100 Mbps | NVIDIA RTX 4090* |
| **Retriever** | 8 GB | 2 cores | 50 GB SSD | 100 Mbps | Not required |

*GPU acceleration optional but recommended for high-throughput encoding

### Network Requirements
- **Stable connection**: 99%+ uptime recommended
- **Low latency**: &lt;100ms to 0G RPC endpoints
- **Public IP**: Required for Retriever service

## Installation Guide


<Tabs>
<TabItem value="binary" label="DA Client" default>

### Prerequisites

<details>
<summary><b>Before You Begin</b></summary>

✅ **Required**:
- Docker & Docker Compose installed
- 0G testnet wallet with funds
- Access to 0G RPC endpoint

📍 **Testnet Resources**:
- RPC: `https://evmrpc-testnet.0g.ai`
- Faucet: [Get testnet tokens](https://faucet.0g.ai)
- Explorer: [View transactions](https://explorer-testnet.0g.ai)

</details>

### Step 1: Set Up DA Client

The DA Client is your main interface to the 0G DA network.

```bash
# Clone repository
git clone https://github.com/0glabs/0g-da-client.git
cd 0g-da-client

# Build Docker image
docker build -t 0g-da-client -f combined.Dockerfile .
```
### Step 2: Configure Environment

Create `envfile.env` with your settings:

```bash
# Network Configuration
COMBINED_SERVER_CHAIN_RPC=https://evmrpc-testnet.0g.ai
COMBINED_SERVER_PRIVATE_KEY=YOUR_PRIVATE_KEY_HERE  # ⚠️ Keep this secure!
ENTRANCE_CONTRACT_ADDR=0x857C0A28A8634614BB2C96039Cf4a20AFF709Aa9

# Performance Settings (Recommended defaults)
COMBINED_SERVER_RECEIPT_POLLING_ROUNDS=180
COMBINED_SERVER_RECEIPT_POLLING_INTERVAL=1s
COMBINED_SERVER_TX_GAS_LIMIT=2000000

# Storage Configuration  
COMBINED_SERVER_USE_MEMORY_DB=true  # Set false for persistent storage
COMBINED_SERVER_KV_DB_PATH=/runtime/
COMBINED_SERVER_TimeToExpire=2592000  # 30 days

# Service Ports
DISPERSER_SERVER_GRPC_PORT=51001

# Batcher Configuration
BATCHER_DASIGNERS_CONTRACT_ADDRESS=0x0000000000000000000000000000000000001000
BATCHER_FINALIZER_INTERVAL=20s
BATCHER_CONFIRMER_NUM=3
BATCHER_MAX_NUM_RETRIES_PER_BLOB=3
BATCHER_FINALIZED_BLOCK_COUNT=50
BATCHER_BATCH_SIZE_LIMIT=500  # MB

# Encoding Settings
BATCHER_ENCODING_INTERVAL=3s
BATCHER_ENCODING_REQUEST_QUEUE_SIZE=1
BATCHER_ENCODER_ADDRESS=DA_ENCODER_SERVER  # Update if using external encoder
BATCHER_ENCODING_TIMEOUT=300s

# Signing Configuration
BATCHER_SIGNING_INTERVAL=3s
BATCHER_SIGNED_PULL_INTERVAL=20s
BATCHER_SIGNING_TIMEOUT=60s

# Timeouts
BATCHER_CHAIN_READ_TIMEOUT=12s
BATCHER_CHAIN_WRITE_TIMEOUT=13s
BATCHER_EXPIRATION_POLL_INTERVAL=3600
```

:::warning Security Note
Never commit `envfile.env` to version control. Add it to `.gitignore`.
:::   



### Step 3: Launch DA Client

```bash
# Run the container
docker run -d \
  --env-file envfile.env \
  --name 0g-da-client \
  -v ./run:/runtime \
  -p 51001:51001 \
  0g-da-client combined

# Verify it's running
docker logs -f 0g-da-client

# Expected output:
# [INFO] DA Client started on port 51001
# [INFO] Connected to RPC endpoint
# [INFO] Ready to accept submissions
```

### Step 4: Test Your Setup

```bash
# Submit test data
curl -X POST http://localhost:51001/v1/test \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello 0G DA!"}'

# Check node health
curl http://localhost:51001/health
```

<details>
<summary><b>Advanced Configuration Reference</b></summary>

### Chain Configuration
| Parameter | Description | Default |
|-----------|-------------|--------|
| `chain.rpc` | 0G network RPC endpoint | Required |
| `chain.private-key` | Wallet private key for gas payments | Required |
| `chain.receipt-wait-rounds` | Max receipt polling attempts | 180 |
| `chain.gas-limit` | Transaction gas limit | 2000000 |

### Storage Configuration  
| Parameter | Description | Default |
|-----------|-------------|--------|
| `use-memory-db` | Use RAM vs disk storage | true |
| `kv-db-path` | Persistent storage location | /runtime/ |
| `time-to-expire` | Data retention period (seconds) | 2592000 |

### Performance Tuning
| Parameter | Description | Recommended |
|-----------|-------------|------------|
| `batch-size-limit` | Max batch size (MB) | 500 |
| `encoding-interval` | Encoding frequency | 3s |
| `confirmer-num` | Parallel confirmers | 3 |

</details>

  </TabItem>
  <TabItem value="source" label="DA Encoder">

## Setting Up DA Encoder

The Encoder handles erasure coding and data processing. It can run on CPU or GPU.

### Encoder Features

| Feature | Description | Performance Impact |
|---------|-------------|-----------------|
| **Parallel** | Multi-core CPU processing | 5-10x faster than serial |
| **CUDA** | GPU acceleration (NVIDIA) | 20-50x faster than CPU |

:::note GPU Compatibility
Currently optimized for NVIDIA RTX 4090 with driver 12.04. Other GPUs may work but require tuning.
:::

### Prerequisites

#### 1. Install Rust

```bash
# Install Rust toolchain
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Add to PATH
source $HOME/.cargo/env

# Verify installation
rustc --version
# Expected: rustc 1.7x.x or higher
```

#### 2. Install Dependencies

```bash
# System dependencies
sudo apt-get update
sudo apt-get install -y \
  protobuf-compiler \
  build-essential \
  pkg-config

# Rust toolchain
rustup toolchain install nightly-2024-02-04-x86_64-unknown-linux-gnu
rustup component add --toolchain nightly-2024-02-04-x86_64-unknown-linux-gnu rustfmt
rustup target add x86_64-unknown-linux-gnu
```

#### 3. GPU Setup (Optional)

<details>
<summary><b>NVIDIA CUDA Installation</b></summary>

1. Check GPU compatibility:
```bash
lspci | grep -i nvidia
```

2. Install CUDA Toolkit:
```bash
# Follow official guide at:
# https://developer.nvidia.com/cuda-toolkit
```

3. Verify installation:
```bash
nvidia-smi  # Should show GPU info
nvcc --version  # Should show CUDA version
```

</details>

### Build Cryptographic Parameters

:::tip
**TODO**: Add diagram explaining the role of public parameters in the erasure coding process
:::

The encoder requires cryptographic parameters for erasure coding:

#### Option 1: Download Pre-built (Recommended)
```bash
# Quick setup - downloads verified parameters
./dev-support/download_params.sh
```

#### Option 2: Build from Scratch
```bash
# Download powers of tau ceremony result
curl https://pse-trusted-setup-ppot.s3.eu-central-1.amazonaws.com/challenge_0084 \
  -o challenge_0084

# Generate AMT parameters
./dev_support/build_params.sh challenge_0084
# Note: This takes 30-60 minutes
```

### Run Encoder Service

```bash
# Clone repository
git clone https://github.com/0glabs/0g-da-encoder.git
cd 0g-da-encoder

# With GPU acceleration
cargo run -r -p server --features grpc/parallel,grpc/cuda -- --config run/config.toml

# CPU only
cargo run -r -p server --features grpc/parallel -- --config run/config.toml
```

The encoder will start on port **34000**.

### Verify Encoder Status

```bash
# Check if encoder is running
grpcurl -plaintext localhost:34000 list

# Test encoding capability
grpcurl -plaintext -d '{"data": "dGVzdA=="}' \
  localhost:34000 encoder.Encoder/Encode
```

### Integration with Your Code

```toml
# Cargo.toml
[dependencies]
zg-encoder = { git = "https://github.com/0glabs/0g-da-encoder.git" }
```

```rust
// Verify encoded data
use zg_encoder::EncodedSlice;

let is_valid = EncodedSlice::verify(&encoded_data, &commitment);
```

### Performance Benchmarking

```bash
# Benchmark your setup
cargo bench -p grpc \
  --features grpc/parallel,grpc/cuda \
  --bench process_data \
  --features zg-encoder/production_mode

# Expected throughput:
# CPU (parallel): 100-500 MB/s
# GPU (RTX 4090): 2-5 GB/s
```
</TabItem>
<TabItem value="docker" label="DA Retriever">
  
## Setting Up DA Retriever

The Retriever enables data access from the 0G DA network.

### Step 1: Clone Repository

```bash
git clone https://github.com/0glabs/0g-da-retriever.git
cd 0g-da-retriever
```

### Step 2: Prepare Docker Build

```bash
# Update .dockerignore
echo '!/run/config.toml' >> Dockerfile.dockerignore

# Create optimized Dockerfile
cat > Dockerfile << 'EOF'
# Build stage
FROM rust:alpine3.20 as builder

WORKDIR /0g-da-retriever
COPY . .

RUN apk update && apk add --no-cache make protobuf-dev musl-dev
RUN cargo build --release

# Runtime stage
FROM alpine:3.20

WORKDIR /0g-da-retriever

COPY --from=builder /0g-da-retriever/target/release/retriever /usr/local/bin/retriever
COPY --from=builder /0g-da-retriever/run/config.toml ./run/config.toml

CMD ["/usr/local/bin/retriever"]
EOF
```

### Step 3: Update Configuration Handler

```rust
// Edit retriever/src/config.rs
impl Config {
    pub fn from_cli_file() -> Result<Self> {
        let matches = cli::cli_app().get_matches();
        let config_file = matches
            .get_one::<String>("config")
            .map(|s| s.as_str())
            .unwrap_or("/0g-da-retriever/run/config.toml");

        let c = RawConfig(
            config::Config::builder()
                .add_source(config::File::with_name(config_file))
                .build()?,
        );

        Ok(Self {
            log_level: c.get_string("log_level")?,
            eth_rpc_url: c.get_string("eth_rpc_endpoint")?,
            grpc_listen_address: c.get_string("grpc_listen_address")?,
            max_ongoing_retrieve_request: c.get_u64_opt("max_ongoing_retrieve_request")?,
        })
    }
}
```

### Step 4: Configure and Launch

```toml
# Edit run/config.toml
log_level = "info"
grpc_listen_address = "0.0.0.0:34005"
eth_rpc_endpoint = "https://evmrpc-testnet.0g.ai"
max_ongoing_retrieve_request = 100
```

```bash
# Build and run
docker build -t 0g-da-retriever .
docker run -d \
  --name 0g-da-retriever \
  -p 34005:34005 \
  0g-da-retriever

# Verify it's running
docker logs 0g-da-retriever
```

## Troubleshooting

<details>
<summary><b>Common Issues and Solutions</b></summary>

### DA Client Issues

**Problem**: "Failed to connect to RPC"
- Check RPC endpoint is accessible
- Verify network connectivity
- Ensure correct chain ID

**Problem**: "Insufficient funds"
- Check wallet balance
- Request testnet tokens from faucet
- Verify gas price settings

### Encoder Issues

**Problem**: "CUDA out of memory"
- Reduce batch size
- Use CPU-only mode
- Check GPU memory usage

**Problem**: "Parameters not found"
- Run `./dev-support/download_params.sh`
- Check file permissions
- Verify download completed

### Retriever Issues

**Problem**: "Port already in use"
- Change port in config.toml
- Stop conflicting service
- Use different port mapping

</details>

## Next Steps

### Integration Examples
- 🧪 **[Rust Example](https://github.com/0glabs/0g-da-example-rust)** - Complete integration guide
- 🔧 **[SDK Documentation](../storage/sdk)** - Client libraries
- 📡 **[API Reference](https://docs.0g.ai/api)** - Full API documentation

### Performance Optimization
- 🚀 **[Tuning Guide](./performance)** - Optimize throughput
- 📊 **[Monitoring Setup](./monitoring)** - Track node metrics
- 🔒 **[Security Best Practices](./security)** - Secure your deployment

### Get Support
- 💬 **[Discord Community](https://discord.gg/0glabs)** - Ask questions
- 🐛 **[GitHub Issues](https://github.com/0glabs/0g-da-client/issues)** - Report bugs
- 📖 **[Knowledge Base](https://kb.0g.ai)** - Common solutions

</TabItem>
</Tabs>
