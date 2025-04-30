---
sidebar_position: 4
---

# Validator Node
---

Running a validator node for the **0G-Galileo-Testnet** in the 0G ecosystem means actively participating in the network's security and consensus through the Proof-of-Stake (PoS) mechanism. As a validator, you'll validate transactions, propose new blocks, and earn rewards for your contribution to the network's integrity and decentralization.

## Hardware Requirements

| Component  | Mainnet | Testnet |
|------------|---------|----------|
| Memory     | 64 GB   | 64 GB    |
| CPU        | 8 cores | 8 cores  |
| Disk       | 1 TB NVME SSD | 4 TB NVME SSD |
| Bandwidth  | 100 MBps for Download / Upload | 100 MBps for Download / Upload |

## Installation and Setup

### 1. Download Package

Download the package from [official release page](https://github.com/0glabs/0gchain-ng/releases/tag/v1.0.1)

```bash
wget https://github.com/0glabs/0gchain-ng/releases/download/v1.0.1/galileo-v1.0.1.tar.gz
```

### 2. Extract Package

Unzip this file to your home path

```bash
tar -xzvf galileo.tar.gz -C ~
```

### 3. Copy Files and Set Permissions

```bash
cd ~/galileo
cp -r 0g-home {your data path}
sudo chmod 777 ./bin/geth
sudo chmod 777 ./bin/0gchaind
```

### 4. Initialize Geth

```bash
./bin/geth init --datadir /{your data path}/0g-home/geth-home ./genesis.json
```

### 5. Initialize 0gchaind with Temporary Directory

```bash
./bin/0gchaind init {node name} --home /{your data path}/tmp
```

### 6. Copy Node Files to 0gchaind Home

```bash
cp /{your data path}/tmp/data/priv_validator_state.json /{your data path}/0g-home/0gchaind-home/data/
cp /{your data path}/tmp/config/node_key.json /{your data path}/0g-home/0gchaind-home/config/
cp /{your data path}/tmp/config/priv_validator_key.json /{your data path}/0g-home/0gchaind-home/config/
```

> Note: The temporary directory can be deleted after this step.

## Starting Your Node

### Start 0gchaind with Tmux

Type `tmux` to start a new session, then:

```bash
cd ~/galileo
CHAIN_SPEC=devnet ./bin/0gchaind start \
    --rpc.laddr tcp://0.0.0.0:26657 \
    --beacon-kit.kzg.trusted-setup-path=kzg-trusted-setup.json \
    --beacon-kit.engine.jwt-secret-path=jwt-secret.hex \
    --beacon-kit.kzg.implementation=crate-crypto/go-kzg-4844 \
    --beacon-kit.block-store-service.enabled \
    --beacon-kit.node-api.enabled \
    --beacon-kit.node-api.logging \
    --beacon-kit.node-api.address 0.0.0.0:3500 \
    --pruning=nothing \
    --home /{your data path}/0g-home/0gchaind-home \
    --p2p.seeds b30fb241f3c5aee0839c0ea55bd7ca18e5c855c1@8.218.94.246:26656 \
    --p2p.external_address {your node ip}:26656
```

Detach this tmux session by pressing `Ctrl+B`, then `D`.

### Start Geth with Tmux

Type `tmux` to start a new session, then:

```bash
cd ~/galileo
./bin/geth --config geth-config.toml --datadir /{your data path}/0g-home/geth-home --networkid 80087
```

Detach this tmux session by pressing `Ctrl+B`, then `D`.

## Monitoring Your Node

### Check Chain Status

Type `tmux ls` to list sessions, then attach to the 0gchaind session:

```bash
tmux attach -t {session_number}
```

Check logs to confirm your node is running properly.

## Important Reminders
- Stay updated with the latest network information and announcements on our socials and blog posts
- Reach out to us on Discord or to the community for support if you encounter any issues

