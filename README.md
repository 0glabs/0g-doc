# 0G Overview

#### ZeroGravity (0G) is the first infinitely scalable and decentralized data availability layer with a built-in general-purpose storage layer.


That means that 0G can provide a massively scalable on-chain database for any type of Web2 or Web3 data, well-suited for a wide variety of needs, including on-chain AI. At the same time, 0G’s functionality as a data availability layer means that anyone can seamlessly verify that data has been accurately stored.

Below we’ll expand on this architecture, including the key use cases that this unlocks.

### 0G’s Architecture

0G’s high scalability hinges on separating the data availability workflow into:

**a) The Data Storage Lane**: Achieves horizontal scalability through well-designed data partitioning for large data transfers. For example, significant amounts of data can be stored or accessed nearly instantaneously.

**b) The Data Publishing Lane**: Guarantees data availability using a quorum-based system that assumes an “honest majority”, with the quorum randomly selected via VRF. This only takes up a tiny flow of data and therefore avoids any data broadcasting bottlenecks, allowing space for the larger Data Storage Lane transfers.

“0G Storage” is 0G’s on-chain database that consists of a network of Storage Nodes actively participating in a PoW-like mining process known as Proof of Random Access (PoRA). PoRA requires miners to correctly answer random queries relating to archived data, with the corresponding Storage Node rewarded accordingly. 0G focuses on rewarding nodes for their contributions rather than punishing them for misbehaviors to encourage network participation in network maintenance and ultimately improve scalability. 

“0G DA” is 0G’s infinitely scalable DA Layer directly built on top of 0G Storage. A quorum-based architecture is used to provide DA confirmation, using an “honest majority assumption” whereby nodes agree on data being available. A VRF is used to randomize the quorum, while GPUs accelerate the erasure coding process that’s needed to properly store data.

<img width="563" alt="Screenshot 2024-05-21 at 10 16 52 PM" src="https://github.com/0glabs/0g-doc/assets/50059816/7a190c2c-f9d1-4efb-8148-436a19500686">

### What Does 0G Solve?

The need for greater Layer 2 (L2) scalability has directly coincided with the recent rise of DA Layers, with L2s widely agreed upon as the solution to Ethereum’s scaling woes. L2s conduct transactions off-chain and settle on Ethereum for security purposes, meaning that they must post the actual transaction data somewhere so that it may be confirmed as valid. By publishing data onto Ethereum directly, its high fees are spread amongst L2 users, increasing scalability.

DALs provide a more efficient means of publishing off-chain data and keeping it available for anyone to inspect.

That being said, existing DALs are inadequate for supporting the exponentially increasing amount of data arriving on-chain. They are unable to store vast sums of data and have limited throughput, which is especially concerning for data-intense use cases like on-chain AI.

0G provides a 1,000x performance improvement over Ethereum’s danksharding and a 4x improvement over Solana’s Firedancer, providing the necessary infrastructure to scale Web3’s data needs on a massive scale.

A major focus is AI, as 0G Storage can store vast datasets while using 0G DA to quickly run AI models fully on-chain.

Beyond this, other use cases include:

**a) L1s / L2s**: These parties may use 0G’s AI models, or use 0G for data availability and storage. Partners include Polygon, Arbitrum, Fuel, Manta Network, and more.

**b) Bridges**: Given that networks can easily store their state using 0G, state migration is possible between networks which facilitates secure cross-chain transfers. For example, relevant user balances can be stored as data and communicated cross-chain for fast, accurate, transfers.

**c) Rollups-as-a-Service (RaaS)**: a DA option and data storage infrastructure for RaaS providers like Caldera and AltLayer.

**d) DeFi**: 0G’s quick and scalable DA may support highly efficient DeFi on specific L2s and L3s due to fast settlement and storage, such as high-frequency trading.

**e) On-chain Gaming**: Gaming requires vast amounts of cryptographic proof-related data that needs to be reliably stored, on top of all regular metadata such as a given player’s assets, points, actions, and more.

**f) Data Markets**: It makes the most sense that Web3 data markets truly store their data on-chain, which is currently only feasible on a large scale using 0G.

0G is the scalable, low-cost, and fully programmable DA solution that’s necessary to truly bring vast amounts of data on-chain. This would not be possible without 0G’s complementary role as an on-chain data storage solution, which unlocks even more use cases (such as providing database infrastructure for any on-chain application). 

0G can store any type of Web2 or Web3 data while efficiently proving its data availability. 
The benefit of this extends far beyond confirming Layer 2 transactions, as any type of data (large-scale datasets, a blockchain’s state, crypto

