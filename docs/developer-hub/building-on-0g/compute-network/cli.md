---
id: cli
title: Fine-tuning CLI
sidebar_position: 5
---

## Introduction

### Overview

The fine-tuning service is an AI service based on the 0G Compute Network that allows users to access computing resources from AI service providers via the 0G Compute Network. Fine-tuning service providers can offer computing resources through the 0G Compute Network to assist AI users in model fine-tuning. This document describes how to interact with the 0G Compute Network using the Fine-tuning CLI.

### Component Independence

0G Compute Network is designed as an independent component of the 0G ecosystem. You can use it without requiring adoption of other 0G components. This allows you to:

- Access decentralized compute resources without using 0G Chain
- Fine-tune AI models using the compute network independently
- Integrate the compute capabilities with your existing applications
- Build compute-focused applications without other 0G dependencies

## Setup

### Prerequisites

Node version >= 22.0.0

### Installation

```bash
pnpm install @0glabs/0g-serving-broker -g
```

### Environment Variables

Before using the Fine-tuning CLI, you need to set the following environment variables: `RPC_ENDPOINT` and `ZG_PRIVATE_KEY`. `RPC_ENDPOINT` is the RPC endpoint of the 0G Compute Network, and `ZG_PRIVATE_KEY` is your private key.

```bash
export RPC_ENDPOINT=<YOUR_RPC_ENDPOINT>   # default: https://evmrpc-testnet.0g.ai
export ZG_PRIVATE_KEY=<YOUR_PRIVATE_KEY>
```

## Basic Workflow

### Create Account

The Fine-tuning CLI requires an account to pay for service fees via the 0G Compute Network. You can create an account with the following command:

```bash
0g-compute-cli add-account --amount <AMOUNT>
```

### List Providers

```bash
0g-compute-cli list-providers
```

The output will be like:

```
┌──────────────────────────────────────────────────┬──────────────────────────────────────────────────┐
│ Provider 1                                       │ 0xf07240Efa67755B5311bc75784a061eDB47165Dd       │
├──────────────────────────────────────────────────┼──────────────────────────────────────────────────┤
│ Available                                        │ ✓                                                │
├──────────────────────────────────────────────────┼──────────────────────────────────────────────────┤
│ Price Per Byte in Dataset (OG)                 │ 0.000000000000000001                             │
├──────────────────────────────────────────────────┼──────────────────────────────────────────────────┤
│ Provider 2                                       │ ......                                           │
├──────────────────────────────────────────────────┼──────────────────────────────────────────────────┤
│ ......                                           │ ......                                           │
└──────────────────────────────────────────────────┴──────────────────────────────────────────────────┘
```

- **Provider x:** The address of the provider. The address of the official provider is `0xf07240Efa67755B5311bc75784a061eDB47165Dd`.
- **Available:** Indicates if the provider is available. If `✓`, the provider is available. If `✗`, the provider is occupied.
- **Price Per Byte in Dataset (OG):** The service fee charged by the provider. The fee is currently based on the byte count of the dataset. Future versions may charge more accurately based on the token count of the dataset.

### List Preset Models

```bash
0g-compute-cli list-models
```

The output will be like:

```
┌──────────────────────────────┬───────────────────────────────────────────────────────────────────────────┐
│ Name                         │ Description                                                               │
├──────────────────────────────┼───────────────────────────────────────────────────────────────────────────┤
│ distilbert-base-uncased      │ DistilBERT is a transformers model, smaller and faster than BERT, which w │
│                              │ as pretrained on the same corpus in a self-supervised fashion, using the  │
│                              │ BERT base model as a teacher. More details can be found at: https://huggi │
│                              │ ngface.co/distilbert/distilbert-base-uncased                              │
├──────────────────────────────┼───────────────────────────────────────────────────────────────────────────┤
│ cocktailsgd-opt-1.3b         │ CocktailSGD-opt-1.3B finetunes the Opt-1.3B langauge model with CocktailS │
│                              │ GD, which is a novel distributed finetuning framework. More details can b │
│                              │ e found at: https://github.com/DS3Lab/CocktailSGD                         │
└──────────────────────────────┴───────────────────────────────────────────────────────────────────────────┘
```

_Note_: We currently offer the models listed above as presets. You can choose one of these models for fine-tuning. More models will be provided in future versions. Later versions will also support users fine-tuning with their own pretrained models.

### Prepare Configuration File

Please download the parameter file template for the model you wish to fine-tune from the [releases page](https://github.com/0glabs/0g-serving-broker/releases) and modify it according to your needs.

### Prepare Dataset

Please download the dataset format specification and verification script from the [releases page](https://github.com/0glabs/0g-serving-broker/releases) to make sure your generated dataset complies with the requirements.

After preparing the dataset, upload it to 0G Storage using the following command:

```bash
0g-compute-cli upload --data-path <PATH_TO_DATASET>
```

_Note_: Record the root hash and byte size of the dataset; they will be needed in later steps.

### Create Fine-Tuning Task

Once you've chosen a pretrained model and prepared your dataset and configuration file, you can create a fine-tuning task with the following command:

```bash
0g-compute-cli  create-task  --provider <PROVIDER_ADDRESS> --model <MODEL_NAME> --dataset <DATASET_ROOT_HASH> --config <CONFIG_FILE_PATH> --data-size <DATA_SIZE> --gas-price <GAS_PRICE>
```

- **--provider:** Address of the service provider; see [List Providers](#List-Providers)
- **--model:** Name of the pretrained model; see [List Preset Models](#List-Preset-Models)
- **--dataset:** Root hash of the dataset; see [Prepare Dataset](#Prepare-Dataset)
- **--config:** Path to the parameter file; see [Prepare Configuration File](#Prepare-Configuration-File)
- **--data-size:** Byte size of the dataset; see [Prepare Dataset](#Prepare-Dataset)
- **--gas-price:** Gas price. If not specified, a default value calculated by the client will be used.

The output will be like:

```
Verify provider...
Provider verified
Creating task...
Created Task ID: 6b607314-88b0-4fef-91e7-43227a54de57
```

_Note_: When creating a task for the same provider, you must wait for the previous task to be completed (status `Finished`) before creating a new task.

### Check Task

You can check the status of a task using the command below:

```bash
0g-compute-cli get-task --provider <PROVIDER_ADDRESS> --task <TASK_ID>
```

- **--provider:** Address of the service provider
- **--task:** Task ID. If not specified, the most recently created task will be displayed.

The output will be like:

```
┌───────────────────────────────────┬─────────────────────────────────────────────────────────────────────────────────────┐
│ Field                             │ Value                                                                               │
├───────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ ID                                │ beb6f0d8-4660-4c62-988d-00246ce913d2                                                │
├───────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Created At                        │ 2025-03-11T01:20:07.644Z                                                            │
├───────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Pre-trained Model Hash            │ 0xcb42b5ca9e998c82dd239ef2d20d22a4ae16b3dc0ce0a855c93b52c7c2bab6dc                  │
├───────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Dataset Hash                      │ 0xaae9b4e031e06f84b20f10ec629f36c57719ea512992a6b7e2baea93f447a5fa                  │
├───────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Training Params                   │ {......}                                                                            │
├───────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Fee (neuron)                      │ 179668154                                                                           │
├───────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
│ Progress                          │ Delivered                                                                           │
└───────────────────────────────────┴─────────────────────────────────────────────────────────────────────────────────────┘
```

- **ID:** Task ID
- **Pre-trained Model Hash:** Root hash corresponding to the pretrained model stored on storage
- **Dataset Hash:** Root hash corresponding to the dataset stored on storage
- **Training Params:** Parameters used for fine-tuning
- **Fee (neuron):** Task fee.
- **Progress:** Task status. Possible values are `InProgress`, `Delivered`, `UserAckDelivered`, `Finished`, `Failed`. These represent "task in progress", "provider has uploaded the fine-tuning result", "user has confirmed the result is downloadable", "task completed", "task failed" respectively.

### View Task Logs

You can view task logs with the following command:

```bash
0g-compute-cli get-task-log --provider <PROVIDER_ADDRESS> --task <TASK_ID>
```

Possible output:

```
creating task....
Step: 0, Logs: {'loss': ..., 'accuracy': ...}
...
Training model for task beb6f0d8-4660-4c62-988d-00246ce913d2 completed successfully
```

### Confirm Task Result

Use the [Check Task](#Check-Task) command to view task status. When the status changes to `Delivered`, it indicates that the provider has completed the fine-tuning task and uploaded the result to storage. The corresponding root hash has also been saved to the contract. You can download the model with the following command; CLI will download the model based on the root hash submitted by the provider. If the download is successful, CLI updates the contract information to confirm the model is downloaded.

```bash
0g-compute-cli acknowledge-model --provider <PROVIDER_ADDRESS>  --data-path <PATH_TO_SAVE_MODEL>
```

_Note_: The model file downloaded with the above command is encrypted, and additional steps are required for decryption.

### Decrypt Model

The provider will check the contract to verify if the user has confirmed the download, enabling the provider to settle fees successfully on the contract subsequently. Once the provider confirms the download, it uploads the key required for decryption to the contract, encrypted with the user's public key, and collects the fee. You can again use the `get-task` command to view the task status. When the status changes to `Finished`, it means the provider has uploaded the key. At this point, you can decrypt the model with the following command:

```bash
0g-compute-cli decrypt-model --provider <PROVIDER_ADDRESS> --encrypted-model <PATH_TO_ENCRYPTED_MODEL> --output <PATH_TO_SAVE_DECRYPTED_MODEL>
```

The above command performs the following operations:

1. Gets the encrypted key from the contract uploaded by the provider
2. Decrypts the key using the user's private key
3. Decrypts the model with the decrypted key

## Account Management

### View Account

```bash
0g-compute-cli get-account
```

Possible output:

```
  Overview
┌──────────────────────────────────────────────────┬─────────────────────────────────────────────────────────────────────────────────┐
│ Balance                                          │ Value (OG)                                                                    │
├──────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤
│ Total                                            │ 0.999999999820331942                                                            │
├──────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────┤
│ Locked (transferred to sub-accounts)             │ 0.000000000179668154                                                            │
└──────────────────────────────────────────────────┴─────────────────────────────────────────────────────────────────────────────────┘

  Fine-tuning sub-accounts (Dynamically Created per Used Provider)
┌──────────────────────────────────────────────────┬──────────────────────────────┬──────────────────────────────────────────────────┐
│ Provider                                         │ Balance (OG)               │ Requested Return to Main Account (OG)          │
├──────────────────────────────────────────────────┼──────────────────────────────┼──────────────────────────────────────────────────┤
│ 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC       │ 0.000000000179668154         │ 0.000000000000000000                             │
├──────────────────────────────────────────────────┼──────────────────────────────┼──────────────────────────────────────────────────┤
│ ......                                           │ ......                       │ ......                                           │
└──────────────────────────────────────────────────┴──────────────────────────────┴──────────────────────────────────────────────────┘
```

**Overview:** Provides a general overview of the account's balance.

- **Total:** The current balance of the account
- **Locked:** The cumulative amount locked in all sub-accounts

**Fine-tuning sub-accounts:** Information about sub-accounts, with each sub-account corresponding to a provider for paying the provider's service fee. Each sub-account is dynamically created when tasks are submitted.

- **Provider:** Address of the provider corresponding to the sub-account
- **Balance:** Balance of the sub-account, which is an amount transferred from the main account to the sub-account based on the task fee whenever a task is created.
- **Requested Return to Main Account:** Amount requested to be returned from sub-accounts to the main account. If the amount in the sub-account goes unspent for any reason, such as a task failure, you can use the `return-funds` command to return the balance to the main account. However, it won't return immediately and will only be available after a lock-in period. For details, refer to [Retrieving Funds](#Retrieve-Funds).

_Note:_ For more information about sub-accounts, refer to [View Sub-Account](#View-Sub-Account).

### Deposit

You can deposit into your account using the following command.

```bash
0g-compute-cli deposit --amount <AMOUNT>
```

### Withdrawal

You can withdraw to your wallet with the following command:

```bash
0g-compute-cli refund --amount <AMOUNT>
```

_Note_: You can't withdraw the "Lock" amount in the account; only the "Total-Lock" portion can be withdrawn.

### View Sub-Account

Sub-accounts are dynamically created when tasks are submitted and used to pay provider service fees. You can view sub-account information with the following command:

```bash
0g-compute-cli get-sub-account --provider <PROVIDER_ADDRESS>
```

Possible output:

```
  Overview
┌──────────────────────────────────────────────────┬──────────────────────────────────────────────────┐
│ Field                                            │ Value                                            │
├──────────────────────────────────────────────────┼──────────────────────────────────────────────────┤
│ Provider                                         │ 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC       │
├──────────────────────────────────────────────────┼──────────────────────────────────────────────────┤
│ Balance (OG)                                   │ 0.000000000179668154                             │
├──────────────────────────────────────────────────┼──────────────────────────────────────────────────┤
│ Funds Applied for Return to Main Account (OG)  │ 0.000000000179668154                             │
└──────────────────────────────────────────────────┴──────────────────────────────────────────────────┘

  Details of Each Amount Applied for Return to Main Account
┌──────────────────────────────────────────────────┬──────────────────────────────────────────────────┐
│ Amount (OG)                                    │ Remaining Locked Time                            │
├──────────────────────────────────────────────────┼──────────────────────────────────────────────────┤
│ 0.000000000179668154                             │ 23h 58min 34s                                    │
└──────────────────────────────────────────────────┴──────────────────────────────────────────────────┘

  Deliverables
┌───────────────────────────────────────────────────────────────────────────┬─────────────────────────┐
│ Root Hash                                                                 │ Access Confirmed        │
├───────────────────────────────────────────────────────────────────────────┼─────────────────────────┤
│ 0x24951e897b1203e8aa1692736837f089a95b70390cc02723505e41ebf9              │ ✓                       │
│ cac70c                                                                    │                         │
├───────────────────────────────────────────────────────────────────────────┼─────────────────────────┤
│ 0x85b3869bcf14569bb41c3d7d499c9a8eb441e6d606bbe3e10e0fac90e5              │                         │
│ 7d36a4                                                                    │                         │
└───────────────────────────────────────────────────────────────────────────┴─────────────────────────┘
```

**Overview:** An overview of the account

- **Provider:**: Address of the provider corresponding to the sub-account
- **Balance:**: Balance of the sub-account. The main account transfers a certain amount to the sub-account based on the task fee every time a task is created.
- **Funds Applied for Return to Main Account:** Amount in the sub-account requested to be returned to the main account

**Details of Each Amount Applied for Return to Main Account:** Detailed information about amounts requested to be returned to the main account

- **Amount:** Amount requested to be returned to the main account
- **Remaining Locked Time:** Remaining locked time for the return amount to be available in the main account

**Deliverables:** Deliverables issued by the provider after task completion

- **Root Hash:** Root hash of the model uploaded to storage
- **Access Confirmed:** Indicates whether the user has confirmed download access to the model based on the root hash

### Retrieve Funds

The retrieve funds operation returns the balance from sub-accounts to the main account. This operation is asynchronous and will execute after a specific locking period of 24 hours. The lock time ensures provider rights protection, preventing the user from immediately returning the balance to the main account after provider services are rendered and stopping the provider from getting paid.

```bash
0g-compute-cli retrieve-fund
```

The above command requests the balance from all sub-accounts to be returned to the main account. After the lock-in period elapses, execute the `retrieve-fund` command again to refund all the amounts whose locking period has concluded to the main account. Check the refund status using the [View Sub-Account](#View-Sub-Account) command.

## Other Commands

### View Task List

You can view the list of tasks submitted to a specific provider using the following command:

```bash
0g-compute-cli list-tasks  --provider <PROVIDER_ADDRESS>
```

### Download Data

You can download previously uploaded datasets using the command below:

```bash
0g-compute-cli download --data-path <PATH_TO_SAVE_DATASET> --data-root <DATASET_ROOT_HASH>
```