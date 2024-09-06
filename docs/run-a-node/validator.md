---
sidebar_position: 4
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Validator Node

Running a validator node in the 0G ecosystem means actively participating in the network's security and consensus through the Proof-of-Stake (PoS) mechanism. As a validator, you'll validate transactions, propose new blocks, and earn rewards for your contribution to the network's integrity and decentralisation.

<Tabs>
  <TabItem value="binary" label="Run a pre built binary" default>
## Installation

**Install 0gchaind:**

Downloads and install `0gchaind` software, enabling your computer to function as a node in the 0G network.

   ```bash
   git clone -b v0.2.3 https://github.com/0glabs/0g-chain.git
   ./0g-chain/networks/testnet/install.sh
   source ~/.profile
   ```

**2. Set the Chain ID:**

Configures your node to connect to the specific 0G testnet, ensuring you're on the correct network.
   ```bash
   0gchaind config chain-id zgtendermint_16600-2
   ```
**3. Initialise Your Node:**

Initialise your node by creating necessary configuration files and a validator key pair, establishing your node's identity within the 0G network.

   ```bash
   0gchaind init <your_validator_name> --chain-id zgtendermint_16600-2
   ```
**4. Set Up Genesis & Seeds:**

    Download and verify the correct genesis file, ensuring your node starts with the same initial state as the rest of the network.

   ***a. Copy the Genesis File:***

   ```bash
   sudo apt install -y unzip wget
   rm ~/.0gchain/config/genesis.json
   wget -P ~/.0gchain/config https://github.com/0glabs/0g-chain/releases/download/v0.2.3/genesis.json
   0gchaind validate-genesis
   ```
   ***b. Add Seed Nodes:***

   Edit `~/.0gchain/config/config.toml` and update the `seeds` line with the provided seed node addresses. This helps your node discover and connect to other peers in the network.

   ***c. (Optional) Add Persistent Peers:***
   If desired, add specific node addresses to the `persistent_peers` line in the same file for reliable connectivity to those nodes.

## Starting Your Node

**5. Start the Testnet Node:**

 Start your node and it should begin the synchronisation process with the 0G testnet, downloading and verifying the blockchain's history.

   ```bash
   0gchaind start
   ```
**6. Optimize Garbage Collection (For Pruning Nodes):**

If running a pruning node, set these environment variables before starting your node:
You can adjust the Go garbage collector and limit memory usage, potentially improving synchronization speed and overall performance.

   ```bash
   export GOGC=900
   export GOMEMLIMIT=24000MiB
   ```
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

## Creating Your Validator

**7. Create or Import an Account:**

  create a digital wallet within your node to hold your tokens and display the associated private key for importing into wallets like MetaMask.

   ```bash
   0gchaind keys add <key_name> --eth
   0gchaind keys unsafe-export-eth-key <key_name>
   ```
**8. Acquire Testnet Tokens:**

   Obtain testnet tokens from the 0G faucet from our website or by requesting them on their Discord. These tokens are necessary for staking and becoming a validator.

**9. Become a Validator:**

register your node as a validator on the 0G network, specifying your stake amount, commission rates, and other important parameters.

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
**10. Check Validator Status:**

Displays the status of your validator, helping you confirm that your validator is active and participating in consensus.

    ```bash
    0gchaind q staking validators -o json --limit=1000 | jq '.validators[] | select(.status=="BOND_STATUS_BONDED")' | jq -r '.tokens + " - " + .description.moniker' | sort -gr | nl
    ```
**11. Unjail Your Validator (If Needed):**

If your validator gets "jailed" due to downtime or other issues, you can  unjail it and resume participation in the network.

    ```bash
    0gchaind tx slashing unjail --from <key_name> --gas=500000 --gas-prices=99999neuron -y
    ```

***Note: Only the top 125 staked validators will be active.***

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

