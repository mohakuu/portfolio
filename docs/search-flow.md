# 記事検索機能の動作フロー図

## 全体フロー

```
┌─────────────────────────────────────────────────────────────────┐
│                        クライアント側（ブラウザ）                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  1. SearchField.tsx (Client Component)                          │
│     - ユーザーが検索キーワードを入力                               │
│     - Enterキー押下を検知                                         │
│     - location.href = '/blog/search?q={検索キーワード}'           │
│     - ページ遷移を実行                                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    [HTTP Request]
                    GET /blog/search?q={検索キーワード}
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        サーバー側（Next.js）                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. blog/search/page.tsx (Server Component)                     │
│     - searchParamsから検索キーワード(q)を取得                     │
│     - generateMetadata()でメタデータを生成                        │
│     - ArticleListコンポーネントにqueries={q: searchParams.q}を渡す │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. ArticleList.tsx (Server Component)                         │
│     - getList({ limit: LIMIT, q: searchParams.q })を呼び出し    │
│     - 検索結果を待機                                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  4. get-articles.ts (Server Function)                           │
│     - client.getList({                                          │
│         endpoint: "blog",                                       │
│         queries: { q: searchParams.q, limit: LIMIT }          │
│       })を実行                                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    [HTTPS Request]
                    GET microCMS API
                    ?q={検索キーワード}&limit={LIMIT}
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    microCMS API (外部サービス)                     │
│     - 検索クエリ(q)で記事を検索                                    │
│     - 検索結果を返却                                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    [HTTPS Response]
                    { contents: [...], totalCount: N }
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  5. get-articles.ts                                             │
│     - microCMSからのレスポンスを受信                              │
│     - データを返却                                                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  6. ArticleList.tsx                                             │
│     - 検索結果が空の場合: EmptyStateを表示                        │
│     - 検索結果がある場合:                                         │
│       * ArticleListItemをリスト表示                              │
│       * Paginationコンポーネントを表示                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  7. blog/search/page.tsx                                        │
│     - ArticleListの結果をレンダリング                             │
│     - SearchFieldWithSuspenseを表示                               │
│     - HTMLを生成                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    [HTTP Response]
                    HTML (検索結果ページ)
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        クライアント側（ブラウザ）                    │
│     - 検索結果ページを表示                                        │
│     - SearchFieldに検索キーワードを表示                            │
└─────────────────────────────────────────────────────────────────┘
```

## 詳細フロー（コンポーネント別）

### クライアント側の処理

```
┌─────────────────────────────────────────────────────────────┐
│ SearchField.tsx (Client Component)                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. ユーザーが検索キーワードを入力                            │
│     ↓                                                       │
│  2. Enterキー押下を検知                                      │
│     ↓                                                       │
│  3. IME入力中(composing)でないことを確認                     │
│     ↓                                                       │
│  4. location.href = '/blog/search?q={検索キーワード}'        │
│     ↓                                                       │
│  5. ブラウザがページ遷移を実行                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### サーバー側の処理

```
┌─────────────────────────────────────────────────────────────┐
│ blog/search/page.tsx (Server Component)                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. searchParamsを取得                                       │
│     const searchParams = await props.searchParams;          │
│     ↓                                                       │
│  2. generateMetadata()でメタデータ生成                      │
│     title: "「{検索キーワード}」の検索結果"                   │
│     ↓                                                       │
│  3. ArticleListにqueriesを渡す                              │
│     <ArticleList                                            │
│       queries={{ q: searchParams.q }}                      │
│       basePath="/blog/search"                               │
│       q={searchParams.q}                                    │
│     />                                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ ArticleList.tsx (Server Component)                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. getList()を呼び出し                                      │
│     const data = await getList({                            │
│       limit: LIMIT,                                         │
│       q: queries.q                                          │
│     });                                                     │
│     ↓                                                       │
│  2. 検索結果をチェック                                       │
│     if (!data.contents || data.contents.length === 0)     │
│       → EmptyStateを表示                                     │
│     else                                                    │
│       → ArticleListItemをリスト表示                         │
│       → Paginationを表示                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ get-articles.ts (Server Function)                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. microCMSクライアントを使用                                │
│     import { client } from "@/libs/client";                 │
│     ↓                                                       │
│  2. getList()を実行                                          │
│     const listData = await client.getList<Blog>({           │
│       endpoint: "blog",                                     │
│       queries: {                                            │
│         q: queries.q,        // 検索キーワード               │
│         limit: queries.limit // 取得件数                     │
│       }                                                     │
│     });                                                     │
│     ↓                                                       │
│  3. エラーハンドリング                                        │
│     .catch(notFound);                                       │
│     ↓                                                       │
│  4. データを返却                                             │
│     return listData;                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ libs/client.ts                                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  microCMSクライアントの初期化                                 │
│  export const client = createClient({                       │
│    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,      │
│    apiKey: process.env.MICROCMS_API_KEY,                    │
│  });                                                        │
│                                                             │
│  ※ サーバー側でのみ実行される                                 │
│  ※ APIキーは環境変数から取得（クライアントに露出しない）      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## データフロー

```
ユーザー入力
    │
    ▼
[検索キーワード: "Next.js"]
    │
    ▼
SearchField.tsx
    │
    ▼
location.href = '/blog/search?q=Next.js'
    │
    ▼
HTTP Request: GET /blog/search?q=Next.js
    │
    ▼
blog/search/page.tsx
    │ searchParams.q = "Next.js"
    ▼
ArticleList.tsx
    │ queries = { q: "Next.js" }
    ▼
get-articles.ts
    │ client.getList({ endpoint: "blog", queries: { q: "Next.js" } })
    ▼
microCMS API
    │ GET https://{serviceDomain}.microcms.io/api/v1/blog?q=Next.js
    │
    ▼
Response: {
    contents: [
      { id: "1", title: "Next.js入門", ... },
      { id: "2", title: "Next.jsでブログ作成", ... },
      ...
    ],
    totalCount: 10
  }
    │
    ▼
get-articles.ts → ArticleList.tsx
    │
    ▼
ArticleListItem × N件
    │
    ▼
HTML Response
    │
    ▼
ブラウザに表示
```

## 重要なポイント

### セキュリティ

- ✅ **microCMS クライアントはサーバー側でのみ実行**
  - `libs/client.ts`の API キーは環境変数から取得
  - クライアント側に API キーが露出しない

### パフォーマンス

- ✅ **Server Components でデータ取得**
  - サーバー側でレンダリングされるため、初期 HTML に含まれる
  - SEO に最適化されている

### ユーザー体験

- ✅ **Suspense でローディング状態を管理**
  - `SearchFieldWithSuspense`でローディング中はプレースホルダーを表示

### エラーハンドリング

- ✅ **notFound()でエラー処理**
  - microCMS API でエラーが発生した場合、404 ページを表示
