---
id: fine-tuning-provider
title: Fine-tuning Provider
sidebar_position: 4
---

This guide provides a comprehensive walkthrough for setting up and offering computing power as a fine-tuning provider on the 0G Compute Network. To achieve this, you need to establish a verifiable model service using the [private-ml-sdk](https://github.com/nearai/private-ml-sdk?tab=readme-ov-file#getting-started).

## What are Verifiable Services?

Verifiable services ensure secure and private execution of fine-tuning by utilizing NVIDIA's TEE GPU technology and Intel CPUs with TDX support. The Private ML SDK creates a Confidential Virtual Machine (CVM), running in an isolated CPU environment, ensuring model and data protection during processing.

## Steps to Set Up a Verifiable Service

### 1. Download the Installation Package

1. **Visit the Releases Page:** [0G Serving Broker Releases](https://github.com/0glabs/0g-serving-broker/releases)
2. **Download and Extract:** Get the latest version of the fine-tuning installation package.

### 2. Configuration Setup

1. **Copy the Config File:** Duplicate `config.example.yaml` to create `config.local.yaml`.
2. **Modify Settings:**
   - Set `servingUrl` to your publicly accessible URL.
   - Set `privateKeys` using your wallet's private key for the 0G blockchain.
3. **Edit `docker-compose.yml`:** Replace `#PORT#` with the desired port, matching the port in `config.local.yaml`.

### 3. Build the TDX Guest Image

#### Prerequisites

- **Install Docker:**
  ```bash
  curl -fsSL https://get.docker.com -o get-docker.sh
  sudo sh get-docker.sh
  ```
- **Add User to Docker Group:**
  ```bash
  sudo usermod -aG docker $USER
  newgrp docker
  ```
- **Verify Installation:**
  ```bash
  docker --version
  docker run hello-world
  ```

#### Build Image

1. **Clone Repository:**

   ```bash
   git clone https://github.com/nearai/private-ml-sdk --recursive
   cd private-ml-sdk/
   ./build.sh
   ```

2. **Image Files Location:** Check out `private-ml-sdk/images/`. Available images include:
   - `dstack-nvidia-0.3.0/`: Production image without developer tools.
   - `dstack-nvidia-dev-0.3.0/`: Development image with tools like `sshd`, `strace`.

### 4. Run the Local KMS

The Local KMS provides essential keys for CVM initialization, derived from local TEE hardware.

1. **Launch KMS:**
   ```bash
   cd private-ml-sdk/meta-dstack-nvidia/dstack/key-provider-build/
   ./run.sh
   ```

### 5. Run the TDX Guest Image

Ensure you have a TDX host machine with the TDX driver and a compatible NVIDIA GPU.

1. **Update PATH:**

   ```bash
   pushd private-ml-sdk/meta-dstack-nvidia/scripts/bin
   PATH=$PATH:`pwd`
   popd
   ```

2. **List Available GPUs:**

   ```bash
   dstack lsgpu
   ```

3. **Create CVM Instance:**

   Replace `#PORT#` with your configured port:

   ```bash
   dstack new docker-compose.yaml -o my-gpu-cvm \
          --local-key-provider \
          --gpu [GPU_ID] \
          --image images/dstack-nvidia-0.3.0 \
          -c 2 -m 4G -d 100G \
          --port tcp:0.0.0.0:#PORT#:#PORT#
   ```

### 6. Run the CVM

1. **Copy Config File:**

   ```bash
   cp config.local.yaml private-ml-sdk/my-gpu-cvm/shared/config.local.yaml
   ```

2. **Start the CVM:**
   ```bash
   sudo -E dstack run my-gpu-cvm
   ```

By following these steps, you will successfully set up your service as a fine-tuning provider on the 0G Compute Network, leveraging secure and verifiable computing environments.
