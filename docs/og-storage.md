---
id: og-storage
title: 0G Storage
sidebar_position: 3
---

# 0G Storage: Distributed Storage for Heavy Data Volumes
---

0G Storage is 0G's on-chain data storage system that powers 0G DA.

For any party wishing to store data with 0G, the data must first be provided alongside payment using 0G's token which is fully embedded into 0G's main chain. To store this data, it is first erasure-coded which means that the data being stored is fragmented into redundant smaller pieces distributed across multiple storage locations.

## System Architecture

0G's system itself has two parts:

1. **The Data Publishing Lane:** For data availability guarantees, whereby data in 0G Storage can be quickly queried and verified by 0G's consensus network ("0G Consensus").
2. **The Data Storage Lane:** For large data transfers to 0G Storage.

## Layered Design

0G Storage also uses a layered design with two components:

1. **The Log Layer:** The bottom layer which records general data entries (like a computer file system). Used for unstructured data and is append-only.
2. **The Key-Value (KV) Layer:** For structured data, and can be updated via new entries that are added to log entries.

All data entries are confirmed via 0G's consensus network, 0G Consensus.

## Proof of Random Access

0G Storage is managed by Miners. To incentivize Miners to store data, a consensus design known as Proof of Random Access (PoRA) is used.

PoRA has Miners answer random queries relating to archived data chunks to prove that they have successfully stored that data. It also acts as a variant of PoW, as to be eligible to answer a random query, a Miner must first be chosen by finding a satisfactory output (i.e. an output with enough leading zeros).

To ensure fairness for those with fewer machines, the mining range is limited to 8 TB of data. This means that those with many machines can simultaneously mine for various data ranges (with each range being 8 TB), while single machines can compete on a single 8 TB data range.
