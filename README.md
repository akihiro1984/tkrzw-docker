
# TKRZW-RPC Docker

## Overview

TKRZW-RPCをDockerで使う。

## Usage

```
docker compose up -d
```

## Sample

### tkrzw_rpc.proto

node.js で使う必要があったので PoC を作成。
サンプルスクリプトを動作させるには、`tkrzw_rpc.proto` が必要。

ビルド時にコンテナ内部に展開されてるので、それを取り出すのが早い。
コンテナが起動していれば下記コマンドで取り出せる。

```
docker compose cp -L tkrzw:/usr/local/share/tkrzw/tkrzw_rpc.proto ./sample
```

### 動作確認

```
docker compose --profile poc up node
```

## Notice

使用にあたっては、Tkrzw, Tkrzw-RPC のページ熟読の上、そのLicenseに従うものとする。

## Special Thanks & Docs

[Tkrzw](https://dbmx.net/tkrzw/)

[Tkrzw-RPC](https://dbmx.net/tkrzw-rpc/)



