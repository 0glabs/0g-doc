# Validator Node

This document outlines the steps to deploy your own validator node.

### Hardware Requirement

```
- Memory: 64 GB
- CPU: 8 cores
- Disk: 1 TB NVME SSD
- Bandwidth: 100 MBps for Download / Upload
```

### Server Timezone Configuration

Make sure your server timezone configuration is UTC. Check your current timezone by running `timedatectl`. The `Time zone` field is `Etc/UTC (UTC, +0000)`.

> Note: Having a different timezone configuration may cause a `LastResultHash` mismatch error and take down your node!

### Software Requirement

```bash
sudo apt update && apt upgrade -y
sudo apt install golang-go jq unzip wget git -y
```

### Install 0gchaind via CLI

```bash
git clone -b v0.2.3 https://github.com/0glabs/0g-chain.git
./0g-chain/networks/testnet/install.sh
source ~/.profile
```

#### Set Chain ID

<pre class="language-bash"><code class="lang-bash"><strong>0gchaind config chain-id zgtendermint_16600-2
</strong></code></pre>

### Initialize Node

We need to initialize the node to create all the necessary validator and node configuration files:

```bash
0gchaind init <your_validator_name> --chain-id zgtendermint_16600-2
```

> Note: the validator name can only contain ASCII characters.

By default, the `init` command creates config and data folder under `~/.0gchain`(i.e `$HOME`). In the config directory, the most important files for configuration are `app.toml` and `config.toml`.

> Note: you could specify `--home` to overwrite the default work directory.

### Genesis & Seeds

#### Copy the Genesis File

Check the `genesis.json` file and copy it over to the config directory `$HOME/.0gchain/config/genesis.json`. This is a genesis file with the chain-id and genesis accounts balances.

```bash
sudo apt install -y unzip wget
rm ~/.0gchain/config/genesis.json
wget -P ~/.0gchain/config https://github.com/0glabs/0g-chain/releases/download/v0.2.3/genesis.json
```

Then verify the correctness of the genesis configuration file:

```bash
0gchaind validate-genesis
```

#### Add Seed Nodes

Your node needs to know how to find [peers](https://docs.tendermint.com/v0.34/tendermint-core/using-tendermint.html#peers). You’ll need to add healthy [seed nodes](https://docs.tendermint.com/v0.34/tendermint-core/using-tendermint.html#seed) to `$HOME/.0gchain/config/config.toml`.

The format of the `config.toml` file is as follows:

```toml
#######################################################
###           P2P Configuration Options             ###
#######################################################
[p2p]

# ...

# Comma separated list of seed nodes to connect to
seeds = "<node-id>@<ip>:<p2p port>"
```

We provide four seed nodes below.

```toml
81987895a11f6689ada254c6b57932ab7ed909b6@54.241.167.190:26656,010fb4de28667725a4fef26cdc7f9452cc34b16d@54.176.175.48:26656,e9b4bc203197b62cc7e6a80a64742e752f4210d5@54.193.250.204:26656,68b9145889e7576b652ca68d985826abd46ad660@18.166.164.232:26656
```

#### Add Persistent Peers

You can set the `persistent_peers` field in `$HOME/.0gchain/config/config.toml` to specify peers that your node will maintain persistent connections with.

## Start Testnet

Start the node and sync up to the latest block height. Note that the first time you start the sync up, it may take longer time to run.

```bash
0gchaind start
```
#### Start the node in the background

To start the node as a service. Perform the following steps.

```bash
sudo tee /etc/systemd/system/0gchaind.service > /dev/null <<EOF
[Unit]
Description=0G Node
After=network.target
[Service]
User=$USER
Type=simple
ExecStart=$(which 0gchaind) start
Restart=on-failure
LimitNOFILE=65535
[Install]
WantedBy=multi-user.target
EOF
```

Then you can start the node by the following command.

```bash
sudo systemctl daemon-reload && \
sudo systemctl enable 0gchaind && \
sudo systemctl restart 0gchaind
```

You can review the log by the following command.

```bash
sudo journalctl -u 0gchaind -f -o cat
```

#### Garbage Collection Optimization

To maximize sync speed for validators and other network providers that are running pruning nodes, the following settings are recommended:

* Start 0gchaind process with environment variable and value `GOGC=900`; this instructs the golang garbage collector to wait until the heap has grown to 9x it's initial allocated size before running garbage collection
* Start 0gchaind process with environment variable `GOMEMLIMIT` set to 66% of the total memory available to the 0gchaind process (e.g. `GOMEMLIMIT=40GB` for a node with 64 GB of memory) to ensure garbage collection runs whenever 66% of the total memory is used

> Make sure you've synced your node to the latest block height before running the following steps.

### Create Validator

You could either create a new account or import from an existing key. To create a new account:

```bash
0gchaind keys add <key_name> --eth
```

Here if you want to get the public address which starts with `0x`, you could first run the following command to get your key’s private key.

```bash
0gchaind keys unsafe-export-eth-key <key_name>
```

Then import the returned private key to a wallet (Metamask for example) to get the public address.

As a next step, you must acquire some testnet tokens either by wallet transfer or requesting on the [faucet](https://faucet.0g.ai/) before submitting your validator account address.

```bash
0gchaind tx staking create-validator \
  --amount=<staking_amount>ua0gi \
  --pubkey=$(0gchaind tendermint show-validator) \
  --moniker="<your_validator_name>" \
  --chain-id=zgtendermint_16600-2 \
  --commission-rate="0.10" \
  --commission-max-rate="0.20" \
  --commission-max-change-rate="0.01" \
  --min-self-delegation="1" \
  --from=<key_name> \
  --gas=auto \
  --gas-adjustment=1.4
```

Check that it is in the validator set:

```bash
0gchaind q staking validators -o json --limit=1000 | jq '.validators[] | select(.status=="BOND_STATUS_BONDED")' | jq -r '.tokens + " - " + .description.moniker' | sort -gr | nl
```

> Only top 125 staked validators will be selected as active validators.

By any chance your validator is put in jail, use this command to unjail it

```bash
0gchaind tx slashing unjail --from <key_name> --gas=500000 --gas-prices=99999neuron -y
```

### Upgrade Your Node

These instructions are for full nodes that have ran on previous versions of and would like to upgrade to the latest testnet version.

#### Reset Data

> Note: if the version you are upgrading to is not breaking from the previous one, you **should not** reset the data. If this is the case you can skip to Restart step.

First, remove the outdated files and reset the data.

```bash
rm $HOME/.0gchain/config/addrbook.json $HOME/.0gchain/config/genesis.json
0gchaind tendermint unsafe-reset-all --home $HOME/.0gchain
```

Your node is now in a pristine state while keeping the original `priv_validator.json` and `config.toml`. If you had any sentry nodes or full nodes setup before, your node will still try to connect to them, but may fail if they haven’t also been upgraded.

#### Restart

```bash
0gchaind start
```

### Migrate Your Node

#### Important files

If you are migrating your node to a different server, first you need to recover your wallet account on your new server。 If you have stored your wallet mnemonic, you can restore your account by executing

```bash
0gchaind keys add <your_account_name> --eth --recover
```

and paste your mnemonic to recover the account.

However, if by any chance you did not store your mnemonic, you need to make sure to store and move the following files to the new server at the same place under your `$HOME`.

* `$HOME/xx.address`
* `$HOME/xx.info`
* `$HOME/keyhash`

Another important file to store is `$HOME/config/priv_validator_key.json`. This file is generated at the init step and is the key file for your onchian signing.

#### Step

Follow the same setup process above to start syncing your node to the latest block height

> Important: Delete `$HOME/config/addrbook.json` if you are using the same machine

> Important: Make sure the genesis.json is updated

> Important: Make sure the seeds are updated

> Warning: Do not migrate the files before you finish syncing the blocks. This is to avoid double signing.

> Warning: Do not stop your old server before you finish syncing the blocks. This is to avoid getting jailed for long downtime.

Once you finished syncing the blocks.

1. Stop your new server.
2. Copy and past the files mentioned in [#important-files](validator-node.md#important-files "mention") to the `$HOME` on your new server.
3. Stop your old server.
4. Restart your new server.
