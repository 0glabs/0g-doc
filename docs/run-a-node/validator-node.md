---
sidebar_position: 4
---

# Validator Node
---

Running a Validator node for the **0G-Galileo-Testnet** means providing validator services for the network, processing transactions and maintaining consensus.

:::info **What You'll Need**
- Linux/macOS system with adequate hardware
- Stable internet connection
:::

## Hardware Requirements

| Component  | Mainnet | Testnet |
|------------|---------|----------|
| Memory     | 64 GB   | 64 GB    |
| CPU        | 8 cores | 8 cores  |
| Disk       | 1 TB NVME SSD | 4 TB NVME SSD |
| Bandwidth  | 100 MBps for Download / Upload | 100 MBps for Download / Upload |

## Restaking RPC Configuration

- **Validator Nodes**: When running your consensus client, add the following flags to enable restaking and configure the Symbiotic RPC:

```bash
--chaincfg.restaking.enabled \
--chaincfg.restaking.symbiotic-rpc-dial-url ${ETH_RPC_URL} \
--chaincfg.restaking.symbiotic-get-logs-block-range ${BLOCK_NUM}
```

- **ETH_RPC_URL**: The RPC endpoint for the Symbiotic network. On testnet, use an Ethereum HoleSky RPC endpoint.
- **BLOCK_NUM**: The maximum block number range per call when syncing restaking events. Default is 1. Adjust based on your RPC provider limits.

- **Non-Validator Nodes**: No restaking-related configuration is required; you can keep your current startup parameters unchanged.

This enables staking in Symbiotic contracts on Ethereum (testnet: HoleSky) to participate in 0G Chain consensus. Validators must be able to read the Ethereum contract state to generate and verify new blocks post-hardfork. You can run your own HoleSky node (see Ethereum docs) or use a third-party RPC provider such as QuickNode or Infura for `${ETH_RPC_URL}`.

:::tip Non-Validator Nodes
Restaking configuration is NOT required for non-validator nodes. Do not add the `--chaincfg.restaking.*` flags when running non-validator nodes.
:::

## Setup Guide

### 1. Download Package

Download the latest package for node binaries:

```bash
wget -O galileo.tar.gz https://github.com/0glabs/0gchain-NG/releases/download/v2.0.2/galileo-v2.0.2.tar.gz
```

### 2. Extract Package

Extract the package to your home directory:

```bash
tar -xzvf galileo.tar.gz -C ~
```

### 3. Copy Files and Set Permissions

Copy the configuration files and set proper permissions:

```bash
cd galileo-v2.0.2
cp -r 0g-home {your data path}
sudo chmod 777 ./bin/geth
sudo chmod 777 ./bin/0gchaind
```

### 4. Initialize Geth

Initialize the Geth client with the genesis file:

```bash
./bin/geth init --datadir /{your data path}/0g-home/geth-home ./genesis.json
```

### 5. Initialize 0gchaind

Create a temporary directory for initial configuration:

```bash
./bin/0gchaind init {node name} --home /{your data path}/tmp
```

### 6. Copy Node Files

Move the generated keys to the proper location:

```bash
cp /{your data path}/tmp/data/priv_validator_state.json /{your data path}/0g-home/0gchaind-home/data/
cp /{your data path}/tmp/config/node_key.json /{your data path}/0g-home/0gchaind-home/config/
cp /{your data path}/tmp/config/priv_validator_key.json /{your data path}/0g-home/0gchaind-home/config/
```

> Note: The temporary directory can be deleted after this step.

### 7. Start 0gchaind

Note: The command below includes restaking flags and is intended for validator nodes only. Non-validator nodes can omit the `--chaincfg.restaking.*` flags.

```bash
cd ~/galileo-v2.0.2
nohup ./bin/0gchaind start \
    --rpc.laddr tcp://0.0.0.0:26657 \
    --chaincfg.chain-spec devnet \
    --chaincfg.restaking.enabled \
    --chaincfg.restaking.symbiotic-rpc-dial-url ${ETH_RPC_URL} \
    --chaincfg.restaking.symbiotic-get-logs-block-range ${BLOCK_NUM} \
    --chaincfg.kzg.trusted-setup-path=kzg-trusted-setup.json \
    --chaincfg.engine.jwt-secret-path=jwt-secret.hex \
    --chaincfg.kzg.implementation=crate-crypto/go-kzg-4844 \
    --chaincfg.block-store-service.enabled \
    --chaincfg.node-api.enabled \
    --chaincfg.node-api.logging \
    --chaincfg.node-api.address 0.0.0.0:3500 \
    --pruning=nothing \
    --home /{your data path}/0g-home/0gchaind-home \
    --p2p.seeds 85a9b9a1b7fa0969704db2bc37f7c100855a75d9@8.218.88.60:26656 \
    --p2p.external_address {your node ip}:26656 > /{your data path}/0g-home/log/0gchaind.log 2>&1 &
```

### 8. Start Geth

```bash
cd ~/galileo-v2.0.2
nohup ./bin/geth --config geth-config.toml \
     --nat extip:{your node ip} \
     --bootnodes enode://de7b86d8ac452b1413983049c20eafa2ea0851a3219c2cc12649b971c1677bd83fe24c5331e078471e52a94d95e8cde84cb9d866574fec957124e57ac6056699@8.218.88.60:30303 \
     --datadir /{your data path}/0g-home/geth-home \
     --networkid 16601 > /{your data path}/0g-home/log/geth.log 2>&1 &
```

### 9. Verify Setup

Check the logs to confirm your node is running properly:

```bash
# Check Geth logs
tail -f /{your data path}/0g-home/log/geth.log

# Check 0gchaind logs
tail -f /{your data path}/0g-home/log/0gchaind.log
```

Check logs to confirm your node is running properly.

:::success **Success Indicators**
- 0gchaind should show "Committed state" messages
- No error messages in either log
:::

<details>
<summary>Backup & Recovery</summary>

These files are essential for validator recovery and must be backed up securely:

```bash
# Essential validator keys
/{your data path}/0g-home/0gchaind-home/config/
```
#### Recovery Process

To restore your validator from backup:

1. **Stop running services**:
   ```bash
   pkill 0gchaind
   pkill geth
   ```

2. **Restore key files**:
   ```bash
   cp ~/validator-backup/node_key.json /{your data path}/0g-home/0gchaind-home/config/
   cp ~/validator-backup/priv_validator_key.json /{your data path}/0g-home/0gchaind-home/config/
   ```

3. **Restart services** following steps 7-8 from the setup guide.

:::warning **Important Notes**
- **Never share or expose** your `priv_validator_key.json` file
- Store backups in multiple secure locations
- Test recovery process in a non-production environment first
- Default configuration users only need the two key files mentioned above
:::

</details>

<details>
<summary>Upgrade Validator</summary>

### Step 1: Extract New Release

```bash
# Download & Extract the new release package
wget -O galileo.tar.gz https://github.com/0glabs/0gchain-NG/releases/download/v2.0.2/galileo-v2.0.2.tar.gz

tar -xzvf galileo.tar.gz -C ~

# Verify extraction
ls -la galileo-v2.0.2/
```

### Step 2: Stop Services

```bash
# Stop consensus layer (0gchaind)
pkill 0gchaind

# Stop execution layer (geth)
pkill geth
```

### Step 3: Backup Your Data

```bash
# Create backup directory with timestamp
BACKUP_DIR="backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p $BACKUP_DIR

# Backup execution layer data(geth-home)
cp -r {your_geth_datadir} $BACKUP_DIR/geth-backup

# Backup consensus layer data (0gchaind-home)
cp -r {your_0gchaind_home} $BACKUP_DIR/0gchaind-backup
```

### Step 4: Start Node 

If you get error while starting node due to missing `priv_validator_state.json`, create an empty `priv_validator_state.json` file in that directory with `{}`.

Note: The command below includes restaking flags and is intended for validator nodes only. Non-validator nodes can omit the `--chaincfg.restaking.*` flags.

```bash
# Make sure you're in new release directory

# Start 0gchaind first
nohup ./bin/0gchaind start \
    --rpc.laddr tcp://0.0.0.0:26657 \
    --chaincfg.chain-spec devnet \
    --chaincfg.restaking.enabled \
    --chaincfg.restaking.symbiotic-rpc-dial-url ${ETH_RPC_URL} \
    --chaincfg.restaking.symbiotic-get-logs-block-range ${BLOCK_NUM} \
    --chaincfg.kzg.trusted-setup-path=kzg-trusted-setup.json \
    --chaincfg.engine.jwt-secret-path=jwt-secret.hex \
    --chaincfg.kzg.implementation=crate-crypto/go-kzg-4844 \
    --chaincfg.block-store-service.enabled \
    --chaincfg.node-api.enabled \
    --chaincfg.node-api.logging \
    --chaincfg.node-api.address 0.0.0.0:3500 \
    --pruning=nothing \
    --home {your_cl_home} \
    --p2p.seeds 85a9b9a1b7fa0969704db2bc37f7c100855a75d9@8.218.88.60:26656 \
    --p2p.external_address {your_node_ip}:26656 > {your_log_path}/0gchaind.log 2>&1 &

# Start geth
nohup ./bin/geth --config geth-config.toml \
     --nat extip:{your_node_ip} \
     --bootnodes enode://de7b86d8ac452b1413983049c20eafa2ea0851a3219c2cc12649b971c1677bd83fe24c5331e078471e52a94d95e8cde84cb9d866574fec957124e57ac6056699@8.218.88.60:30303 \
     --datadir {your_geth_datadir} \
     --networkid 16601 > {your_log_path}/geth.log 2>&1 &
```

### Step 5: Verify Upgrade Success

```bash
# Monitor consensus layer logs
tail -f {your_log_path}/0gchaind.log

# Monitor execution layer logs
tail -f {your_log_path}/geth.log
```

</details>

## Next Steps

### Staking Integration

Once your validator node is running, you can interact with the staking system programmatically using smart contracts:

- **[Staking Interfaces Guide](../developer-hub/building-on-0g/contracts-on-0g/staking-interfaces)** - Complete documentation for integrating with 0G Chain staking smart contracts

