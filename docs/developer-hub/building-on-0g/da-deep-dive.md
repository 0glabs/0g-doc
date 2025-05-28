---
id: da-deep-dive
title: Technical Deep Dive
sidebar_position: 2
---
# 0G DA Technical Deep Dive

## Prerequisites & Audience

**Who should read this:**
- Developers integrating 0G DA into their applications
- Node operators running DA infrastructure
- Researchers interested in DA design patterns

**Required knowledge:**
- Basic understanding of data availability concepts
- Familiarity with erasure coding principles
- Knowledge of blockchain consensus mechanisms

## Overview

The 0G Data Availability module enables decentralized data storage and verification through a network of staked nodes. This document covers the technical implementation details, from data submission to node rewards.

### Key Components

| Component | Purpose | Key Features |
|-----------|---------|-------------|
| **DA Blob** | User-submitted data | Up to 32,505,852 bytes |
| **DA Nodes** | Verify and store data slices | Stake-based eligibility |
| **DA Sampling** | Incentivize long-term storage | Lottery-based rewards |
| **Quorums** | Node organization | 3072 nodes per quorum |

:::tip
**TODO**: Add architecture diagram showing the flow from user submission to data finalization, including:
- Client submitting DA blob
- Erasure encoding process
- Distribution to DA nodes across quorums
- Signature aggregation
- On-chain finalization
:::

## DA Processing Flow

:::tip
**TODO**: Add visual flow diagram showing the 6-step data processing pipeline from input to on-chain finalization
:::

### Step-by-Step Process

DA processes user data through a sophisticated pipeline ensuring redundancy and verifiability:

#### 1. Data Preparation
```
Input: Raw data (up to 32,505,852 bytes)
Output: Padded data with size encoding
```
- Pad data with zeros to reach exactly 32,505,852 bytes
- Append 4-byte little-endian integer indicating original size

#### 2. Matrix Formation
```
Input: Padded data
Output: 1024 × 1024 matrix
```
- Slice data into 1024 rows × 1024 columns
- Each element: 31 bytes + 1 zero byte = 32 bytes total
- Fill matrix row by row consecutively

#### 3. Redundant Encoding
```
Input: 1024 × 1024 matrix
Output: 3072 × 1024 encoded matrix
```
- Apply erasure coding to expand matrix 3x
- Generate **erasure commitment** (KZG commitment)
- Calculate **data root** (Merkle root)

#### 4. On-Chain Submission
```javascript
// Example submission
const tx = await daContract.submitBlob({
  erasureCommitment: commitment,
  dataRoot: root,
  fee: BLOB_PRICE
});
// Returns: epoch number and quorum assignment
```

#### 5. Distribution to Nodes
Each DA node receives:
- Their assigned row from the matrix
- Erasure commitment and data root
- Merkle proofs for verification
- KZG proofs for polynomial verification

#### 6. Signature Aggregation
- Nodes verify their slice and sign attestation
- Once 2/3+ signatures collected: aggregate using BLS
- Submit aggregated signature to DA contract
- Data is now considered **finalized**

### Erasure Encoding Details

<details>
<summary><b>Mathematical Foundation</b></summary>

#### Field Setup
- **Finite field**: $\mathbb{F}$ = scalar field of BN254 curve
- **Field order**: $p = 2^{28} \times A + 1$ (where $A$ is odd)
- **Generator**: 3 generates the multiplicative group
- **Roots of unity**: 
  - $u = 3^{2^6 \times A}$
  - $w = 3^{2^8 \times A}$
  - Properties: $w^{2^{20}} = 1$ and $u^4 = w$

#### Polynomial Construction
Each matrix element $c_{i,j}$ (32 bytes) is treated as an element in $\mathbb{F}$.

Define polynomial $f: \mathbb{F} \rightarrow \mathbb{F}$ of degree $d = 2^{20} - 1$:

$$\forall\, 0 \le i < 1024,\, 0 \le j < 1024: f(w^{1024j+i}) = c_{i,j}$$

#### Matrix Extension
Expand from 1024×1024 to 3072×1024 using polynomial evaluation:

**Rows 1024-2047:**
$$c_{i,j} = f(u^2 \cdot w^{1024j+(i-1024)})$$

**Rows 2048-3071:**
$$c_{i,j} = f(u \cdot w^{1024j+(i-2048)})$$

</details>



### Commitments and Verification

#### Erasure Commitment
- **Type**: KZG commitment
- **Formula**: $f(\tau) \cdot G$
  - $G$: BN254 G1 curve generator point
  - $\tau$: Secret from [powers of tau ceremony](https://github.com/privacy-scaling-explorations/perpetualpowersoftau)
- **Purpose**: Cryptographic commitment to the polynomial

#### Data Root
- **Type**: Merkle root
- **Construction**: Treat 3072×1024 matrix as continuous data
- **Sectors**: Split into 16384-element and 8192-element arrays
- **Purpose**: Efficient data availability proofs

#### Node Verification Process

:::tip
**TODO**: Add diagram showing dual verification process with Merkle and KZG proofs
:::

DA nodes perform two verification steps:

1. **Merkle Verification**
   - Verify slice consistency with data root
   - Use standard Merkle proof verification
   - Ensures data integrity

2. **KZG Verification**
   - Verify slice consistency with erasure commitment
   - Uses AMT optimization from [LVMT paper](https://www.usenix.org/system/files/osdi23-li-chenxing.pdf)
   - Reduces computational overhead significantly

## DA Sampling

DA Sampling incentivizes long-term data storage through a lottery mechanism triggered every `SAMPLE_PERIOD` blocks.

### How It Works

:::tip
**TODO**: Add visual timeline showing sampling periods, lottery selection, and reward distribution
:::

1. **Trigger**: Every 30 blocks (~1.5 minutes)
2. **Seed**: Parent block hash provides randomness
3. **Selection**: Sub-lines eligible based on quality score
4. **Reward**: Nodes storing selected data claim rewards

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

### Response Generation

#### Sub-line Division
- Each DA slice (row) divides into **32 sub-lines**
- Each sub-line evaluated independently for rewards
- Quality score determines eligibility

#### Quality Calculation

```python
# Step 1: Calculate line quality
lineQuality = keccak256(
    sampleSeed,      # Block hash randomness
    epoch,           # DA epoch number
    quorumId,        # Quorum assignment
    dataRoot,        # Merkle root
    lineIndex        # Row number (64-bit big-endian)
)

# Step 2: Calculate data quality
dataQuality = keccak256(
    lineQuality,     # From step 1
    sublineIndex,    # 0-31
    data             # Actual sub-line data
)

# Step 3: Combined quality score
podasQuality = lineQuality + dataQuality
```

:::note Encoding Format
- Default: 256-bit big-endian integers
- Exception: `lineIndex` uses 64-bit big-endian
:::

#### Validity Criteria

A sub-line is a **valid DAS response** if:
1. `podasQuality < podasTarget` (current difficulty)
2. `epoch` within `[currentEpoch - EPOCH_WINDOW_SIZE, currentEpoch)`
3. Node has stored the data and can provide proof

During a sample period, at most `TARGET_SUBMITS × 2` DAS responses can be submitted and rewarded; any submissions exceeding this limit will be rejected.

### Difficulty Adjustment

The system automatically adjusts difficulty to maintain consistent submission rates:

```python
# Target: 20 submissions per period
# Adjustment formula:
adjustment = (actualSubmits - TARGET_SUBMITS) / TARGET_SUBMITS / 8
podasTarget = podasTarget * (1 - adjustment)

# Example:
# If 30 submissions (too many): difficulty increases
# If 10 submissions (too few): difficulty decreases
```

**Key Points:**
- Targets `TARGET_SUBMITS` (20) responses per period
- Gradual adjustment (1/8 factor) prevents volatility
- Self-balancing mechanism ensures consistent rewards

## Economic Model

### System Parameters

| Parameter | Purpose | Default | Notes |
|-----------|---------|---------|-------|
| **BASE_REWARD** | Foundation subsidy per valid response | 0 | Manually funded |
| **BLOB_PRICE** | Fee users pay to submit data | 0 | Market-based pricing |
| **SERVICE_FEE_RATE_BP** | Protocol fee (basis points) | 0 | % of user fees |
| **REWARD_RATIO** | Controls reward distribution rate | 1,200,000 | See formula[¹] |

[¹] Formula ensures sustainable rewards: `TARGET_SUBMITS × EPOCH_TIME / SAMPLE_TIME / REWARD_RATIO ≈ 0.5-2`

<details>
<summary><b>Contract References</b></summary>

- [BASE_REWARD](https://github.com/0glabs/0g-da-contract/blob/main/contracts/DAEntrance.sol#L318)
- [BLOB_PRICE](https://github.com/0glabs/0g-da-contract/blob/main/contracts/DAEntrance.sol#L331)
- [SERVICE_FEE_RATE_BP](https://github.com/0glabs/0g-da-contract/blob/main/contracts/DAEntrance.sol#L336)
- [REWARD_RATIO](https://github.com/0glabs/0g-da-contract/blob/main/contracts/DAEntrance.sol#L312)

</details>

### Fee Structure

#### User Fees
- **Amount**: `BLOB_PRICE` per submission
- **Purpose**: Funds node rewards and protocol operations
- **Payment**: Required at submission time

#### Reward Distribution

:::tip
**TODO**: Add diagram showing fee flow from users → reward pool → nodes
:::

1. **Epoch-based pooling**: Fees accumulate during each ~8 hour epoch
2. **Distribution rate**: `1 / REWARD_RATIO` of pool per valid response
3. **Fair allocation**: Prevents early submitters from draining pool

#### Additional Incentives

**Foundation Rewards** (Early Stage)
- Fixed `BASE_REWARD` per valid response
- Funded separately by foundation
- Fallback to partial rewards if fund depleted

**Protocol Fee**
- Rate: `SERVICE_FEE_RATE_BP` basis points
- Taken from user fees
- Funds protocol development and operations

## Next Steps

### For Node Operators
🖥️ **[Run a DA Node](/run-a-node/da-node)** - Become a DA signer and earn rewards

### For Developers
🔧 **[Integration Guide](./da-integration)** - Connect your application to 0G DA

### For Researchers
📚 **[Whitepaper](/whitepaper.pdf)** - Detailed protocol specifications

## Glossary

<details>
<summary><b>Key Terms Reference</b></summary>

- **DA Blob**: User-submitted data package (max 32.5 MB)
- **DA Node**: Staked validator storing and verifying data slices
- **Quorum**: Group of 3072 nodes processing data together
- **Erasure Coding**: Redundancy technique allowing data recovery
- **KZG Commitment**: Cryptographic commitment to polynomial
- **DA Sampling**: Lottery mechanism for storage incentives
- **PoRA**: Proof of Random Access for storage verification

</details>
