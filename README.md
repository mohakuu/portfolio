# Portfolio Project

このプロジェクトは [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) で作成された [Next.js](https://nextjs.org) プロジェクトです。

このプロジェクトは [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) を使用して、Vercel の新しいフォントファミリーである [Geist](https://vercel.com/font) を自動的に最適化して読み込みます。

## 技術スタック

このプロジェクトでは以下の技術を使用しています：

- **フレームワーク**: [Next.js 16.1.1](https://nextjs.org/) with App Router
- **React**: 19.2.3
- **TypeScript**: ^5
- **スタイリング**: [Tailwind CSS 4](https://tailwindcss.com/)
- **CMS**: [microCMS](https://microcms.io/) via `microcms-js-sdk`
- **データ取得**: [SWR](https://swr.vercel.app/) をクライアント側のデータ取得に使用
- **コード品質**:
  - [Biome](https://biomejs.dev/) をリンティングとフォーマットに使用
  - [ESLint](https://eslint.org/) with Next.js config
- **パッケージマネージャー**: pnpm（推奨）

## はじめに

### 前提条件

- **Node.js**: 18 以上
- **パッケージマネージャー**: pnpm（推奨）、npm、yarn、または bun

### インストール

#### pnpm を使用する場合（推奨）

```bash
# 依存関係をインストール
pnpm install
```

#### 手動インストール

Next.js と React を手動でインストールする場合：

```bash
pnpm i next@latest react@latest react-dom@latest
```

### 開発

開発サーバーを起動します：

```bash
pnpm dev
# または
npm run dev
# または
yarn dev
# または
bun dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて結果を確認してください。

`src/app/page.tsx` を編集することでページの編集を開始できます。ファイルを編集すると、ページが自動的に更新されます。

### ビルド

本番環境用にアプリケーションをビルドします：

```bash
pnpm build
```

これにより、`.next` フォルダに最適化された本番ビルドが作成されます。

### 本番環境

本番サーバーを起動します：

```bash
pnpm start
```

これにより Next.js の本番サーバーが起動します。先に `pnpm build` を実行してください。

### コード品質

#### リンティング

コードのリンティングエラーをチェックします：

```bash
pnpm lint
```

これにより、`./src` ディレクトリ内のコード品質の問題を Biome でチェックします。

#### フォーマット

コードを自動的にフォーマットします：

```bash
pnpm format
```

これにより、`./src` ディレクトリ内のコードを Biome フォーマッターで自動的にフォーマットします。

## 環境変数

このプロジェクトでは、microCMS との統合のために環境変数が必要です。

### 必要な変数

- `MICROCMS_SERVICE_DOMAIN`: microCMS のサービスドメイン
- `MICROCMS_API_KEY`: microCMS の API キー

### 開発環境

ルートディレクトリに `.env.local` ファイルを作成します：

```env
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

`.env.local` ファイルは Next.js によって自動的に読み込まれ、git では無視されます。

### 本番環境

#### Vercel

1. [Vercel Dashboard](https://vercel.com/dashboard) でプロジェクト設定に移動します
2. **Settings** → **Environment Variables** に移動します
3. 以下の環境変数を追加します：
   - `MICROCMS_SERVICE_DOMAIN`: microCMS のサービスドメイン
   - `MICROCMS_API_KEY`: microCMS の API キー
4. これらの変数を利用可能にする環境（Production、Preview、Development）を選択します
5. 変更を反映するためにアプリケーションを再デプロイします

#### その他のホスティングプラットフォーム

- **AWS Amplify**: Amplify Console → App settings → Environment variables を使用
- **Netlify**: Site settings → Environment variables
- **Railway**: Project settings → Variables
- **Docker/Server**: コンテナ/サーバー設定で環境変数を設定するか、`.env` ファイルを使用（このファイルはコミットしないでください）

> **重要**: `.env.local` や実際の API キーを含むファイルをバージョン管理にコミットしないでください。これらのファイルは既に `.gitignore` に含まれています。

## プロジェクト構造

このプロジェクトは、機能と関心事ごとに整理された Next.js App Router の推奨ディレクトリ構造に従っています。

```
.
├─ app/
│ ├─ (public)/
│ │ ├─ layout.tsx
│ │ └─ page.tsx
│ │
│ ├─ (admin)/
│ │ ├─ layout.tsx
│ │ └─ page.tsx
│ │
│ ├─ api/
│ │ └─ posts/
│ │   └─ route.ts
│ │
│ ├─ globals.css
│ ├─ layout.tsx
│ ├─ page.tsx
│ ├─ not-found.tsx
│ └─ error.tsx
│
├─ components/
│ ├─ ui/
│ │ ├─ Button.tsx
│ │ └─ Modal.tsx
│ │
│ ├─ layout/
│ │ ├─ Header.tsx
│ │ └─ Footer.tsx
│ │
│ └─ common/
│   └─ Loading.tsx
│
├─ features/
│ └─ posts/
│   ├─ components/
│   │ └─ PostCard.tsx
│   ├─ hooks/
│   │ └─ usePosts.ts
│   ├─ services/
│   │ └─ postService.ts
│   └─ types.ts
│
├─ libs/
│ ├─ microcms.ts
│ ├─ fetcher.ts
│ └─ constants.ts
│
├─ hooks/
│ └─ useMediaQuery.ts
│
├─ styles/
│ └─ variables.css
│
├─ types/
│ └─ index.ts
│
├─ public/
│ ├─ images/
│ └─ icons/
│
├─ .env.local
├─ next.config.ts
├─ tsconfig.json
├─ package.json
└─ biome.json / eslint.config.mjs
```

### ディレクトリの役割

#### `app/`

Next.js App Router のルーティングの中心です。このディレクトリには以下が含まれます：

- **Route Groups**: `(public)` や `(admin)` のように括弧で囲まれたディレクトリは Route Groups です。URL 構造には影響しませんが、異なるレイアウトでルートを整理できます。
- **API Routes**: `api/` ディレクトリ内のファイルは API エンドポイントを作成します。例えば、`api/posts/route.ts` は `/api/posts` にエンドポイントを作成します。
- **特別なファイル**:
  - `layout.tsx`: すべてのページをラップするルートレイアウトコンポーネント
  - `page.tsx`: ホームページコンポーネント
  - `not-found.tsx`: カスタム 404 ページ
  - `error.tsx`: エラーバウンダリーコンポーネント
  - `globals.css`: グローバルスタイル

#### `components/`

ドメイン非依存の再利用可能な UI コンポーネントです。目的別に整理されています：

- **`ui/`**: ボタン、モーダル、入力などの基本的な UI コンポーネント
- **`layout/`**: ヘッダー、フッター、サイドバーなどのレイアウト関連コンポーネント
- **`common/`**: ローディングスピナー、エラーメッセージなどの共通ユーティリティコンポーネント

これらのコンポーネントには、特定の機能に固有のビジネスロジックを含めるべきではありません。

#### `features/`

機能ベースの組織（ドメインベースのアーキテクチャ）です。各機能は自己完結型で、以下を含みます：

- **`components/`**: 機能固有のコンポーネント（例：`PostCard.tsx`）
- **`hooks/`**: 機能固有のカスタムフック（例：`usePosts.ts`）
- **`services/`**: 機能固有のサービス関数（例：`postService.ts`）
- **`api/`**: サーバー側のデータ取得関数
- **`types.ts`**: 機能固有の TypeScript 型

機能の例：`posts`、`auth`、`profile`、`hello`。

この構造は、プロジェクトが成長しても拡張しやすく、機能を独立して保守・テストしやすくなります。

#### `libs/`

アプリケーション全体で使用できる外部サービスと共有ロジック：

- **`microcms.ts`**: microCMS クライアント設定とユーティリティ
- **`fetcher.ts`**: HTTP クライアントユーティリティと fetch ラッパー
- **`constants.ts`**: アプリケーション全体の定数と設定値
- **`client.ts`**: microCMS クライアントインスタンスの作成

これらは特定の機能に属さないインフラストラクチャレベルのユーティリティです。

#### `hooks/`

複数の機能で使用できる再利用可能なカスタム React フック：

- **`useMediaQuery.ts`**: レスポンシブデザインのブレークポイント用のフック
- 機能固有でないその他のユーティリティフック

#### `types/`

複数の機能またはアプリケーション全体で使用されるグローバルな TypeScript 型定義です。これは、`features/{feature}/types.ts` に配置すべき機能固有の型とは異なります。

#### `public/`

Next.js によって直接提供される静的ファイル：

- **`images/`**: 画像アセット
- **`icons/`**: アイコンファイル
- フォント、ドキュメントなどのその他の静的アセット

このディレクトリ内のファイルは、ルート URL でアクセス可能です（例：`/images/logo.png`）。

#### 設定ファイル

- **`next.config.ts`**: Next.js の設定
- **`tsconfig.json`**: TypeScript の設定
- **`biome.json`**: Biome リターとフォーマッターの設定
- **`eslint.config.mjs`**: ESLint の設定
- **`package.json`**: プロジェクトの依存関係とスクリプト
- **`.env.local`**: ローカル環境変数（git にはコミットされません）

## アーキテクチャの注意事項

### microCMS 統合

このプロジェクトは microCMS をヘッドレス CMS として使用しています。重要なアーキテクチャ上の決定：

- **Server Components**: Server Components で `getHello()` または類似の関数を直接使用して microCMS からデータを取得します
- **Client Components**: Client Components で `microcms-js-sdk` を直接使用しないでください。代わりに、API ルート（`/api/*`）を使用してデータを取得します
- **API Routes**: `app/api/` に API ルートを作成して、microCMS データをクライアントコンポーネントに安全に公開します
- **Environment Variables**: microCMS の認証情報は環境変数に保存され、サーバー側でのみアクセスされます

microCMS を使用した機能の実装例の詳細については、`docs/hello-feature.md` を参照してください。

### データ取得

- **Server Components**: Server Components で async/await を直接使用してデータを取得します
- **Client Components**: キャッシュと再検証を備えたクライアント側のデータ取得に SWR を使用します
- **API Routes**: クライアント側のデータアクセス用に `app/api/` に RESTful エンドポイントを作成します

## デプロイ

### Vercel

Next.js アプリをデプロイする最も簡単な方法は、Next.js の作成者による [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) を使用することです。

**手順：**

1. コードを Git リポジトリ（GitHub、GitLab、または Bitbucket）にプッシュします
2. [Vercel](https://vercel.com/new) でリポジトリをインポートします
3. Vercel ダッシュボードで環境変数を設定します
4. デプロイします

Vercel は自動的に以下を実行します：

- Next.js を検出してビルド設定を構成します
- デプロイ中に `pnpm build`（または同等のコマンド）を実行します
- アプリケーションを本番環境用に最適化します
- プルリクエストのプレビューデプロイを提供します

詳細については、[Next.js デプロイメントドキュメント](https://nextjs.org/docs/app/building-your-application/deploying) を確認してください。

### その他のプラットフォーム

Next.js はさまざまなプラットフォームにデプロイできます：

- **AWS Amplify**: CI/CD を備えたフルスタックデプロイ
- **Netlify**: Vercel と同様で、自動デプロイを備えています
- **Railway**: 環境変数管理を備えたシンプルなデプロイ
- **Docker**: アプリをコンテナ化してどこにでもデプロイ
- **セルフホスティング**: 独自のサーバーで `pnpm build && pnpm start` を実行

## 詳細情報

Next.js の詳細については、以下のリソースを参照してください：

- [Next.js ドキュメント](https://nextjs.org/docs) - Next.js の機能と API について学ぶ
- [Learn Next.js](https://nextjs.org/learn) - インタラクティブな Next.js チュートリアル
- [Next.js GitHub リポジトリ](https://github.com/vercel/next.js) - フィードバックと貢献を歓迎します！

### 追加リソース

- [Next.js App Router ドキュメント](https://nextjs.org/docs/app) - App Router の包括的なガイド
- [React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components) - Server Components について学ぶ
- [Tailwind CSS ドキュメント](https://tailwindcss.com/docs) - ユーティリティファーストの CSS フレームワーク
- [microCMS ドキュメント](https://document.microcms.io/) - ヘッドレス CMS ドキュメント
- [SWR ドキュメント](https://swr.vercel.app/) - データ取得ライブラリ
- [Biome ドキュメント](https://biomejs.dev/) - 高速なフォーマッターとリター

## 参考資料

- [推奨ディレクトリ構成（Next.js App Router）](https://zenn.dev/yodaka/articles/eca2d4bf552aeb) - Next.js App Router の推奨ディレクトリ構造
