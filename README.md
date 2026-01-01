This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Environment Variables

### Development

Create a `.env.local` file in the root directory:

```
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

### Production

#### Vercel

1. Go to your project settings on [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Settings** → **Environment Variables**
3. Add the following environment variables:
   - `MICROCMS_SERVICE_DOMAIN`: Your microCMS service domain
   - `MICROCMS_API_KEY`: Your microCMS API key
4. Select the environments (Production, Preview, Development) where these variables should be available
5. Redeploy your application for the changes to take effect

#### Other Hosting Platforms

- **AWS Amplify**: Use the Amplify Console → App settings → Environment variables
- **Netlify**: Site settings → Environment variables
- **Railway**: Project settings → Variables
- **Docker/Server**: Set environment variables in your container/server configuration or use a `.env` file (never commit this file)

**Important**: Never commit `.env.local` or any file containing actual API keys to version control.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Manual installation

```
pnpm i next@latest react@latest react-dom@latest
```

https://zenn.dev/yodaka/articles/eca2d4bf552aeb

推奨ディレクトリ構成（Next.js App Router）
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
│ │ └─ route.ts
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
│ └─ Loading.tsx
│
├─ features/
│ └─ posts/
│ ├─ components/
│ │ └─ PostCard.tsx
│ ├─ hooks/
│ │ └─ usePosts.ts
│ ├─ services/
│ │ └─ postService.ts
│ └─ types.ts
│
├─ lib/
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
├─ next.config.js
├─ tsconfig.json
├─ package.json
└─ biome.json / eslint.config.js

ディレクトリごとの役割
app/

ルーティングの中心（App Router）

(public) や (admin) は Route Group（URL に影響しない）

api/route.ts は API エンドポイント

components/

再利用可能な UI コンポーネント

ドメイン非依存なものを置く

features/

機能単位（ドメイン単位）

「posts」「auth」「profile」など

大きくなっても破綻しにくい

lib/

外部サービス・共通ロジック

microCMS / fetch / 設定値 など

hooks/

汎用カスタムフック

types/

グローバルで使う型定義

public/

静的ファイル（画像・favicon など）
