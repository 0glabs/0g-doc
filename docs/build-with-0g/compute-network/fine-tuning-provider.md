---
id: fine-tuning-provider
title: Fine-tuning Provider
sidebar_position: 4
---

This guide provides a comprehensive walkthrough for setting up and offering computing power as a fine-tuning provider on the 0G Compute Network.

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
- **Supporting Customized Models from Providers**

  To enable support for customized models provided by the service provider, you need to add the following configuration to your `config.local.yaml` file:

    ```bash
      service:
        customizedModels:
          - name: "deepseek-r1-distill-qwen-1.5b"
            hash: "<MODEL_ROOT_HASH>"
            image: "deepseek:latest"
            dataType: "text"
            trainingScript: "/app/finetune.py"
            description: "DeepSeek-R1-Zero, a model trained via large-scale reinforcement learning (RL) without supervised fine-tuning (SFT) as a preliminary step, demonstrated remarkable performance on reasoning."
            tokenizer: "<TOKENIZER_ROOT_HASH>"
          - name: "mobilenet_v2"
            hash: "<MODEL_ROOT_HASH>"
            image: "mobilenetV2:latest"
            dataType: "image"
            trainingScript: "/app/finetune.py"
            description: "MobileNet V2 model pre-trained on ImageNet-1k at resolution 224x224."
            tokenizer: "<TOKENIZER_ROOT_HASH>"
    ```
    Configuration Fields:

    - **name:** The name of the customized model.
    - **hash:** The root hash of the model.
    - **image:** The name of the Docker image that contains the model and its environment.
    - **dataType:** The type of dataset the model is designed to train on. Possible values are `text` or `image`.
    - **trainingScript:** The path to the training script inside the Docker container.
    - **description:** A short description of the model, including key features or training methodology.
    - **tokenizer:** The root hash of the tokenizer files used to calculate dataset's size.

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
