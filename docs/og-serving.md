---
title: 0G Serving
sidebar_position: 5
---


# 0G Serving: Decentralized Inference & Beyond
---
In today's world, AI models are transforming industries, driving innovation, and powering new applications. But despite their increasing value, there's a critical gap in how AI services are delivered. Centralized platforms limit access, inflate costs, and restrict the flexibility of AI developers. That’s where 0G Serving comes in.

## What is 0G Serving?

0G Serving is our decentralized framework that supports AI model inference, data retrieval, and training tasks.

The first iteration focuses specifically on decentralized settlement for inference, connecting buyers (who want to use AI models) with sellers (who run these models on their GPUs) in a trustless, transparent manner. Sellers, known as service providers, are able to set the price for each model they support and be rewarded real-time for their contributions. It’s a fully decentralized marketplace that eliminates the need for intermediaries, redefining how AI services are accessed and delivered and making them cheaper, more efficient, and accessible to anyone, anywhere.

## How does it work?

The 0G Serving contract facilitates secure interactions between users (AI buyers) and service providers (GPU owners running AI models), ensuring smooth data retrieval, fee collection, and service execution. Here’s how it works:
1. **Service Provider Registration:** Service providers first register the type of AI service they offer (e.g., model inference) and set pricing for each type within the smart contract.
2. **User Pre-deposits Fees:** When a user wants to access a service, they pre-deposit a fee into the smart contract associated with the selected service provider. This ensures that funds are available to compensate the service provider.
3. **Request and Response System:** Users send requests for AI inference, and the service provider decides whether to respond based on the sufficiency of the user’s remaining balance. Both the user and the provider sign each request and response, ensuring trustless verification of transactions.

Here are some of the key features of the system:
- **Open Access with Fair Rewards:** Anyone with the right hardware can become a service provider and earn fair compensation for running AI models. This open-access, decentralized structure enables a global network of contributors, where providers are directly rewarded for their computational resources and services, fostering a new ecosystem of decentralized AI. 
- **Optimized Efficiency:** 0G Serving uses a variety of different mechanisms to minimize costs and maximize performance. Service providers can batch-process multiple user requests to minimize the number of on-chain settlements, optimizing transaction costs and network efficiency. ZK-proofs are used to compress transaction data, lowering on-chain settlement costs. Additionally, to reduce the on-chain costs of storing request traces with data keys, 0G Storage allows for scalable off-chain data management, enabling more efficient storage and retrieval while keeping costs low.
- **User-Centric Design:** The platform offers a smooth user experience, with a built-in refund mechanism that ensures users can reclaim unused funds within a clearly defined time window. This process is executed by smart contracts, ensuring a reliable, secure, and frictionless process for both service providers and users. 

By decentralizing both services and settlement, 0G Serving provides a scalable and trustless alternative to centralized AI platforms.

Over time, we aim to decentralize the entire AI workflow—from inference to data and training—by keeping everything on-chain and autonomous.
