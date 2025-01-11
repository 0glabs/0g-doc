---
id: 0g-da-deep-dive
title: Technical Deep Dive
sidebar_position: 2
---
# 0G DA Technical Deep Dive

The Data Availability (DA) module allows users to submit a piece of data, referred to as a _**DA blob**_. This data is redundantly encoded by the client's proxy and divided into several slices, which are then sent to DA nodes. _**DA nodes**_ gain eligibility to verify the correctness of DA slices by staking. Each DA node verifies the integrity and correctness of its slice and signs it. Once more than 2/3 of the aggregated signatures are on-chain, the data behind the related hash is considered to be published decentrally.

To incentivize DA nodes to store the signed data for a period, the signing process itself does not provide any rewards. Instead, rewards are distributed through a process called _**DA Sampling**_. During each DA Sample round, any DA slice within a certain timeframe can generate a lottery chance for a reward. DA nodes must store the corresponding slice to redeem the lottery chance and claim the reward.

The process of generating DA nodes is the same as the underlying chain's PoS process, both achieved through staking. During each DA epoch (approximately 8 hours), DA nodes are assigned to several quorums. Within each quorum, nodes are assigned numbers 0 through 3071. Each number is assigned to exactly one node, but a node may be assigned to multiple quorums, depending on its staking weight.

## DA Processing Flow

DA takes an input of data up to 32,505,852 bytes in length and processes it as follows:

1. **Padding and Size Encoding:**
   * Pad the data with zeros until it reaches 32,505,852 bytes.
   * Add a little-endian format 4-byte integer at the end to indicate the original input size.
2. **Matrix Formation:**
   * Slice the padded data into a 1024-row by 1024-column matrix, filling each row consecutively, with each element being 31 bytes.
   * Pad each 31-byte element with an additional 1-byte zero, making it 32 bytes per element.
3. **Redundant Encoding:**
   * Expand the data to a 3072-row by 1024-column matrix using redundancy coding.
   * Calculate the _**erasure commitment**_ and _**data root**_ of the expanded matrix.
4. **Submission to DA Contract:**
   * Submit the erasure commitment and data root to _**the DA contract**_ and pay the fee.
   * The DA contract will determine the epoch to which the data belongs and assign a quorum.
5. **Data Distribution:**
   * Send the erasure commitment, data root, each row of the matrix, and necessary proofs of correctness to the corresponding DA nodes.
6. **Signature Aggregation:**
   * More than 2/3 of the DA nodes sign the erasure commitment and data root.
   * Aggregate the signatures using the BLS signature algorithm and submit the aggregated signature to the DA contract.

### Details of erasure encoding

After matrix formation, each element is processed into a 32-byte data unit, which can be viewed interchangeably as either 32 bytes of data or a 256-bit little-endian integer. Denote the element in the $i$-th row and $j$-th column as $c_{i,j}$.

Let the finite field $\mathbb{F}$ be the scalar field of the [BN254 curve](https://docs.rs/ark-bn254/latest/ark\_bn254/). Each element $c_{i,j}$ is also considered an integer within the finite field $\mathbb{F}$. Let $p$ be the order of $\mathbb{F}$, a known large number that can be expressed as $2^{28} \times A + 1$, where $A$ is an odd number. The number 3 is a generator of the multiplicative group of the $\mathbb{F}$. Define $u = 3^{2^6 \times A}$ and $w=3^{2^8\times A}$, so $w^{2^{20}} = 1$ and $u^4=w$.

Now we define a polynomial $f$ over $\mathbb{F}\rightarrow\mathbb{F}$ with degree $d=2^{20}-1$ satisfying

$$\forall\, 0\le i< 1024,\, 0\le j< 1024,\,f\left(w^{1024j+i}\right)=c_{i,j}$$

Then we extend the $1024\times1024$ matrix into $1024\times 3072$ matrix, where

$$\forall\, 1024\le i< 2048,\, 0\le j< 1024,\,c_{i,j}=f\left(u^2\cdot w^{1024j+(i-1024)}\right)$$

$$\forall\, 2048\le i< 3072,\, 0\le j< 1024,\,c_{i,j}=f\left(u\cdot w^{1024j+(i-2048)}\right)$$



The **erasure commitment** is the KZG commitment of $f$, defined as $f(\tau)\cdot G$, where $G$ is the starting point of BN254 G1 curve, and $\tau$ is a latent parameter from the [perpetual powers of tau trusted setup ceremony](https://github.com/privacy-scaling-explorations/perpetualpowersoftau).

The **data root** is defined as the input root by treating the 1024\*3072 32-byte elements as a continuous storage submission input. Specifically, according to the storage submission requirements, these data does not need to pad any zeros, and will be divided into a 16384-element sector array and an 8192-element sector array.

DA nodes need to verify two parts:

1. The consistency between the received slice and the data root, mainly achieved through Merkle proofs.
2. The consistency between the received slice and the erasure commitment, verified using KZG proofs. Here, we use the AMT protocol optimization introduced in [LVMT](https://www.usenix.org/system/files/osdi23-li-chenxing.pdf) to reduce the proving overhead.

## DA Sampling

The blockchain will periodically release DA Sampling tasks at preset height every `SAMPLE_PERIOD` blocks, with the parent block hash of these heights used as the `sampleSeed` for DA Sampling.

### List of Parameters

Constant parameters

| Parameter          | Requirement | Default value   |
| ------------------ | ----------- | --------------- |
| MAX\_PODAS\_TARGET |             | 2^256 / 128 - 1 |

Admin adjustable parameters

| Parameter           | Requirement | Default value          | Code                                                                                                                                                                                                                                         |
| ------------------- | ----------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TARGET\_SUBMITS     |             | 20                     | [https://github.com/0glabs/0g-da-contract/blob/3951565fb6ad3096634da6493e9e863bb2846611/contracts/DAEntrance.sol#L296](https://github.com/0glabs/0g-da-contract/blob/3951565fb6ad3096634da6493e9e863bb2846611/contracts/DAEntrance.sol#L296) |
| EPOCH\_WINDOW\_SIZE |             | 300 (about 3 months)   | [https://github.com/0glabs/0g-da-contract/blob/3951565fb6ad3096634da6493e9e863bb2846611/contracts/DAEntrance.sol#L306](https://github.com/0glabs/0g-da-contract/blob/3951565fb6ad3096634da6493e9e863bb2846611/contracts/DAEntrance.sol#L306) |
| SAMPLE\_PERIOD      |             | 30 (about 1.5 minutes) | [https://github.com/0glabs/0g-da-contract/blob/3951565fb6ad3096634da6493e9e863bb2846611/contracts/DAEntrance.sol#L323](https://github.com/0glabs/0g-da-contract/blob/3951565fb6ad3096634da6493e9e863bb2846611/contracts/DAEntrance.sol#L323) |

### Responses

During each period, each DA slice (one row) can be divided into 32 sub-lines. For each sub-line, the `podasQuality` will be computed using the `dataRoot` and assigned `epoch` and `quorumId` of its corresponding DA blob.


> 💡 By default, all integers are in 256-bit big-endian format when computing hash values. `lineIndex` is the only exception, which is in 64-bit big-endian format.

The hash value can be viewed interchangeably as either 32 bytes of data or a 256-bit big-endian integer.

```python
lineQuality = keccak256(sampleSeed, epoch, quorumId, dataRoot, lineIndex);
dataQuality = keccak256(lineQuality, sublineIndex, data);
podasQuality = lineQuality + dataQuality
```

If the `podasQuality` is less than the current `podasTarget` in the DA contract and the `epoch` falls within `[currentEpoch - EPOCH_WINDOW_SIZE, currentEpoch)`, then this sub-line is regarded as a _**valid DAS response**_ and is eligible for the reward. The DA node assigned to this row can claim the reward.

During a sample period, at most `TARGET_SUBMITS × 2` DAS responses can be submitted and rewarded; any submissions exceeding this limit will be rejected.

### Difficulty Adjustment

`TARGET_SUBMITS` valid responses are expected in a sample period. If more or fewer responses are submitted during a sample period, the `podasTarget` will be adjusted as follows:

```python
podasTarget -= podasTarget * (actualSubmits - TARGET_SUBMITS) / TARGET_SUBMITS / 8
```

## Economic Model

### List of Parameters

Admin adjustable parameters

| Parameter              | Requirement | Default value | Code                                                                                                                                                                                                                                         |
| ---------------------- | ----------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BASE\_REWARD           |             | 0             | [https://github.com/0glabs/0g-da-contract/blob/3951565fb6ad3096634da6493e9e863bb2846611/contracts/DAEntrance.sol#L318](https://github.com/0glabs/0g-da-contract/blob/3951565fb6ad3096634da6493e9e863bb2846611/contracts/DAEntrance.sol#L318) |
| BLOB\_PRICE            |             | 0             | [https://github.com/0glabs/0g-da-contract/blob/3951565fb6ad3096634da6493e9e863bb2846611/contracts/DAEntrance.sol#L331](https://github.com/0glabs/0g-da-contract/blob/3951565fb6ad3096634da6493e9e863bb2846611/contracts/DAEntrance.sol#L331) |
| SERVICE\_FEE\_RATE\_BP |             | 0             | [https://github.com/0glabs/0g-da-contract/blob/3951565fb6ad3096634da6493e9e863bb2846611/contracts/DAEntrance.sol#L336](https://github.com/0glabs/0g-da-contract/blob/3951565fb6ad3096634da6493e9e863bb2846611/contracts/DAEntrance.sol#L336) |
| REWARD\_RATIO          | \[1]        | 1,200,000     | [https://github.com/0glabs/0g-da-contract/blob/3951565fb6ad3096634da6493e9e863bb2846611/contracts/DAEntrance.sol#L312](https://github.com/0glabs/0g-da-contract/blob/3951565fb6ad3096634da6493e9e863bb2846611/contracts/DAEntrance.sol#L312) |

\[1] `TARGET_SUBMITS` × Time elapsed for `EPOCH_WINDOW_SIZE` epochs / Time elapsed in `SAMPLE_PERIOD` / `REWARD_RATIO` should be approximately 0.5 to 2.

### Pricing

When users submit the metadata for a DA blob, they need to pay a fee in amount of `BLOB_PRICE`.

### Reward

When a DA epoch ends, all the rewards from that DA epoch will be stored in the DA reward pool. Each time a valid response is submitted, `1 / REWARD_RATIO` of the reward pool will be distributed to the corresponding DA node.

### System Rewards

In the early stages of the ecosystem, the foundation can reserve a portion of tokens for system rewards. When the DA node submits a valid response, an additional reward of `BASE_REWARD` will be issued.

The funds for the base reward will be manually deposited into the reward contract and tracked separately. If the balance for the base reward is insufficient to cover a single base reward, miners will not be able to receive the full base reward.

### Service Fee

A system service fee is charged as a proportion of the DA fees paid by the user, according to the parameter `SERVICE_FEE_RATE_BP`.

## Run a node

See [here](../run-a-node/da-node.md) for instructions to become DA signer and run your own node.
