# upload

The `upload` subcommand uploads the user specified file to a storage endpoint. To use it

```bash
Usage:
  0g-storage-client upload [flags]

Flags:
      --contract string         ZeroGStorage smart contract to interact with
      --expected-replica uint   expected number of replications to upload (default 1)
      --file string             File name to upload
      --finality-required       Wait for file finality on nodes to upload
      --indexer string          ZeroGStorage indexer URL
      --key string              Private key to interact with smart contract
      --node strings            ZeroGStorage storage node URL
      --skip-tx                 Skip sending the transaction on chain if already exists (default true)
      --tags string             Tags of the file (default "0x")
      --task-size uint          Number of segments to upload in single rpc request (default 10)
      --url string              Fullnode URL to interact with ZeroGStorage smart contract
```

The `key` is your account's private key.

**Example:**

```bash
> 0g-storage-client upload --url https://rpc-testnet.0g.ai --contract 0x8873cc79c5b3b5666535C825205C9a128B1D75F1 --indexer
https://rpc-storage-testnet.0g.ai --file tmpFile --key abc...

INFO[2024-07-15T16:34:36+08:00] Data prepared to upload                       chunks=2 segments=1 size=316
INFO[2024-07-15T16:34:36+08:00] Data merkle root calculated                   root=0x1623b89521bbdde2856fa341fa9e466995f79f9e0b5f0190278b04b64cc3fd5f
INFO[2024-07-15T16:34:38+08:00] Succeeded to send transaction to append log entry  hash=0x859567b0ec2e49ef5251b6fa83841186d9654c87fe95d32e549112761031007f
INFO[2024-07-15T16:34:44+08:00] Upload small data immediately                
INFO[2024-07-15T16:34:44+08:00] Begin to upload file                          nodeNum=1 segNum=1
INFO[2024-07-15T16:34:45+08:00] Completed to upload file                      duration=675.419503ms segNum=1
INFO[2024-07-15T16:34:45+08:00] Wait for log entry on storage node            finality=false root=0x1623b89521bbdde2856fa341fa9e466995f79f9e0b5f0190278b04b64cc3fd5f
INFO[2024-07-15T16:34:46+08:00] Log entry is unavailable yet                 
...              
INFO[2024-07-15T16:36:03+08:00] upload took                                   duration=1m26.841773783s
```

To generate a random testing file, run

```bash
0g-storage-client gen --file <file_name> --size <file_size_in_bytes>
```

Example:

```bash
> 0g-storage-client gen --file tmpFile

INFO[2024-07-15T16:02:52+08:00] Succeeded to write file file=tmpFile root=0x1623b89521bbdde2856fa341fa9e466995f79f9e0b5f0190278b04b64cc3fd5f
```

Keep a record of the root hash of the file as it is required if you want to download the same file later.
