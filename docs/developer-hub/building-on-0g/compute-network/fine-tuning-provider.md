---
id: fine-tuning-provider
title: Fine-tuning Provider
sidebar_position: 4
---

# Become a Fine-tuning Provider

This guide provides a comprehensive walkthrough for setting up and offering computing power as a fine-tuning provider on the 0G Compute Network.

## Prerequisites

- Docker and Docker Compose
- TDX-enabled Intel CPU
- Compatible NVIDIA GPU (H100/H200 with TEE support)
- Wallet with 0G tokens for gas fees
- Publicly accessible server

## Preparation

### Download the Installation Package

- **Visit the Releases Page:** [0G Serving Broker Releases](https://github.com/0glabs/0g-serving-broker/releases)
- **Download and Extract:** Get the latest version of the fine-tuning installation package.

### Configuration Setup

**Copy the Config File:** Duplicate `config.example.yaml` to create `config.local.yaml`.

```bash
cp config.example.yaml config.local.yaml
```

**Modify Settings:**
- Set `servingUrl` to your publicly accessible URL.
- Set `privateKeys` using your wallet's private key for the 0G blockchain.

**Edit `docker-compose.yml`:** Replace `#PORT#` with the desired port, matching the port in `config.local.yaml`.

```bash
# Replace #PORT# with your service port
sed -i 's/#PORT#/8080/g' docker-compose.yml
```

### Supporting Custom Models from Providers

To include custom models, refer to the example configuration below and update your `config.local.yaml` file accordingly. Ensure that all required fields are properly defined to match your specific model setup.

```yaml
service:
  customizedModels:
    - name: "deepseek-r1-distill-qwen-1.5b"
      hash: "<MODEL_ROOT_HASH>"
      image: "deepseek:latest"
      dataType: "text"
      trainingScript: "/app/finetune.py"
      description: "DeepSeek-R1-Zero, a model trained via large-scale reinforcement learning (RL) without supervised fine-tuning (SFT) as a preliminary step, demonstrated remarkable performance on reasoning."
      tokenizer: "<TOKENIZER_ROOT_HASH>"
      usageFile: "<ZIP_FILE>"
    - name: "mobilenet_v2"
      hash: "<MODEL_ROOT_HASH>"
      image: "mobilenetV2:latest"
      dataType: "image"
      trainingScript: "/app/finetune.py"
      description: "MobileNet V2 model pre-trained on ImageNet-1k at resolution 224x224."
      tokenizer: "<TOKENIZER_ROOT_HASH>"
      usageFile: "<ZIP_FILE>"
```

**Configuration Fields:**

- **name:** Model identifier
- **hash:** The root hash of the pre-trained model, obtained after uploading the model to 0G storage.
- **image:** The Docker image that encapsulates the fine-tuning execution environment.
- **dataType:** Specifies the type of dataset the model is intended to train on. Valid options include `text` or `image`.
- **trainingScript:** Specifies the path to the training script within the container. Fine-tuning will be executed using the command `python <trainingScript>`.
- **description:** A concise overview of the model, highlighting its key features and capabilities.
- **tokenizer:** The root hash of the tokenizer files used for dataset processing. This value is obtained after uploading the tokenizer files to 0G storage.
- **usageFile:** The ZIP file (referenced by its name, not the full path) contains detailed usage information for this model, including training configuration examples, build specifications, or sample datasets. Make sure the file is placed in the `./models` directory.

## Build the TDX Guest Image

### Prerequisites Installation

**Install Docker:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

**Add User to Docker Group:**
```bash
sudo usermod -aG docker $USER
newgrp docker
```

**Verify Installation:**
```bash
docker --version
docker run hello-world
```

### Build CVM Image

To ensure secure and private execution of fine-tuning tasks, you will build an image suitable for running in a Confidential Virtual Machine (CVM). This process leverages NVIDIA's TEE GPU technology and Intel CPUs with TDX support, enhancing security by running model training in an isolated environment.

**Clone Repository:**

```bash
git clone https://github.com/nearai/private-ml-sdk --recursive
cd private-ml-sdk/
./build.sh
```

**Image Files Location:** Check out `private-ml-sdk/images/`. Available images include:
- `dstack-nvidia-0.3.0`: Production image without developer tools.
- `dstack-nvidia-dev-0.3.0`: Development image with tools like `sshd`, `strace`.

## Run Application

### Run the Local KMS

The Local KMS provides essential keys for CVM initialization, derived from local TEE hardware.

**Launch KMS:**
```bash
cd private-ml-sdk/meta-dstack-nvidia/dstack/key-provider-build/
./run.sh
```

### Run the TDX Guest Image

Ensure you have a TDX host machine with the TDX driver and a compatible NVIDIA GPU.

**Update PATH:**

```bash
pushd private-ml-sdk/meta-dstack-nvidia/scripts/bin
PATH=$PATH:`pwd`
popd
```

**List Available GPUs:**

```bash
dstack lsgpu
```

**Create CVM Instance:**

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

**Copy Config File:**

```bash
cp config.local.yaml private-ml-sdk/my-gpu-cvm/shared/config.local.yaml
```

**Start the CVM:**
```bash
sudo -E dstack run my-gpu-cvm
```

## Troubleshooting

<details>
<summary><b>CVM fails to start</b></summary>

- Verify TDX is enabled in BIOS
- Check GPU compatibility and drivers
- Ensure sufficient resources allocated
- Review logs: `sudo dstack logs my-gpu-cvm`
</details>

<details>
<summary><b>Service not accessible</b></summary>

- Confirm firewall allows incoming connections
- Verify public IP/domain configuration
- Check port consistency between config and Docker
- Test local connectivity first
</details>

<details>
<summary><b>Model upload issues</b></summary>

- Ensure model files are uploaded to 0G storage
- Verify root hash is correctly configured
- Check tokenizer files are included
- Confirm Docker image exists and is accessible
</details>

---

*By following these steps, you will successfully set up your service as a fine-tuning provider on the 0G Compute Network, leveraging secure and verifiable computing environments.*