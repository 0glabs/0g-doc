---
sidebar_position: 4
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Validator Node
---

Running a validator node in the 0G ecosystem means actively participating in the network's security and consensus through the Proof-of-Stake (PoS) mechanism. As a validator, you'll validate transactions, propose new blocks, and earn rewards for your contribution to the network's integrity and decentralization.

## Hardware Requirements

```
- Memory: 64 GB
- CPU: 8 cores
- Disk: 1 TB NVME SSD
- Bandwidth: 100 MBps for Download / Upload
```

<Tabs>
  <TabItem value="binary" label="Build from Source" default>

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
   ```bash
   sed -i 's|seeds = ""|seeds = "81987895a11f6689ada254c6b57932ab7ed909b6@54.241.167.190:26656,010fb4de28667725a4fef26cdc7f9452cc34b16d@54.176.175.48:26656,e9b4bc203197b62cc7e6a80a64742e752f4210d5@54.193.250.204:26656,68b9145889e7576b652ca68d985826abd46ad660@18.166.164.232:26656"|' $HOME/.0gchain/config/config.toml
   ```

   ***c. (Optional) Add Persistent Peers:***
   If desired, add specific node addresses to the `persistent_peers` line in the same file for reliable connectivity to those nodes.

## Starting Your Node

**5. Start the Testnet Node:** Start your node and it should begin the synchronisation process with the 0G testnet, downloading and verifying the blockchain's history.

   ```bash
   0gchaind start
   ```
**6. Optimization:**

***a. RPC Node:***
To run a full RPC node, set pruning to nothing.

For the testnet, due to stress testing with a large number of transactions, a full node requires 4TB of storage to sync.

***b. Optimize Garbage Collection (For Pruning Nodes):*** If running a pruning node, set these environment variables before starting your node: You can adjust the Go garbage collector and limit memory usage, potentially improving synchronization speed and overall performance.

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
**8. Acquire Testnet Tokens:** Obtain testnet tokens from the 0G faucet from our [website](https://faucet.0g.ai) or by requesting them on their [Discord](https://discord.com/invite/0glabs). These tokens are necessary for staking and becoming a validator.

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
**12. Delegate to Another account:**

   ```bash
   0gchaind tx staking delegate <0gvaloper> <amount>ua0gi --gas auto --gas-adjustment 1.4 --from ga-testnet --node <tendermint_rpc> --chain-id <chain-id>
   ```
***Note: Only the top 125 staked validators will be active.***

### Remember

- Stay updated with the latest testnet information and announcements on our socials and blog posts.
- Reach out to us on Discord or to the community for support if you encounter any issues.

### Troubleshooting

If you encounter any issues during the setup or operation of your validator node, please consult our [FAQ section](./testnet-information.md#node-faq-frequently-asked-questions) or reach out to our community support channels.

### Next Steps

After successfully setting up your validator node, consider exploring the following:

- [Node Monitoring and Maintenance](./testnet-information.md)

Thank you for contributing to the security and decentralization of the 0g network!

</TabItem>
   <TabItem value="docker" label="Run with Docker" default>

## Starting Your Node
**1. Clone the Validator Node Repo:** 
   ```bash
   git clone https://github.com/0glabs/0g-chain.git
   ```

**2. Build and Start the Docker Node:** 

   ```bash
   cd 0g-chain
   docker build -f Dockerfile-node -t 0g-chain-validator .
   docker run -d --name 0g-chain-validator -p 26656:26656 -p 26657:26657 -e GOGC=900 -e GOMEMLIMIT=40GiB 0g-chain-validator
   ```

   Recommended on Garbage Collection for Pruning Nodes: To maximize sync speed for validators and other network providers that are running pruning nodes, the above settings are recommended. GOGC=900 instructs golang to start garbage collection when heap has grown to 9x, and GOMELIMIT=40GB ensures garbage collection runs whenever memory usage reaches 40GB.

## Registering Your Validator

**3. Create or Import an Account:** 

   ```bash 
   # Create a wallet and export the private key
   docker exec -it <container_name> /bin/bash
   0gchaind keys add <key_name> --eth
   0gchaind keys unsafe-export-eth-key <key_name>
   ```

   ```bash
   # Import an existing key by entering the mnemonic
   docker exec -it <container_name> /bin/bash
   0gchaind keys add <key_name> --recover --eth
   ```

**4. Acquire Testnet Tokens:** Obtain testnet tokens from the 0G faucet by entering your public key on our [website](https://faucet.0g.ai) or by requesting on [Discord](disord/0glabs). These tokens are necessary for staking and becoming a validator. 

**5. Become a Validator:** Register your node as a validator on the 0G network, specifying your stake amount, commission rates, and other important parameters.

   ```bash
   0gchaind tx staking create-validator \
   --amount=<staking_amount>ua0gi \
   --pubkey=$(0gchaind tendermint show-validator) \
   --moniker="<your_validator_name>" \
   --chain-id=zgtendermint_16600-2 \
   --details "<validator_description>" \
   --website "<https://yourwebsite.com>" \
   --identity "<keybase_id>" \
   --security-contact "<mail-address>" \
   --commission-rate="0.10" \
   --commission-max-rate="0.20" \
   --commission-max-change-rate="0.01" \
   --min-self-delegation="1" \
   --from=<key_name> \
   --gas=auto \
   --gas-adjustment=1.4
   ```
***Note: Only the top 125 staked validators will be active.***

## Check the Status on Your Validator

**6. Check Validator Consensus Status:** You can check the status of your validator, by executing the command below and you can confirm if your validator is active and participating in consensus.

    ```bash
    0gchaind q staking validators -o json --limit=1000 | jq '.validators[] | select(.status=="BOND_STATUS_BONDED")' | jq -r '.tokens + " - " + .description.moniker' | sort -gr | nl
    ```

**7. Check Validator Sync Status:**

   ```bash
   0gchaind status | jq '{ latest_block_height: .sync_info.latest_block_height, catching_up: .sync_info.catching_up }'
   ```

**11. Unjail Your Validator (If Needed):** If your validator gets "jailed" due to downtime or other issues, you can  unjail using the following command and resume participation in the network.

    ```bash
    0gchaind tx slashing unjail --from <key_name> --gas=500000 --gas-prices=99999neuron -y
    ```

***Note: Only the top 125 staked validators will be active.***

### Remember

- Stay updated with the latest testnet information and announcements on our socials and blog posts.
- Reach out to us on Discord or to the community for support if you encounter any issues.

### Troubleshooting

If you encounter any issues during the setup or operation of your validator node, please consult our [FAQ section](../learn-more/how-to-contribute.md) or reach out to our community support channels.

### Next Steps

After successfully setting up your validator node, consider exploring the following:

- [Node Monitoring and Maintenance](./testnet-information.md)

Thank you for contributing to the security and decentralization of the 0g network!


 </TabItem>

  <TabItem value="source" label="Automated Updates with Cosmovisor ">

### What is Cosmovisor?

Cosmovisor is a process manager for Cosmos SDK application binaries that automates application binary switches during chain upgrades. It's a powerful tool from the Cosmos ecosystem designed to streamline the upgrade process for Cosmos SDK-based blockchain nodes.
This automation significantly reduces the manual intervention required during network upgrades, ensuring a smoother and more consistent upgrade process across all nodes in the network.

### Cosmovisor in 0G

In the context of 0G, Cosmovisor will be used to manage the 0gchaind application. When upgrades are proposed and approved on the 0G network, Cosmovisor will handle the entire upgrade process automatically, minimizing downtime and reducing the need for manual intervention by node operators.

By using Cosmovisor, you can significantly streamline your node operations and ensure smoother upgrades for your 0gchaind application, contributing to the overall stability and efficiency of the 0G network.

## Migration Guide

This guide outlines the steps to transition from using `0gchaind start [flags]` to leveraging Cosmovisor for managing your 0gchaind application.

### Prerequisites

- Ensure you have `go` installed on your system.
- You should have `0gchaind` already installed and running.

### Migration Steps

1. **Stop the Current 0gchaind Instance:** 
   Ensure the currently running 0gchaind process is stopped before proceeding with the migration.

2. **Install Cosmovisor:**
   You have two options:

   a. Download and use the migration script:
   ```bash
   wget https://raw.githubusercontent.com/0glabs/0g-chain/dev/networks/testnet/init-cosmovisor.sh
   chmod +x init-cosmovisor.sh
   ```

   OR

   b. Install Cosmovisor manually:
   ```bash
   go install cosmossdk.io/tools/cosmovisor/cmd/cosmovisor@latest
   ```

3. **Set up Cosmovisor:**
   If you chose option b in step 2, set up Cosmovisor with the following commands:
   ```bash
   export DAEMON_NAME=0gchaind
   echo "export DAEMON_NAME=0gchaind" >> ~/.profile
   export DAEMON_HOME=$HOME/.0g  # Adjust this path if your 0gchaind home directory is different
   echo "export DAEMON_HOME=$DAEMON_HOME" >> ~/.profile
   cosmovisor init $(which 0gchaind)
   mkdir $DAEMON_HOME/cosmovisor/backup
   echo "export DAEMON_DATA_BACKUP_DIR=$DAEMON_HOME/cosmovisor/backup" >> ~/.profile
   echo "export DAEMON_ALLOW_DOWNLOAD_BINARIES=true" >> ~/.profile
   ```

4. **Verify the 0gchaind Path:** 
   Use the `which 0gchaind` command to confirm the path of your 0gchaind binary. If the path differs from the one currently used to run 0gchaind, modify the script or commands accordingly.

5. **Execute the Migration:**
   If using the script:
   ```bash
   ./init-cosmovisor.sh $HOME/.0g  # Adjust the path if necessary
   ```
   
   If you set up manually, ensure all the export commands from step 3 have been run.

6. **Start 0gchaind with Cosmovisor:** 
   Initiate 0gchaind using Cosmovisor:
   ```bash
   cosmovisor run start [flags]
   ```
   Replace `[flags]` with any additional flags you normally use when starting 0gchaind.

### Verifying the Setup

To ensure Cosmovisor is set up correctly:

1. Check that Cosmovisor is running:
   ```bash
   ps aux | grep cosmovisor
   ```

2. Verify the Cosmovisor configuration:
   ```bash
   cosmovisor config
   ```
   This will display the current configuration settings.

### Troubleshooting

If you encounter any issues during the migration or operation of Cosmovisor, consider the following:

1. Check the Cosmovisor logs for any error messages:
   ```bash
   tail -f $DAEMON_HOME/cosmovisor/logs/cosmovisor.log
   ```

2. Ensure all environment variables are set correctly:
   ```bash
   echo $DAEMON_NAME
   echo $DAEMON_HOME
   echo $DAEMON_DATA_BACKUP_DIR
   echo $DAEMON_ALLOW_DOWNLOAD_BINARIES
   ```

3. Verify that the 0gchaind binary is in the correct location as expected by Cosmovisor.

If problems persist, consult the [official Cosmovisor documentation](https://docs.cosmos.network/main/tooling/cosmovisor) or seek help from the 0G community.

### Conclusion

By following this guide, you've successfully migrated from running 0gchaind directly to using Cosmovisor. This setup will automate future upgrades, reducing downtime and simplifying node management. Remember to keep your system updated and monitor for any announcements from the 0G team regarding future upgrades or changes to the network infrastructure.
  </TabItem>
</Tabs>

