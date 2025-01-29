---
id: precompiles-overview
title: Overview 
---
# EVM Precompiles on 0G Chain

EVM (Ethereum Virtual Machine) precompile contracts are special, built-in contracts provided by the Ethereum protocol to perform specific, commonly-used operations more efficiently than if they were implemented in Solidity or another high-level language.

The current version of 0g chain supports the Istanbul version of the EVM and all the EVM precompiles it includes(check it out [here](https://www.evm.codes/precompiled?fork=istanbul)). In addition to the native EVM precompiles, we have also defined additional precompile contracts to enable modifying the state of Cosmos modules through EVM transactions:

* [DASigners precompile](dasigners.md)
* [Staking Precompile](staking.md)
* [WrappedA0GIBase Precompile](wrappeda0gibase.md)

# Interact with 0G Precompiles in Smart Contracts

Calling 0g precompiles in a contract can be a bit tricky. Since some of the newly added precompiles are stateful, interacting with their non-read-only functions in a contract requires using a low-level call. The `mint` function of [WA0GI](https://github.com/0glabs/A0GI-contracts/blob/main/contracts/WrappedA0GI.sol) can be used as a reference for implementation.







