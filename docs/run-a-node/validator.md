---
sidebar_position: 4
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Validator Node

Running a validator node in the 0G ecosystem means actively participating in the network's security and consensus through the Proof-of-Stake (PoS) mechanism. As a validator, you'll validate transactions, propose new blocks, and earn rewards for your contribution to the network's integrity and decentralisation.

<Tabs>
  <TabItem value="binary" label="Build from source" default>
## Installation

**1. Install 0gchaind:** Clone and install `0gchaind`, by executing the following command.

   ```bash
   git clone -b v0.2.3 https://github.com/0glabs/0g-chain.git
   ./0g-chain/networks/testnet/install.sh
   source ~/.profile
   ```

**2. Set the Chain ID:** Configures your node to connect to the specific 0G testnet, ensuring you're on the correct network.

   ```bash
   0gchaind config chain-id zgtendermint_16600-2
   ```
**3. Initialise Your Node:** by creating necessary configuration files and a validator key pair, establishing your node's identity within the 0G network.

   ```bash
   0gchaind init <your_validator_name> --chain-id zgtendermint_16600-2
   ```
**4. Set Up Genesis & Seeds:** Download and verify the correct genesis file, ensuring your node starts with the same initial state as the rest of the network.

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

**5. Start the Testnet Node:** Start your node and it should begin the synchronisation process with the 0G testnet, downloading and verifying the blockchain's history.

   ```bash
   0gchaind start
   ```
**6. Optimize Garbage Collection (For Pruning Nodes):** If running a pruning node, set these environment variables before starting your node: You can adjust the Go garbage collector and limit memory usage, potentially improving synchronization speed and overall performance.

   ```bash
   export GOGC=900
   export GOMEMLIMIT=24000MiB
   ```
## Creating Your Validator

**7. Create or Import an Account:** create a wallet within your node to hold your tokens and display the associated private key for importing into wallets like MetaMask.

   ```bash
   0gchaind keys add <key_name> --eth
   0gchaind keys unsafe-export-eth-key <key_name>
   ```
**8. Acquire Testnet Tokens:** Obtain testnet tokens from the 0G faucet from our [website](https://faucet.0g.ai) or by requesting them on their [Discord](disord/0glabs). These tokens are necessary for staking and becoming a validator.

**9. Become a Validator:** Register your node as a validator on the 0G network, specifying your stake amount, commission rates, and other important parameters.

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
**10. Check Validator Status:** You can check the status of your validator, by executing the command below and you can confirm if your validator is active and participating in consensus.

    ```bash
    0gchaind q staking validators -o json --limit=1000 | jq '.validators[] | select(.status=="BOND_STATUS_BONDED")' | jq -r '.tokens + " - " + .description.moniker' | sort -gr | nl
    ```
**11. Unjail Your Validator (If Needed):** If your validator gets "jailed" due to downtime or other issues, you can  unjail using the following command and resume participation in the network.

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
  <TabItem value="source" label="Automated Updates with Cosmovisor ">

## Overview

This guide outlines the steps to transition from using `0gchaind start [flags]` to leveraging Cosmovisor for managing your 0gchaind application. Cosmovisor offers the significant advantage of automating upgrades, eliminating the need for manual intervention.

## Migration Steps

1. **Stop the Current 0gchaind Instance:** Ensure the currently running 0gchaind process is stopped before proceeding with the migration.

2. **Download the Migration Script:** Obtain the migration script from the following URL:
   https://raw.githubusercontent.com/0glabs/0g-chain/dev/networks/testnet/init-cosmovisor.sh

   OR

   Install Cosmovisor:
   ```bash
   go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@latest
   ```

   Set up Cosmovisor:
   ```bash
   export DAEMON_NAME=0gchaind
   echo "export DAEMON_NAME=0gchaind" >> ~/.profile
   export DAEMON_HOME=$1
   echo "export DAEMON_HOME=$1" >> ~/.profile
   cosmovisor init $(whereis -b 0gchaind | awk '{print $2}')
   mkdir $DAEMON_HOME/cosmovisor/backup
   echo "export DAEMON_DATA_BACKUP_DIR=$DAEMON_HOME/cosmovisor/backup" >> ~/.profile
   echo "export DAEMON_ALLOW_DOWNLOAD_BINARIES=true" >> ~/.profile
   ```

3. **Verify the 0gchaind Path:** Utilize the `whereis 0gchaind` command to confirm the path of your 0gchaind binary. If the path returned by `whereis 0gchaind` differs from the one currently used to run 0gchaind, modify the script accordingly. Open the script and replace the 0gchaind path with the correct one.

4. **Execute the Migration Script:**
   * Make the script executable: `chmod +x init-cosmovisor.sh`
   * Run the script: `./init-cosmovisor.sh (0G_HOME)`

5. **Start 0gchaind with Cosmovisor:** Initiate 0gchaind using Cosmovisor: `cosmovisor run start [flags]`

## Troubleshooting

Should you encounter any issues, execute the following command to examine the Cosmovisor configuration: `cosmovisor config`. This command will display the current configuration settings, aiding in identifying and resolving potential problems.

## Benefits of Migrating to Cosmovisor

Cosmovisor streamlines the upgrade process for your blockchain application. Key advantages include:

* **Automated Upgrades:** Eliminates the need for manual intervention during upgrades.
* **Reduced Downtime:** Minimizes service interruptions during upgrade processes.
* **Simplified Node Management:** Facilitates easier node management and maintenance tasks.

For more comprehensive information on Cosmovisor, please consult the official Cosmovisor documentation.

By following these steps, you can ensure a smooth transition from `0gchaind start [flags]` to utilizing Cosmovisor. Should you require further assistance or encounter any challenges, refer to the Cosmovisor documentation or seek help from the community.

  </TabItem>
</Tabs>

