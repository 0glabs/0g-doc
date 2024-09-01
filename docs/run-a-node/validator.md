---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Validator Node 

### How to Run 0G Validator node?

Begin by installing the 0gchaind software using the following commands in your terminal:

<Tabs>
  <TabItem value="binary" label="Run a pre built binary" default>

Follow these steps to set up and run your validator node on the 0g testnet.

### Install 0gchaind

Begin by installing the 0g chaind software. Run the following commands in your terminal:

```bash
git clone -b v0.2.3 https://github.com/0glabs/0g-chain.git
./0g-chain/networks/testnet/install.sh
source ~/.profile
```

### Set the Chain ID

Configure the chain ID for the testnet:

```bash
0gchaind config chain-id zgtendermint_16600-2
```

### Initialise Your Node

Initialize your node to generate the necessary validator and node configuration files:

```bash
0gchaind init <your_validator_name> --chain-id zgtendermint_16600-2
```

:::important
- Your validator name must only contain ASCII characters.
- By default, configuration and data folders are created in `~/.0gchain`. The key configuration files are `app.toml` and `config.toml`.
- You can use the `-home` flag to specify a different working directory if needed.
:::

### Genesis & Seeds

#### 1. Copy the Genesis File

Install necessary tools:

```bash
sudo apt install -y unzip wget
```

Download and replace the genesis file:

```bash
rm ~/.0gchain/config/genesis.json
wget -P ~/.0gchain/config https://github.com/0glabs/0g-chain/releases/download/v0.2.3/genesis.json
```

Verify the genesis file:

```bash
0gchaind validate-genesis
```

#### 2. Add Seed Nodes

In `~/.0gchain/config/config.toml`, locate the `[p2p]` section and add the following seed nodes to the `seeds` field:

```toml
seeds = "81987895a11f6689ada254c6b57932ab7ed909b6@54.241.167.190:26656,010fb4de28667725a4fef26cdc7f9452cc34b16d@54.176.175.48:26656,e9b4bc203197b62cc7e6a80a64742e752f4210d5@54.193.250.204:26656,68b9145889e7576b652ca68d985826abd46ad660@18.166.164.232:26656"
```

#### 3. (Optional) Add Persistent Peers

If desired, you can add persistent peers to the `persistent_peers` field in the same `config.toml` file.

### Start the Testnet Node

Start your node and let it synchronize with the network:

```bash
0gchaind start
```

:::note
The initial sync may take some time.
:::

#### Optimize Garbage Collection (For Pruning Nodes)

For improved sync speed on pruning nodes:
- Start `0gchaind` with the environment variable `GOGC=900`.
- Set `GOMEMLIMIT` to 66% of the total memory available to the `0gchaind` process.

### Create Your Validator

#### 1. Create or Import an Account

To create a new account:

```bash
0gchaind keys add <key_name> --eth
```

To get the public address (starting with `0x`):

```bash
0gchaind keys unsafe-export-eth-key <key_name>
```

Import this private key into a wallet (e.g., MetaMask) to see the public address.

#### 2. Acquire Testnet Tokens

Obtain testnet tokens via wallet transfer or the faucet. You can use our faucet at https://faucet.0g.ai/ or request tokens from our Discord.

#### 3. Create the Validator

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

#### 4. Check Validator Status

Ensure your validator is in the active set:

```bash
0gchaind q staking validators -o json --limit=1000 | jq '.validators[] | select(.status=="BOND_STATUS_BONDED")' | jq -r '.tokens + " - " + .description.moniker' | sort -gr | nl
```

:::note
Only the top 125 staked validators will be active.
:::

#### 5. Unjail Your Validator (If Needed)

If your validator is jailed, unjail it with:

```bash
0gchaind tx slashing unjail --from <key_name> --gas=500000 --gas-prices=99999neuron -y
```

## Remember

- Stay updated with the latest testnet information and announcements on our socials and blog posts.
- Reach out to us on Discord or to the community for support if you encounter any issues.

## Troubleshooting

If you encounter any issues during the setup or operation of your validator node, please consult our [FAQ section](/docs/faq) or reach out to our community support channels.

## Next Steps

After successfully setting up your validator node, consider exploring the following:

- [Staking and Delegation](/docs/staking-delegation)
- [Governance Participation](/docs/governance)
- [Node Monitoring and Maintenance](/docs/node-maintenance)

Thank you for contributing to the security and decentralization of the 0g network!

</TabItem>
  <TabItem value="source" label="Build from source">

  Instructions for building from source go here...

  </TabItem>
</Tabs>

