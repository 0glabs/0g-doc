---
sidebar_position: 2
---

# Node Owner

The **Node Owner** is the holder of the Alignment Node License NFT.

:::tip
If you want to run your own node instead of delegating to an operator, please refer to the [Node Operator](./node-operators.md) documentation for technical requirements and setup instructions.
:::

## Node Owner Portal

A dedicated web portal provides an intuitive interface for managing your **License NFTs** and monitoring your rewards. Once logged in (wallet connected), the Owner can view all their licenses, delegate/undelegate them, and claim rewards.

### Delegation of the Node License

1. **Connect Wallet**
    - Navigate to the **Alignment Node Owner Portal**.
    - Click **"Connect Wallet"** in the top-right corner.
    - Once connected, your wallet address is displayed, confirming your login.
    
    > Screenshot Placeholder
    > 
2. **Choose a NAAS Provider**
    - Go to the **"Operation"** tab.
    - Each provider listing may include:
        - Provider name & Details
        - **Type** of service (e.g., Pre-paid, Commission-based)
            - Pre-paid - This operators require a upfront fees to run your nodes
            - Commission-based - This operators operates based on a commission percentage, that will deducted from node rewards so, there is no upfront fee requirement
    - Select from the list of **Node-as-a-Service (NAAS)** providers.
    
    > Screenshot Placeholder
    > 
3. **Delegate Your License NFT**
    - Enter the units (number) of License NFTs to delegate.
    - Click **"Delegate"** button.
    - Provide the **delegate wallet address** from the chosen NAAS provider.
    
    // TODO : Need to add NAAS specific content
    
    - Confirm the delegation to set the license to a **pending** state until the operator approves.
    
    > Screenshot Placeholder
    > 

### Undelegate the License

If you wish to change operators, or simply reclaim your license, you can **undelegate**:

1. From the **"Operation"** tab, select **"Undelegate"**.
2. Choose the **operator** from whom you want to undelegate and specify the **number of License NFTs**.
3. Confirm the undelegation.
4. Your License NFTs return to **"Free"** status, allowing redelegation to another operator or self-operation.

> Screenshot Placeholder
> 

### Claims & Withdraw

Once your node has been running (via a delegated operator or by yourself), you can claim rewards:

1. Go to **"Claim & Withdraw"** or the equivalent tab.
2. View your **accumulated rewards**.
3. **Claim** the rewards to transfer them to your wallet.

> Screenshot Placeholder
> 

## Reward Calculation

When a License NFT is delegated to an operator, the node will begin generating rewards. The formula for rewards typically accounts for node uptime, operator performance, and commission rates. 

//TODO: Need add reward & withdraw flow with simplified formula 

---

## Frequently Asked Questions (FAQ)

1. **What is a License NFT?**
    - An NFT granting the right to run an Alignment Node or delegate it to a NAAS provider.
2. **Can I delegate multiple License NFTs to one operator?**
    - Yes, as long as you specify the number of units. Ensure the operator is approved for the total licenses.
3. **How do I switch NAAS providers?**
    - **Undelegate** from your current operator, then **delegate** to a new operator's address.
4. **When and how can I claim rewards?**
    - Anytime after your node(s) have generated rewards. Go to the **"Claim & Withdraw"** on owner Portal.
5. **What happens if my operator stops performing well?**
    - You can undelegate your license and choose a different operator at any time.
6. **Can I run my own node instead of delegating?**
    - Yes, as a license owner you can register as an operator and run your own node.
7. **What happens to my rewards during undelegation?**
    - Any unclaimed rewards should be claimed before undelegating to ensure you don't lose them. 