# download

The `download` subcommand downloads the user specified file from a storage endpoint. To use it

```
Usage:
  0g-storage-client download [flags]

Flags:
      --file string      File name to download
      --indexer string   ZeroGStorage indexer URL
      --node strings     ZeroGStorage storage node URL. Multiple nodes could be specified and separated by comma, e.g. url1,url2,url3
      --proof            Whether to download with merkle proof for validation
      --root string      Merkle root to download file
```

Refer to the [upload](upload.md) page for the file root hash.

**Example:**

```bash
> 0g-storage-client download --file tmp2 --indexer https://rpc-storage-testnet.0g.ai --root 0x1623b89521bbdde2856fa341fa9e466995f79f9e0b5f0190278b04b64cc3fd5f

INFO[2024-07-15T16:46:45+08:00] Begin to download file from storage nodes     num nodes=1
INFO[2024-07-15T16:46:46+08:00] Completed to download file                   
INFO[2024-07-15T16:46:46+08:00] Succeeded to validate the downloaded file
```

The program will check the integrity of the downloaded file by checking its size and root. However, if you want a more strict data integrity check on the merkle proof, you could do

```bash
0g-storage-client download \
    --indexer https://rpc-storage-testne.0g.ai \
    --file <file_name> --root <file_root_hash> \
    --proof
```
