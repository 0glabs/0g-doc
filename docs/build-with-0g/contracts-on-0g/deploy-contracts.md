---
id: deploy-contracts
title: Deploy Contracts on 0G Chain
---
# Deploying Contracts on 0G Chain

0G Chain is an EVM-compatible blockchain, with the current version supporting compatibility with Geth 1.10 and the Istanbul upgrade. This means you can generate and deploy contracts just as you would on any EVM chain, taking advantage of the tools and processes you’re already familiar with.

## Steps to Deploy Your Contract

1. **Prepare Your Smart Contract Code**:
   - Write your contract code as you would for any Ethereum-compatible blockchain, ensuring that it meets the requirements for your specific use case.

2. **Compile Your Smart Contract**:
   - Use `solc` or another compatible Solidity compiler to compile your smart contract. 
   - **Important**: When compiling, specify `--evm-version istanbul` to ensure compatibility with the Istanbul upgrade supported by 0G Chain.
   - Example command:
     ```bash
     solc --evm-version istanbul --bin --abi YourContract.sol
     ```
   - This step will generate the binary and ABI (Application Binary Interface) for your contract.

3. **Deploy the Contract on 0G Chain**:
   - Once compiled, you can use your preferred Ethereum-compatible deployment tools, such as `web3.js`, `ethers.js`, or `hardhat`, to deploy the contract on 0G Chain.
   - Follow the same deployment steps as you would on Ethereum, using your 0G Chain node or RPC endpoint.

4. **Verify Deployment Results on 0g chain scan**:
   - After deployment, you can view the transaction results and verify the contract on [0g chain scan](https://chainscan-newton.0g.ai/), 0G Chain's block explorer.
   - This explorer will show details about the contract deployment, such as the transaction status, contract address, and interaction history. You can also verify the contract’s code and ABI for public transparency.

By following these steps, you’ll be able to deploy and verify your contracts effectively on 0G Chain, leveraging its EVM compatibility for a seamless development experience.
