---
id: security
title: Security
sidebar_position: 4
---

# Security at 0G

At 0G, we prioritize the security and integrity of our platform. Our commitment to security is reflected in our rigorous audit processes and our active bug bounty program.

## Audits

We regularly conduct thorough security audits of our smart contracts, protocols, and infrastructure to ensure the highest level of security for our users.

### Recent Audits - to be added 

| Date | Auditor | Scope | Report |
|------|---------|-------|--------|
| [Date] | [Auditor Name] | [Audit Scope] | [Link to Report] |
| [Date] | [Auditor Name] | [Audit Scope] | [Link to Report] |

For a complete list of our audits and their detailed reports, please visit our [GitHub repository](https://github.com/0glabs/audits).

## [0G Labs Bug Bounty Program with hackenproof](https://hackenproof.com/programs/0g-labs-smart-contracts)

We believe in the power of community driven security. Our bug bounty program encourages security researchers and developers to help us identify and resolve potential vulnerabilities.

### Scope

Our bug bounty program covers:
- Smart Contracts
- Infrastructure
- Protocol
# Focus Area

### IN SCOPE VULNERABILITIES Smart Contracts

We are looking for evidence and reasons for incorrect behavior of the smart contract, which could cause unintended functionality:

Stealing or loss of funds
Unauthorized transaction
Transaction manipulation
Attacks on logic (behavior of the code is different from the business description)
Reentrancy
Reordering
Over and underflows

### OUT OF SCOPE VULNERABILITIES Smart Contracts

Theoretical vulnerabilities without any proof or demonstration
Old compiler version
The compiler version is not locked
Vulnerabilities in imported contracts
Code style guide violations
Redundant code
Gas optimizations
Best practice issues
Vulnerabilities that can be exploited through front-run attacks only
Codes out of scope in 0g-storage-contract:
cashier;
token;
reward/OnePoolReward;
reward/ChunkDecayReward;
uploadMarket;
utils/Exponent.sol.

### Rewards

Rewards are based on the severity of the discovered vulnerability:

| Severity | Reward Range |
|----------|--------------|
| Critical | $35,000 |
| High     | $8000 |
| Medium   | $2000 |
| Low      | $500 |

### Program Rules

Avoid using web application scanners for automatic vulnerability searching which generates massive traffic
Make every effort not to damage or restrict the availability of products, services, or infrastructure
Avoid compromising any personal data, interruption, or degradation of any service
Don’t access or modify other user data, localize all tests to your accounts
Perform testing only within the scope
Don’t exploit any DoS/DDoS vulnerabilities, social engineering attacks, or spam
Don’t spam forms or account creation flows using automated scanners
In case you find chain vulnerabilities we’ll pay only for vulnerability with the highest severity.
Don’t break any law and stay in the defined scope
Any details of found vulnerabilities must not be communicated to anyone who is not a HackenProof Team or an authorized employee of this Company without appropriate permission

### Disclosure Guidelines

Do not discuss this program or any vulnerabilities (even resolved ones) outside of the program without express consent from the organization
No vulnerability disclosure, including partial is allowed for the moment.
Please do NOT publish/discuss bugs

### Eligibility and Coordinated Disclosure

We are happy to thank everyone who submits valid reports which help us improve the security. However, only those that meet the following eligibility requirements may receive a monetary reward:

You must be the first reporter of a vulnerability.
The vulnerability must be a qualifying vulnerability
Any vulnerability found must be reported no later than 24 hours after discovery and exclusively through hackenproof.com
You must send a clear textual description of the report along with steps to reproduce the issue, include attachments such as screenshots or proof of concept code as necessary.
You must not be a former or current employee of us or one of its contractor.
ONLY USE the EMAIL under which you registered your HackenProof account (in case of violation, no bounty can be awarded)
Provide detailed but to-the point reproduction steps