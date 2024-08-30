# K-V Store

A key-value database abstraction is built on top of the 0G storage layer. Files with specific tags uploaded to the storage layer are treated as KV files. Users who wish to use KV can set up a service called KV Node themselves. This service monitors, downloads and deserializes KV files. It then reconstructs the KV database locally by replaying the KV database operations contained in the KV files.

## KV Stream

In the KV abstraction, a KV database is referred to as a KV stream and is assigned a unique stream ID.

## KV File

In the KV abstraction, incoming read and write operations on the KV streams are serialized into a single file and then uploaded to the 0G storage network. You can think of this file as a transaction of a traditional KV database. This file will include a specific format tag to indicate that it is a KV file, allowing the KV node to monitor it:

```
tag = STREAM_DOMAIN + StreamId[0] + ... + StreamId[n]

STREAM_DOMAIN = SHA256("STREAM") = df2ff3bb0af36c6384e6206552a4ed807f6f6a26e7d0aa6bff772ddc9d4307aa
```

The stream ids in the tags are the KV streams involved in the KV transaction.

Next, the KV operations contained within this KV transaction will be serialized in the following format to compose the file content:

```
StreamData = Version + StreamReadSet + StreamWriteData + AccessControlData

StreamReadSet = StreamReadSetSize + StreamRead[0] + ... + StreamRead[StreamReadSetSize - 1]

StreamWriteData = StreamWriteSize + 
				  StreamWriteInfo[0] + ... + StreamWriteInfo[StreamWriteSize - 1] +
				  StreamWriteData[0] + ... + StreamWriteData[StreamWriteSize - 1]

AccessControlData = AccessControlSize + AccessControl[0] + ... + AccessControl[AccessControlSize - 1]
```

- `KVReadSet` contains the read of key-value pairs of KV streams.
- `KVWriteData` contains the update of keys in the KV streams.
- `AccessControlData` contains the changes to access permissions of KV streams.

Furthermore, here is the detailed structure for them:

|       Parameter      |                                        Explanation                                        |              Size              |
|:--------------------:|:-----------------------------------------------------------------------------------------:|:------------------------------:|
| StreamId             | ID of stream                                                                              | 32B                            |
| KeySize              | Size of key                                                                               | 3B, 2^24=16.7MB                |
| Key                  | Key in a kv store                                                                         | KeySize bytes                  |
| Version              | An update of a key in the kv store. It equals to the tx sequence number                   | 8B                             |
| StreamReadSetSize    | Size of read set                                                                          | 4B, up to 2^32 items           |
| StreamRead           | Body of a stream read: StreamId + KeySize + Key                                           | 32 + 32 + [KeySize]            |
| StreamWriteSetSize   | Size of write set                                                                         | 4B, up to 2^32 items           |
| StreamWriteSize      | Size of data in byte                                                                      | 8B, up to 2^64 bytes           |
| StreamWriteInfo      | Information of a stream write: StreamId + KeySize + Key + StreamWriteSize                | 32 + 3 + [KeySize] + 8         |
| StreamWriteData      | Data to update                                                                            |                                |
| AccessControlSize    | Size of access management                                                                 | 4B, up to 2^32 items           |
| AccessControlType    | Access control action                                                                     | 1B                             |
| AccessControlAddress | The address to change role                                                                | 20B                            |
| AccessControl        | Body of a access role update: AccessControlType + StreamId +  (KeySize + Key) + (account) | depends on AccessControlType   |



When a KV node detects a correctly formatted KV file, the KV transactions contained within it will be committed to the local KV database if they meet the following conditions:

- There is no confliction in `StreamReadSet`, which means for any `StreamRead` in `StreamReadSet`, the `Version` must be equal to or larger than the latest version of the key at the point the file submission transaction is confirmed on chain.
- All the access control operation in `AccessControlSet` is valid, which means the transaction sender has the corresponding permissions to execute these operations.
- The ids of all streams whose keys get updated in `StreamWriteData` must be included in the file tags.

Otherwise, the KV file will be marked reverted and not get commit into the local KV database.

## AccessControl

There are different access control operations in KV:

| AccessControlType |                    Explanation                   |         Params         |              Requirement             |
|:-----------------:|:------------------------------------------------:|:----------------------:|:------------------------------------:|
| 0x00              | Grant admin role to account                      | StreamId, Address      | Sender is admin                      |
| 0x01              | Renounce sender’s admin role                     | StreamId               | -                                    |
| 0x10              | Set a key to special                             | StreamId, Key          | Sender is admin                      |
| 0x11              | Unset a special key                              | StreamId, Key          | Sender is admin                      |
| 0x20              | Grant writer role of all normal keys to account  | StreamId, Address      | Sender is admin or writer            |
| 0x21              | Revoke writer role of all normal keys of account | StreamId, Address      | Sender is admin                      |
| 0x22              | Renounce sender’s writer role of all normal keys | StreamId               | -                                    |
| 0x30              | Grant writer role of a key to account            | StreamId, Key, Address | Sender is admin or writer of the key |
| 0x31              | Revoke writer role of a key of account           | StreamId, Key, Address | Sender is admin                      |
| 0x32              | Renonce sender’s writer role of a key            | StreamId, Key          | -                                    |

Some general rules:
- An admin has the permission to update any key.
- For a brand-new stream ID, which has not had any write operations previously, the first person to write to it will automatically become its admin. Afterward, this stream ID will not allow any other users who have not been granted permissions to write to it.
- In a KV stream, initially, all keys are normal keys.