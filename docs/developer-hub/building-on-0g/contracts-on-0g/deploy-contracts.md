---
id: deploy-contracts
title: Deploy Contracts on 0G Chain
---

# Deploy Smart Contracts on 0G Chain

Deploy smart contracts on 0G Chain - an EVM-compatible blockchain with built-in AI capabilities.

## Why Deploy on 0G Chain?

### ⚡ Performance Benefits
- **2,500 TPS**: Higher throughput than Ethereum
- **Low Fees**: Fraction of mainnet costs
- **Fast Finality**: 1-2 second block times

### 🔧 Latest EVM Compatibility
- **Pectra & Cancun-Deneb Support**: Leverage newest Ethereum capabilities
- **Future-Ready**: Architecture designed for quick integration of upcoming EVM upgrades
- **Familiar Tools**: Use Hardhat, Foundry, Remix
- **No Learning Curve**: Deploy like any EVM chain

## Prerequisites

Before deploying contracts on 0G Chain, ensure you have:
- Node.js 16+ installed (for Hardhat/Truffle)
- Rust installed (for Foundry)
- A wallet with testnet OG tokens ([get from faucet](https://faucet.0g.ai))
- Basic Solidity knowledge

## Steps to Deploy Your Contract

### Step 1: Prepare Your Smart Contract Code
Write your contract code as you would for any Ethereum-compatible blockchain, ensuring that it meets the requirements for your specific use case.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MyToken {
    mapping(address => uint256) public balances;
    uint256 public totalSupply;
    
    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply;
        balances[msg.sender] = _initialSupply;
    }
    
    function transfer(address to, uint256 amount) public returns (bool) {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        return true;
    }
}
```

### Step 2: Compile Your Smart Contract
Use `solc` or another compatible Solidity compiler to compile your smart contract.

**Important**: When compiling, specify `--evm-version cancun` to ensure compatibility with the latest EVM upgrades supported by 0G Chain.

**Using solc directly**:
```bash
solc --evm-version cancun --bin --abi MyToken.sol
```

**Using Hardhat**:
```javascript
// hardhat.config.js
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      evmVersion: "cancun",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
```

**Using Foundry**:
```toml
# foundry.toml
[profile.default]
evm_version = "cancun"
```

This step will generate the binary and ABI (Application Binary Interface) for your contract.

### Step 3: Deploy the Contract on 0G Chain
Once compiled, you can use your preferred Ethereum-compatible deployment tools, such as `web3.js`, `ethers.js`, or `hardhat`, to deploy the contract on 0G Chain.

**Configure Network Connection**:
```javascript
// For Hardhat
networks: {
  "0g-testnet": {
    url: "https://evmrpc-testnet.0g.ai",
    chainId: 16601,
    accounts: [process.env.PRIVATE_KEY]
  }
}

// For Foundry
[rpc_endpoints]
0g_testnet = "https://evmrpc-testnet.0g.ai"
```

**Deploy Using Your Preferred Tool**:

<details>
<summary><b>Hardhat Deployment</b></summary>

```javascript
// scripts/deploy.js
async function main() {
  const MyToken = await ethers.getContractFactory("MyToken");
  const token = await MyToken.deploy(1000000); // 1M initial supply
  await token.deployed();
  
  console.log("Token deployed to:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Run: `npx hardhat run scripts/deploy.js --network 0g-testnet`
</details>

<details>
<summary><b>Foundry Deployment</b></summary>

```bash
forge create --rpc-url https://evmrpc-testnet.0g.ai \
  --private-key $PRIVATE_KEY \
  --evm-version cancun \
  src/MyToken.sol:MyToken \
  --constructor-args 1000000
```
</details>

<details>
<summary><b>Truffle Deployment</b></summary>

```javascript
// migrations/2_deploy_token.js
module.exports = function(deployer) {
  deployer.deploy(MyToken, 1000000);
};
```

Run: `truffle migrate --network 0g-testnet`
</details>

Follow the same deployment steps as you would on Ethereum, using your 0G Chain node or RPC endpoint.

> For complete working examples using different frameworks, check out the official deployment scripts repository: 🔗 **[0G Deployment Scripts](https://github.com/0glabs/0g-deployment-scripts)**

### Step 4: Verify Deployment Results on 0G Chain Scan
After deployment, you can view the transaction results and verify the contract on [0G Chain Scan](https://chainscan-galileo.0g.ai), 0G Chain's block explorer.

You can also verify the contract's code and ABI for public transparency.

## Using 0G Precompiles

0G Chain includes special precompiled contracts for advanced features:

### Available Precompiles

| Precompile | Address | Purpose |
|------------|---------|---------|
| [DASigners](./precompiles/precompiles-dasigners) | `0x...1000` | Data availability signatures |
| [WrappedOGBase](./precompiles/precompiles-wrappedogbase) | `0x...1002` | Wrapped OG token operations |


## Troubleshooting

<details>
<summary><b>Transaction failing with "invalid opcode"?</b></summary>

If you're using newer experimental opcodes from unreleased Ethereum upgrades and see "invalid opcode" errors, consider:
- Use `--evm-version cancun` in your compiler settings
- Downgrade to an earlier Solidity compiler version (e.g., from 0.8.26 to 0.8.19)
</details>

<details>
<summary><b>Can't connect to RPC?</b></summary>

Try alternative endpoints:
- QuikNode: [Get endpoint](https://www.quicknode.com/chains/0g)
- ThirdWeb: [Get endpoint](https://thirdweb.com/0g-galileo-testnet-16601)
</details>

## What's Next?

- **Learn Precompiles**: [Precompiles Overview](./precompiles/precompiles-overview)
- **Storage Integration**: [0G Storage SDK](/developer-hub/building-on-0g/storage/sdk)
- **Compute Integration**: [0G Compute Guide](/developer-hub/building-on-0g/compute-network/overview)

---

Need help? Join our [Discord](https://discord.gg/0glabs) for developer support.