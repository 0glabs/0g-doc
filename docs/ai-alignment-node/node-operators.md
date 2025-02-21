---
sidebar_position: 3
---

# Node Operator

A **Node Operator** runs and maintains the physical or cloud-based infrastructure, ensuring the node is online and compliant with network standards. Operators may be:

- **License Owners** themselves, or
- **Whitelisted** by 0G.

Below is an overview of their key tasks and responsibilities.

## Register as a Node Operator

To be recognized as an operator on the network:

1. **Register Using CLI**
    
    ```bash
    0g-alignment-node register --commissionRate <commission_fee_rate> --tokenId <owned_license> --key <private_key> --url <blockchain_rpc>
    ```
    
    - commission_fee_rate: Percentage of rewards retained by you.
    - owned_license: Leave empty if you are whitelisted without direct ownership.
2. **Approve Delegations**
    - After a Node Owner delegates licenses to your wallet, you must **approve** them in the CLI:
        
        ```bash
        // Code Not defined Yet
        ```
        
        - Confirms acceptance of the license(s) delegated to you.
3. **Operator-Side Undelegation**
    - In cases of payment disputes or policy issues, you can forcibly undelegate:
        
        ```bash
        // Code Not defined Yet
        ```
        
        - This action removes the delegated license(s) from your control, returning them to the owner.

## System Requirements

Before running a node, ensure your environment meets the minimum requirements:

- **64 MB RAM**
- **1 x86 CPU Core @2.1GHz**
- **10 GB Disk Space**
- **10 Mbps Internet Connection**

The port corresponding to the port must be accessible externally.

## Run a Node with CLI/App

After successful registration:

1. **Start the Node**
    
    ```bash
    0g-alignment-node start
    ```
    
    - The `start` command launches the alignment node service, which remains active as long as your environment is stable.

---

## Frequently Asked Questions (FAQ)

1. **Do I need to own a License NFT to be an operator?**
    - No, you can either own a license or be whitelisted by 0G as a NAAS provider.
2. **How do I set my commission rate?**
    - Commission rate is set during registration using the `--commissionRate` parameter.
3. **Can I change my commission rate later?**
    - No, commission rates are fixed at registration to ensure transparency for Node Owners.
4. **What happens if my node goes offline?**
    - Node downtime affects reward generation. Maintain high uptime to maximize rewards.
5. **Can I operate nodes for multiple owners?**
    - Yes, you can accept delegations from multiple Node Owners.
6. **What are my responsibilities as an operator?**
    - Maintain node uptime, ensure system requirements are met, and keep the node software updated.
7. **How do I handle technical issues?**
    - Monitor node performance regularly and maintain communication with Node Owners about any planned maintenance. 