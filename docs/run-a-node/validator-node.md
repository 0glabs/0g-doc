---
sidebar_position: 4
---

# RPC Node
---

Running a RPC node for the **0G-Galileo-Testnet** in the 0G ecosystem means actively participating in the network's security and consensus through the Proof-of-Stake (PoS) mechanism. As a validator, you'll validate transactions, propose new blocks, and earn rewards for your contribution to the network's integrity and decentralization.

## Hardware Requirements

| Component  | Mainnet | Testnet |
|------------|---------|----------|
| Memory     | 64 GB   | 64 GB    |
| CPU        | 8 cores | 8 cores  |
| Disk       | 1 TB NVME SSD | 4 TB NVME SSD |
| Bandwidth  | 100 MBps for Download / Upload | 100 MBps for Download / Upload |

## 1. Download Package

Download the latest package for node binaries (named "[galileo.tar.gz](https://github.com/0glabs/0gchain-NG/releases)")

```bash
wget -O galileo.tar.gz https://github.com/0glabs/0gchain-NG/releases/download/v1.1.1/galileo-v1.1.1.tar.gz
```

## 2. Extract Package

Unzip this file to your home path

```bash
tar -xzvf galileo.tar.gz -C ~
```

## 3. Copy Files and Set Permissions

```bash
cd galileo
cp -r 0g-home {your data path}
sudo chmod 777 ./bin/geth
sudo chmod 777 ./bin/0gchaind
```

## 4. Initialize Geth

```bash
./bin/geth init --datadir /{your data path}/0g-home/geth-home ./genesis.json
```

## 5. Initialize 0gchaind with Temporary Directory

```bash
./bin/0gchaind init {node name} --home /{your data path}/tmp
```

## 6. Copy Node Files to 0gchaind Home

```bash
cp /{your data path}/tmp/data/priv_validator_state.json /{your data path}/0g-home/0gchaind-home/data/
cp /{your data path}/tmp/config/node_key.json /{your data path}/0g-home/0gchaind-home/config/
cp /{your data path}/tmp/config/priv_validator_key.json /{your data path}/0g-home/0gchaind-home/config/
```

> Note: The temporary directory can be deleted after this step.

## 7. Start 0gchaind

```bash
cd ~/galileo
nohup ./bin/0gchaind start \
    --rpc.laddr tcp://0.0.0.0:26657 \
    --chain-spec devnet \
    --kzg.trusted-setup-path=kzg-trusted-setup.json \
    --engine.jwt-secret-path=jwt-secret.hex \
    --kzg.implementation=crate-crypto/go-kzg-4844 \
    --block-store-service.enabled \
    --node-api.enabled \
    --node-api.logging \
    --node-api.address 0.0.0.0:3500 \
    --pruning=nothing \
    --home /{your data path}/0g-home/0gchaind-home \
    --p2p.seeds 85a9b9a1b7fa0969704db2bc37f7c100855a75d9@8.218.88.60:26656 \
    --p2p.external_address {your node ip}:26656 > /{your data path}/0g-home/log/0gchaind.log 2>&1 &
```

## 8. Start Geth

```bash
cd ~/galileo
nohup ./bin/geth --config geth-config.toml \
	 --nat extip:{your node ip} \
	 --bootnodes enode://de7b86d8ac452b1413983049c20eafa2ea0851a3219c2cc12649b971c1677bd83fe24c5331e078471e52a94d95e8cde84cb9d866574fec957124e57ac6056699@8.218.88.60:30303 \
	 --datadir /{your data path}/0g-home/geth-home \
	 --networkid 16601 > /{your data path}/0g-home/log/geth.log 2>&1 &
```

## 9. Check Chain Status

```bash
tail -f /{your data path}/0g-home/log/geth.log
tail -f /{your data path}/0g-home/log/0gchaind.log
```

Check logs to confirm your node is running properly.

## Important Reminders
- Stay updated with the latest network information and announcements on our socials and blog posts
- Reach out to us on Discord or to the community for support if you encounter any issues

