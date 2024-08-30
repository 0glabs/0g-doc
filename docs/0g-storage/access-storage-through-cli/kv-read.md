# kv-read

The `kv-read`subcommand reads the user specified keys which were stored in the key-value database from a kv node endpoint. To use it

```
Usage:
  0g-storage-client kv-read [flags]

Flags:
      --node string           kv node url
      --stream-id string      stream to read/write (default "0x")
      --stream-keys strings   kv keys
      --version uint          key version (default 18446744073709551615)
```

**Example:**

```bash
> 0g-storage-client kv-read \
    --node <kv_node_url> \
    --stream-id 0x000000000000000000000000000000000000000000000000000000000000f2bd \
    --stream-keys TestKey0,TestKey1

{"TestKey0":"TestValue0","TestKey1":"TestValue1"}
```

