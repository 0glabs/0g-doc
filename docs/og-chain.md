---
id: og-chain
title: 0G Chain 
sidebar_position: 5
---

# 0G Chain: The Fastest Modular AI Chain
---

The integrity of the 0G system is maintained by 0G's consensus network, which can support an arbitrary number of independent consensus networks. As network requirements increase, new consensus networks can be added to support horizontal scalability and increase the system's overall bandwidth and performance. By decoupling data publication from data storage, 0G optimizes both throughput and scalability, overcoming the limitations seen in existing DA solutions.

A key differentiator of 0G is its ability to efficiently handle vast sums of data with immense throughput, supported by horizontal scalability.

## 0G Consensus

Core to this is 0G's consensus layer: *0G Consensus*.

This unique consensus mechanism consists of an arbitrary number of independent consensus networks. For instance, 1, 100, or even 1,000 different networks could simultaneously engage in data availability tasks on behalf of the 0G network.

This works by having 0G Consensus collaborate with 0G Storage to validate data. DA Nodes are randomly queried (using a VRF) and collectively reach a consensus on the validity of the data, which is broadcasted to 0G Consensus. As the amount of data to be confirmed grows exponentially, the consensus networks (that in aggregate form 0G Consensus) can expand.  

## Shared Staking Mechanism

Typically, adding more consensus networks would necessitate validators to stake additional assets, making it challenging to maintain sufficient security for each individual network.

To address this, 0G uses a *shared staking* mechanism.

This entails validators staking funds on the Ethereum mainnet and then validating across the various 0G Consensus networks. Any slashable event on an 0G Chain would trigger slashing back on mainnet, meaning that mainnet funds secure all relevant chains at once.

Tokens earned as rewards on each network can then be burnt, with corresponding tokens minted on the Ethereum mainnet (where funds are staked).
