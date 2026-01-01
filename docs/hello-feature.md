# Hello Feature 実装ドキュメント

## 概要

このドキュメントでは、microCMSからデータを取得して表示するHello機能の実装内容と使い方について説明します。
Hello機能は実装の参考にしてください。

## アーキテクチャ

この機能は、Next.jsのサーバーコンポーネントとクライアントコンポーネントの両方からmicroCMSのデータを取得する方法を実装しています。

### 重要な原則

⚠️ **microCMSのクライアント側からの直接呼び出しについて**

- **microcms-js-sdkはクライアント側では直接使用しません**
- クライアント側からmicroCMSにアクセスする場合は、必ずAPIルート（`/api/hello`）経由でアクセスします
- これは、APIキーなどの機密情報をクライアント側に露出させないためです
- サーバー側（Server Components）では、`getHello()`関数を直接使用してmicroCMSからデータを取得できます

## ファイル構成

```
src/
├── features/
│   └── hello/
│       ├── api/
│       │   └── get-hello.ts      # サーバー側用のデータ取得関数
│       ├── ClientHello.tsx       # クライアントコンポーネント
│       └── ServerHello.tsx       # サーバーコンポーネント
├── app/
│   └── api/
│       └── hello/
│           └── route.ts          # APIルート（クライアント側からのアクセス用）
└── libs/
    └── client.ts                 # microCMSクライアント設定
```

## 実装詳細

### 1. microCMSクライアント設定 (`src/libs/client.ts`)

microCMSのクライアントインスタンスを作成します。このファイルはサーバー側でのみ使用されます。

```typescript
import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "domain",
  apiKey: "key",
});
```

### 2. データ取得関数 (`src/features/hello/api/get-hello.ts`)

サーバーコンポーネントから直接呼び出すための関数です。

```typescript
import { client } from "@/libs/client";

export interface IHello {
  text: string;
}

// Server Component から直接呼ぶ用
export async function getHello(): Promise<IHello> {
  return client.get<IHello>({ endpoint: "hello" });
}
```

**用途**: サーバーコンポーネント（`ServerHello.tsx`）から直接呼び出して使用します。

### 3. APIルート (`src/app/api/hello/route.ts`)

クライアント側からのアクセス用のAPIエンドポイントです。

```typescript
import { NextResponse } from "next/server";
import type { IHello } from "@/features/hello/api/get-hello";
import { client } from "@/libs/client";

export async function GET() {
  try {
    const data: IHello = await client.get({ endpoint: "hello" });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data from microCMS:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
```

**用途**: クライアントコンポーネント（`ClientHello.tsx`）からこのエンドポイントを経由してデータを取得します。

### 4. サーバーコンポーネント (`src/features/hello/ServerHello.tsx`)

サーバー側でレンダリングされるコンポーネントです。microCMSから直接データを取得します。

```typescript
import { getHello } from "./api/get-hello";

export const ServerHello = async () => {
  const serverData = await getHello();

  return (
    <div>
      <h2>Server Side: {serverData.text}</h2>
    </div>
  );
};
```

**特徴**:
- `async`関数として定義
- `getHello()`を直接呼び出してmicroCMSからデータを取得
- サーバー側でレンダリングされるため、初期HTMLに含まれる

### 5. クライアントコンポーネント (`src/features/hello/ClientHello.tsx`)

クライアント側で動作するコンポーネントです。SWRを使用してAPIルート経由でデータを取得します。

```typescript
"use client";

import useSWR from "swr";
import type { IHello } from "./api/get-hello";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const ClientHello = () => {
  const { data, error } = useSWR<IHello>("/api/hello", fetcher);

  if (error) return <div>Client Error loading data</div>;
  if (!data) return <div>Client Loading...</div>;

  return <div>Client Side: {data.text}</div>;
};
```

**特徴**:
- `"use client"`ディレクティブでクライアントコンポーネントとしてマーク
- SWRを使用してデータフェッチングとキャッシングを実現
- `/api/hello`エンドポイント経由でデータを取得（microCMSに直接アクセスしない）
- エラーハンドリングとローディング状態を実装

## 使い方

### 基本的な使用例

```typescript
import { ClientHello } from "@/features/hello/ClientHello";
import { ServerHello } from "@/features/hello/ServerHello";

export default async function Home() {
  return (
    <div>
      <ServerHello />
      <ClientHello />
    </div>
  );
}
```

### サーバーコンポーネントでの使用

サーバーコンポーネントでは、`getHello()`関数を直接呼び出して使用できます。

```typescript
import { getHello } from "@/features/hello/api/get-hello";

export const MyServerComponent = async () => {
  const data = await getHello();
  return <div>{data.text}</div>;
};
```

### クライアントコンポーネントでの使用

クライアントコンポーネントでは、必ずAPIルート経由でデータを取得します。

```typescript
"use client";

import useSWR from "swr";
import type { IHello } from "@/features/hello/api/get-hello";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const MyClientComponent = () => {
  const { data } = useSWR<IHello>("/api/hello", fetcher);
  // ...
};
```

## データフロー

### サーバーコンポーネントの場合

```
ServerHello.tsx
  ↓
getHello() (src/features/hello/api/get-hello.ts)
  ↓
client.get() (src/libs/client.ts)
  ↓
microCMS API
```

### クライアントコンポーネントの場合

```
ClientHello.tsx
  ↓
SWR → fetch("/api/hello")
  ↓
/api/hello/route.ts
  ↓
client.get() (src/libs/client.ts)
  ↓
microCMS API
```

## セキュリティに関する注意事項

### ⚠️ 重要な注意点

1. **microcms-js-sdkはクライアント側では使用しない**
   - APIキーなどの機密情報がクライアント側に露出するのを防ぐため
   - クライアント側からmicroCMSにアクセスする場合は、必ずAPIルート経由でアクセスしてください

2. **エラーハンドリング**
   - APIルートでは適切なエラーハンドリングを実装してください
   - クライアント側でもエラー状態を適切に処理してください


