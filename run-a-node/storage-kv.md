# Storage KV

Detailed steps are provided as a guideline to deploy the Storage KV Client, which is a KV runtime built on top of the log layer.

* [Prerequisite](storage-kv.md#prerequisite)
* [Storage Node](storage-kv.md#storage-node)
* [Storage KV](storage-kv.md#storage-kv)
* [Storage Node CLI](storage-kv.md#storage-node-cli)

### Prerequisite

0G KV interact with on-chain contracts and storage nodes to simulate the KV data streams.

For official deployed contract addresses, visit [this page](../docs/contract-addresses.md).

### Storage KV

#### Hardware Requirement

```
- Memory: 4 GB RAM
- CPU: 2 cores
- Disk: Matches the size of kv streams it maintains
```

### Storage KV

1. Follow the same steps to install dependencies and rust in [storage node](storage-node.md#id-2.-storage-node)
2. Download the source code

```bash
git clone -b v1.2.1 https://github.com/0glabs/0g-storage-kv.git
```

3. Build the source code

<pre class="language-bash"><code class="lang-bash">cd 0g-storage-kv
<strong>git submodule update --init --recursive
</strong>
# Build in release mode
cargo build --release
</code></pre>

4. Copy the `config_example.toml` to `config.toml` and update the parameters

```toml
#######################################################################
###                   Key-Value Stream Options                      ###
#######################################################################

# In KV Senario, each independent KV database abstraction has an unique stream id.

# Streams to monitor.
stream_ids = ["000000000000000000000000000000000000000000000000000000000000f2bd", "000000000000000000000000000000000000000000000000000000000000f009", "0000000000000000000000000000000000000000000000000000000000016879", "0000000000000000000000000000000000000000000000000000000000002e3d"]

#######################################################################
###                     DB Config Options                           ###
#######################################################################

# Directory to store data.
db_dir = "db"
# Directory to store KV Metadata.
kv_db_dir = "kv.DB"

#######################################################################
###                     Log Sync Config Options                     ###
#######################################################################

blockchain_rpc_endpoint = ""
log_contract_address = ""
# log_sync_start_block_number should be earlier than the block number of the first transaction that writes to the stream being monitored.
log_sync_start_block_number = 0

#######################################################################
###                     RPC Config Options                          ###
#######################################################################

# Whether to provide RPC service.
rpc_enabled = true

# HTTP server address to bind for public RPC.
rpc_listen_address = "0.0.0.0:6789"

# Zerog storage nodes to download data from.
zgs_node_urls = "http://127.0.0.1:5678,http://127.0.0.1:5679"

#######################################################################
###                     Misc Config Options                         ###
#######################################################################

log_config_file = "log_config"
```

5. Run the kv service

```bash
cd run

# consider using tmux in order to run in background
../target/release/zgs_kv --config config.toml
```

Note: The recommended system configuration is the same as the storage node.

### You are all set !