---
id: fine-tuning-provider
title: Fine-tuning Provider
sidebar_position: 4
---

This guide provides a comprehensive walkthrough for setting up and offering computing power as a fine-tuning provider on the 0G Compute Network.

## Component Independence

0G Compute Network is designed to function independently from other 0G components. As a fine-tuning provider, you can:

- Offer AI model fine-tuning services without integration with other 0G systems
- Leverage your existing compute infrastructure for the 0G ecosystem
- Earn fees directly through the compute network's settlement system
- Provide specialized fine-tuning capabilities for various AI applications

## Preparation

### Download the Installation Package

- **Visit the Releases Page:** [0G Serving Broker Releases](https://github.com/0glabs/0g-serving-broker/releases)
- **Download and Extract:** Get the latest version of the fine-tuning installation package.

### Configuration Setup

- **Copy the Config File:** Duplicate `config.example.yaml` to create `config.local.yaml`.
- **Modify Settings:**
  - Set `servingUrl` to your publicly accessible URL.
  - Set `privateKeys` using your wallet's private key for the 0G blockchain.
- **Edit `docker-compose.yml`:** Replace `#PORT#` with the desired port, matching the port in `config.local.yaml`.

## Build the TDX Guest Image

### Prerequisites Installation

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

### Build CVM Image

To ensure secure and private execution of fine-tuning tasks, you will build an image suitable for running in a Confidential Virtual Machine (CVM). This process leverages NVIDIA's TEE GPU technology and Intel CPUs with TDX support, enhancing security by running model training in an isolated environment.

- **Clone Repository:**

  ```bash
  git clone https://github.com/nearai/private-ml-sdk --recursive
  cd private-ml-sdk/
  ./build.sh
  ```

- **Image Files Location:** Check out `private-ml-sdk/images/`. Available images include:
  - `dstack-nvidia-0.3.0`: Production image without developer tools.
  - `dstack-nvidia-dev-0.3.0`: Development image with tools like `sshd`, `strace`.

## Run Application

### Run the Local KMS

The Local KMS provides essential keys for CVM initialization, derived from local TEE hardware.

- **Launch KMS:**
  ```bash
  cd private-ml-sdk/meta-dstack-nvidia/dstack/key-provider-build/
  ./run.sh
  ```

### Run the TDX Guest Image

Ensure you have a TDX host machine with the TDX driver and a compatible NVIDIA GPU.

- **Update PATH:**

  ```bash
  pushd private-ml-sdk/meta-dstack-nvidia/scripts/bin
  PATH=$PATH:`pwd`
  popd
  ```

- **List Available GPUs:**

  ```bash
  dstack lsgpu
  ```

- **Create CVM Instance:**

  Replace `#PORT#` with your configured port:

  ```bash
  dstack new docker-compose.yaml -o my-gpu-cvm \
         --local-key-provider \
         --gpu [GPU_ID] \
         --image images/dstack-nvidia-0.3.0 \
         -c 2 -m 4G -d 100G \
         --port tcp:0.0.0.0:#PORT#:#PORT#
  ```

### Run the CVM

- **Copy Config File:**

  ```bash
  cp config.local.yaml private-ml-sdk/my-gpu-cvm/shared/config.local.yaml
  ```

- **Start the CVM:**
  ```bash
  sudo -E dstack run my-gpu-cvm
  ```

By following these steps, you will successfully set up your service as a fine-tuning provider on the 0G Compute Network, leveraging secure and verifiable computing environments.