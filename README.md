# IDENTI Plugins

This repository contains all the plugins for the IDENTI.

This repository is based on [Veramo Plugins](https://github.com/decentralized-identity/veramo-plugin)

## Plugins

- [Key Manager](packages/key-manager/README.md): Manages keys
- [LACChain](packages/lacchain/README.md): LACChain actions

## Development

#### Install dependencies

```bash
pnpm install
```

#### Configure agent.yaml

```bash
cp agent.yaml.example agent.yaml
```

#### Start the server

```bash
pnpm run start
```

## Utils

### Create a new database secret

```bash
pnpm run key
```
