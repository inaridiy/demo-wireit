# HonoJS + Wireit なモノレポ

このリポジトリは、[Hono アドベントカレンダー 2024](https://qiita.com/advent-calendar/2024/hono) 12/17 の記事のサンプルコードです。
HonoRPC 用の型生成や、Shared パッケージのビルドなどを wireit で管理して、開発体験を向上させています。

## プロジェクト構成

```
.
├── apps/
│   ├── backend/  # Cloudflare Workers 上で動作する API サーバー
│   └── frontend/ # Cloudflare Workers 上で動作する フロントエンド
└── packages/
    └── shared/   # 共有パッケージ（型定義など）
```

## 技術スタック

- **フロントエンド**

  - [Hono](https://hono.dev/) - Web フレームワーク
  - [Cloudflare Workers](https://workers.cloudflare.com/) - エッジランタイム

- **バックエンド**

  - [Hono](https://hono.dev/) - Web フレームワーク
  - [Drizzle ORM](https://orm.drizzle.team/) - データベース ORM
  - [Zod](https://zod.dev/) - バリデーション
  - [Cloudflare Workers](https://workers.cloudflare.com/) - エッジランタイム

- **開発ツール**
  - [Wireit](https://github.com/google/wireit) - タスク依存関係管理
  - [Biome](https://biomejs.dev/) - リンター & フォーマッター
  - [pnpm](https://pnpm.io/) - パッケージマネージャー

## セットアップ

1. パッケージのインストール

```bash
pnpm install
```

2. D1 のマイグレーション

```bash
cd apps/backend
pnpm wrangler d1 migrations apply todo-db --local
```

デプロイしたい場合は、wrangler d1 create todo-db を実行して、wrangler.toml を編集してください

4. 起動

```bash
pnpm dev
```

wireit が依存関係を自動でビルドしながら、いい感じに起動します。

5. 開発サーバーを起動すると以下のサービスが立ち上がります：

- フロントエンド: http://localhost:8788
- バックエンド: http://localhost:8787

## 開発コマンド

```bash
# 開発サーバーの起動
pnpm dev

# 型チェック
pnpm typecheck

# フォーマット
pnpm format
pnpm format:fix  # 自動修正

# リント
pnpm lint
pnpm lint:fix    # 自動修正
```

## デプロイ

デプロイ前に D1 データベースを作成して、wrangler.toml を編集してください。

```bash
# フロントエンドとバックエンドを Cloudflare Workers にデプロイ
cd apps/frontend && pnpm deploy
cd apps/backend && pnpm deploy
```

## ライセンス

MIT
