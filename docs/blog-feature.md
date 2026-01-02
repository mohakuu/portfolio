# Blog Feature 実装ドキュメント

## 概要

このドキュメントでは、microCMSを利用したブログ機能の実装内容と使い方について説明します。
この機能は、記事の一覧表示、詳細表示、タグフィルタリング、検索、ページネーションなどの基本的なブログ機能を提供します。

## アーキテクチャ

この機能は、Next.jsのApp RouterとServer Componentsを活用して実装されています。
すべてのデータ取得はサーバー側で行われ、SEOに最適化された静的生成と動的レンダリングをサポートしています。

### 重要な原則

⚠️ **データ取得について**

- **すべてのデータ取得はサーバー側で実行されます**
- Server Componentsから直接`getList()`や`getDetail()`などの関数を呼び出します
- クライアント側からmicroCMSに直接アクセスすることはありません
- これは、APIキーなどの機密情報をクライアント側に露出させないためです

## ファイル構成

```
src/
├── features/
│   └── blog/
│       ├── api/
│       │   ├── get-articles.ts    # 記事一覧・詳細取得関数
│       │   └── get-tags.ts        # タグ一覧・詳細取得関数
│       ├── components/
│       │   ├── Article.tsx        # 記事詳細コンポーネント
│       │   ├── ArticleList.tsx    # 記事一覧コンポーネント
│       │   ├── ArticleListItem.tsx # 記事リストアイテムコンポーネント
│       │   ├── TagList.tsx        # タグリストコンポーネント
│       │   ├── TagListItem.tsx    # タグアイテムコンポーネント
│       │   └── Profile.tsx         # ライタープロフィールコンポーネント
│       └── types.ts               # ブログ関連の型定義
├── components/
│   ├── layout/
│   │   ├── Header.tsx             # ヘッダーコンポーネント
│   │   ├── Footer.tsx             # フッターコンポーネント
│   │   └── Nav.tsx                # ナビゲーションコンポーネント（検索・タグ）
│   ├── common/
│   │   ├── Pagination.tsx        # ページネーションコンポーネント
│   │   └── Date.tsx               # 日付表示コンポーネント
│   └── ui/
│       └── SearchField.tsx        # 検索フィールドコンポーネント
├── app/
│   ├── page.tsx                   # トップページ（記事一覧）
│   ├── articles/
│   │   └── [slug]/
│   │       └── page.tsx           # 記事詳細ページ
│   ├── p/
│   │   └── [current]/
│   │       └── page.tsx           # ページネーションページ
│   ├── search/
│   │   ├── page.tsx               # 検索結果ページ
│   │   └── p/
│   │       └── [current]/
│   │           └── page.tsx       # 検索結果のページネーション
│   └── tags/
│       └── [tagId]/
│           ├── page.tsx           # タグ別記事一覧
│           └── p/
│               └── [current]/
│                   └── page.tsx   # タグ別記事のページネーション
└── libs/
    ├── client.ts                  # microCMSクライアント設定
    ├── utils.ts                   # ユーティリティ関数（日付フォーマット、リッチテキスト処理）
    └── constants.ts                # アプリケーション全体の定数（LIMIT = 10）
```

## 実装詳細

### 1. 型定義 (`src/features/blog/types.ts`)

ブログ機能で使用する型定義です。

```typescript
// タグの型定義
export type Tag = {
  name: string;
} & MicroCMSContentId & MicroCMSDate;

// ライターの型定義
export type Writer = {
  name: string;
  profile: string;
  image?: MicroCMSImage;
} & MicroCMSContentId & MicroCMSDate;

// ブログの型定義
export type Blog = {
  title: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
  tags?: Tag[];
  writer?: Writer;
};

export type Article = Blog & MicroCMSContentId & MicroCMSDate;
```

### 2. 記事取得関数 (`src/features/blog/api/get-articles.ts`)

記事の一覧と詳細を取得する関数です。

```typescript
import { client } from "@/libs/client";
import { notFound } from "next/navigation";
import type { Blog } from "../types";

// ブログ一覧を取得
export const getList = async (queries?: MicroCMSQueries) => {
  const listData = await client
    .getList<Blog>({
      endpoint: "blog",
      queries,
    })
    .catch(notFound);
  return listData;
};

// ブログの詳細を取得
export const getDetail = async (
  contentId: string,
  queries?: MicroCMSQueries,
) => {
  const detailData = await client
    .getListDetail<Blog>({
      endpoint: "blog",
      contentId,
      queries,
    })
    .catch(notFound);
  return detailData;
};
```

**用途**: 
- `getList()`: 記事一覧ページ、検索結果ページ、タグ別記事一覧ページで使用
- `getDetail()`: 記事詳細ページで使用

**パラメータ**:
- `queries`: microCMSのクエリパラメータ（`limit`, `offset`, `filters`, `q`など）

### 3. タグ取得関数 (`src/features/blog/api/get-tags.ts`)

タグの一覧と詳細を取得する関数です。

```typescript
import { client } from "@/libs/client";
import { notFound } from "next/navigation";
import type { Tag } from "../types";

// タグの一覧を取得
export const getTagList = async (queries?: MicroCMSQueries) => {
  const listData = await client
    .getList<Tag>({
      endpoint: "tags",
      queries,
    })
    .catch(notFound);
  return listData;
};

// タグの詳細を取得
export const getTag = async (contentId: string, queries?: MicroCMSQueries) => {
  const detailData = await client
    .getListDetail<Tag>({
      endpoint: "tags",
      contentId,
      queries,
    })
    .catch(notFound);
  return detailData;
};
```

**用途**:
- `getTagList()`: ナビゲーションにタグ一覧を表示するために使用
- `getTag()`: タグ別記事一覧ページでタグ名を表示するために使用

### 4. ユーティリティ関数 (`src/libs/utils.ts`)

日付フォーマットとリッチテキスト処理を行う関数です。

```typescript
import { formatInTimeZone } from "date-fns-tz";
import { load } from "cheerio";
import hljs from "highlight.js";

// 日付をフォーマット
export const formatDate = (date: string) => {
  return formatInTimeZone(new Date(date), "Asia/Tokyo", "d MMMM, yyyy");
};

// リッチテキストを処理（コードハイライトなど）
export const formatRichText = (richText: string) => {
  const $ = load(richText, null, false);
  const highlight = (text: string, lang?: string) => {
    if (!lang) return hljs.highlightAuto(text);
    try {
      return hljs.highlight(text, {
        language: lang?.replace(/^language-/, "") || "",
      });
    } catch (e) {
      return hljs.highlightAuto(text);
    }
  };
  $("pre code").each((_, elm) => {
    const lang = $(elm).attr("class");
    const res = highlight($(elm).text(), lang);
    $(elm).html(res.value);
  });
  return $.html();
};
```

**用途**:
- `formatDate()`: 記事の公開日を表示する際に使用
- `formatRichText()`: 記事の本文を表示する際に、コードブロックをハイライト表示するために使用

### 5. 定数 (`src/libs/constants.ts`)

アプリケーション全体で使用する定数です。

```typescript
// 1ページの表示件数
export const LIMIT = 10;
```

**用途**: ページネーションで1ページあたりの表示件数を定義

## ページ構成

### 1. トップページ (`src/app/page.tsx`)

記事一覧を表示するページです。

```typescript
import { getList } from "@/features/blog/api/get-articles";
import { LIMIT } from "@/libs/constants";
import Pagination from "@/components/common/Pagination";
import ArticleList from "@/features/blog/components/ArticleList";

export default async function Page() {
  const data = await getList({
    limit: LIMIT,
  });
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} />
    </div>
  );
}
```

**URL**: `/`

### 2. 記事詳細ページ (`src/app/articles/[slug]/page.tsx`)

個別の記事を表示するページです。

```typescript
import { Metadata } from "next";
import { getDetail } from "@/features/blog/api/get-articles";
import Article from "@/features/blog/components/Article";

export async function generateMetadata(props: Props): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const data = await getDetail(params.slug, {
    draftKey: searchParams.dk,
  });

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [data?.thumbnail?.url || ""],
    },
  };
}

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const data = await getDetail(params.slug, {
    draftKey: searchParams.dk,
  });

  return <Article data={data} />;
}
```

**URL**: `/articles/[slug]`
**機能**:
- 記事の詳細を表示
- 下書きプレビュー対応（`?dk=draftKey`パラメータ）

### 3. ページネーションページ (`src/app/p/[current]/page.tsx`)

記事一覧のページネーションを表示するページです。

```typescript
import { getList } from "@/features/blog/api/get-articles";
import { LIMIT } from "@/libs/constants";
import Pagination from "@/components/common/Pagination";
import ArticleList from "@/features/blog/components/ArticleList";

export default async function Page(props: Props) {
  const params = await props.params;
  const current = parseInt(params.current as string, 10);
  const data = await getList({
    limit: LIMIT,
    offset: LIMIT * (current - 1),
  });
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} current={current} />
    </div>
  );
}
```

**URL**: `/p/[current]`

### 4. 検索結果ページ (`src/app/search/page.tsx`)

検索クエリに基づいて記事を表示するページです。

```typescript
import { getList } from "@/features/blog/api/get-articles";
import ArticleList from "@/features/blog/components/ArticleList";
import Pagination from "@/components/common/Pagination";

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const data = await getList({
    q: searchParams.q,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <ArticleList articles={data.contents} />
      <Pagination
        totalCount={data.totalCount}
        basePath="/search"
        q={searchParams.q}
      />
    </div>
  );
}
```

**URL**: `/search?q=検索クエリ`

### 5. タグ別記事一覧ページ (`src/app/tags/[tagId]/page.tsx`)

特定のタグが付いた記事を表示するページです。

```typescript
import { getList } from "@/features/blog/api/get-articles";
import { getTag } from "@/features/blog/api/get-tags";
import { LIMIT } from "@/libs/constants";
import Pagination from "@/components/common/Pagination";
import ArticleList from "@/features/blog/components/ArticleList";

export default async function Page(props: Props) {
  const params = await props.params;
  const { tagId } = params;
  const data = await getList({
    limit: LIMIT,
    filters: `tags[contains]${tagId}`,
  });
  const tag = await getTag(tagId);
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
        #{tag.name}
      </h1>
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} basePath={`/tags/${tagId}`} />
    </div>
  );
}
```

**URL**: `/tags/[tagId]`

## コンポーネント構成

### レイアウトコンポーネント (`src/components/layout/`)

#### Header.tsx
サイトのヘッダーを表示するコンポーネントです。

#### Footer.tsx
サイトのフッターを表示するコンポーネントです。

#### Nav.tsx
ナビゲーションを表示するコンポーネントです。検索フィールドとタグリストを含みます。

```typescript
import type { Tag } from "@/features/blog/types";
import TagList from "@/features/blog/components/TagList";
import SearchField from "@/components/ui/SearchField";

type Props = {
  tags: Tag[];
};

export default function Nav({ tags }: Props) {
  return (
    <nav>
      <SearchField />
      <TagList tags={tags} />
    </nav>
  );
}
```

### 共通コンポーネント (`src/components/common/`)

#### Pagination.tsx
ページネーションを表示するコンポーネントです。

```typescript
type Props = {
  totalCount: number;
  current?: number;
  basePath?: string;
  q?: string;
};
```

**用途**: 記事一覧、検索結果、タグ別記事一覧のページネーションに使用

#### Date.tsx
日付を表示するコンポーネントです。

```typescript
type Props = {
  date: string;
};
```

**用途**: 記事の公開日を表示する際に使用

### UIコンポーネント (`src/components/ui/`)

#### SearchField.tsx
検索フィールドを表示するクライアントコンポーネントです。

```typescript
"use client";

export default function SearchField() {
  // Enterキーで検索ページに遷移
  // ...
}
```

**用途**: ナビゲーションに配置され、記事を検索するために使用

### ブログ固有コンポーネント (`src/features/blog/components/`)

#### Article.tsx
記事の詳細を表示するコンポーネントです。

**表示内容**:
- タイトル
- タグリスト
- 説明
- ライター情報と公開日
- サムネイル画像
- 本文（リッチテキスト、コードハイライト対応）
- ライタープロフィール

#### ArticleList.tsx
記事一覧を表示するコンポーネントです。

```typescript
type Props = {
  articles?: Article[];
};
```

#### ArticleListItem.tsx
記事リストの各アイテムを表示するコンポーネントです。

**表示内容**:
- サムネイル画像
- タイトル
- 説明
- タグリスト
- 公開日

#### TagList.tsx
タグリストを表示するコンポーネントです。

```typescript
type Props = {
  tags?: Tag[];
  hasLink?: boolean;
};
```

#### TagListItem.tsx
タグアイテムを表示するコンポーネントです。

```typescript
type Props = {
  tag: Tag;
  hasLink?: boolean;
};
```

#### Profile.tsx
ライタープロフィールを表示するコンポーネントです。

```typescript
type Props = {
  writer?: Writer;
};
```

## 使い方

### 基本的な使用例

#### 記事一覧を表示

```typescript
import { getList } from "@/features/blog/api/get-articles";
import { LIMIT } from "@/libs/constants";
import ArticleList from "@/features/blog/components/ArticleList";

export default async function MyPage() {
  const data = await getList({
    limit: LIMIT,
  });
  return <ArticleList articles={data.contents} />;
}
```

#### 記事詳細を表示

```typescript
import { getDetail } from "@/features/blog/api/get-articles";
import Article from "@/features/blog/components/Article";

export default async function MyPage({ params }: { params: { slug: string } }) {
  const data = await getDetail(params.slug);
  return <Article data={data} />;
}
```

#### タグでフィルタリング

```typescript
import { getList } from "@/features/blog/api/get-articles";

export default async function MyPage({ params }: { params: { tagId: string } }) {
  const data = await getList({
    filters: `tags[contains]${params.tagId}`,
  });
  return <ArticleList articles={data.contents} />;
}
```

#### 検索

```typescript
import { getList } from "@/features/blog/api/get-articles";

export default async function MyPage({ searchParams }: { searchParams: { q?: string } }) {
  const data = await getList({
    q: searchParams.q,
  });
  return <ArticleList articles={data.contents} />;
}
```

## データフロー

### 記事一覧ページの場合

```
page.tsx (Server Component)
  ↓
getList() (src/features/blog/api/get-articles.ts)
  ↓
client.getList() (src/libs/client.ts)
  ↓
microCMS API
  ↓
ArticleList Component
  ↓
ArticleListItem Components
```

### 記事詳細ページの場合

```
page.tsx (Server Component)
  ↓
getDetail() (src/features/blog/api/get-articles.ts)
  ↓
client.getListDetail() (src/libs/client.ts)
  ↓
microCMS API
  ↓
Article Component
  ↓
formatRichText() (src/libs/utils.ts) - コードハイライト処理
```

## microCMSの設定

### 必要なAPIエンドポイント

1. **blog** - ブログ記事用のエンドポイント
   - フィールド:
     - `title` (テキストフィールド)
     - `description` (テキストエリア)
     - `content` (リッチエディタ)
     - `thumbnail` (画像)
     - `tags` (コンテンツ参照 - tags)
     - `writer` (コンテンツ参照 - writers)

2. **tags** - タグ用のエンドポイント
   - フィールド:
     - `name` (テキストフィールド)

3. **writers** (オプション) - ライター用のエンドポイント
   - フィールド:
     - `name` (テキストフィールド)
     - `profile` (テキストエリア)
     - `image` (画像)

### 環境変数

`.env.local`ファイルに以下を設定してください：

```env
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
BASE_URL=http://localhost:3000
```

## スタイリング

この機能はTailwind CSSを使用してスタイリングされています。

- **ダークモード対応**: `dark:`プレフィックスを使用
- **レスポンシブデザイン**: `sm:`, `md:`, `lg:`などのブレークポイントを使用
- **コードハイライト**: highlight.jsを使用（`hybrid`テーマ）

## セキュリティに関する注意事項

### ⚠️ 重要な注意点

1. **microcms-js-sdkはサーバー側でのみ使用**
   - APIキーなどの機密情報がクライアント側に露出するのを防ぐため
   - すべてのデータ取得はServer Componentsで実行されます

2. **エラーハンドリング**
   - `notFound()`を使用して、存在しないコンテンツの場合は404ページを表示
   - 適切なエラーハンドリングを実装しています

3. **下書きプレビュー**
   - 下書き状態のコンテンツをプレビューするために、`draftKey`パラメータを使用
   - microCMS管理画面で画面プレビューの設定が必要です

## 参考資料

- [microCMS ドキュメント](https://document.microcms.io/)
- [Next.js App Router ドキュメント](https://nextjs.org/docs/app)
- [Tailwind CSS ドキュメント](https://tailwindcss.com/docs)
- [highlight.js ドキュメント](https://highlightjs.org/)

