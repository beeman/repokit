# repokit

🧰 Manage template repositories for [create-solana-dapp](https://npm.im/create-solana-dapp).

Work in progress.

```shell
# npm
npx repokit@latest

# pnpm
pnpm dlx repokit@latest

# bun
bunx repokit@latest

# yarn won't be supported. Use pnpm or bun instead if you don't like npm.
```

[![npm version](https://img.shields.io/npm/v/repokit?color=yellow)](https://npmjs.com/package/repokit)
[![npm downloads](https://img.shields.io/npm/dm/repokit?color=yellow)](https://npmjs.com/package/repokit)

## Local development

> [!TIP] This project uses [pnpm](https://pnpm.io/) as the package manager. If you don't have it, you can install it
> using `corepack`:
>
> ```sh
> corepack enable
> corepack prepare pnpm@10 --activate
> ```

To install the project locally, run the following commands:

```shell
git clone https://github.com/beeman/repokit.git
cd repokit
pnpm install
pnpm build
```
