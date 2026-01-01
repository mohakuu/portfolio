# Portfolio Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Tech Stack

This project uses the following technologies:

- **Framework**: [Next.js 16.1.1](https://nextjs.org/) with App Router
- **React**: 19.2.3
- **TypeScript**: ^5
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **CMS**: [microCMS](https://microcms.io/) via `microcms-js-sdk`
- **Data Fetching**: [SWR](https://swr.vercel.app/) for client-side data fetching
- **Code Quality**:
  - [Biome](https://biomejs.dev/) for linting and formatting
  - [ESLint](https://eslint.org/) with Next.js config
- **Package Manager**: pnpm (recommended)

## Getting Started

### Prerequisites

- **Node.js**: 18 or higher
- **Package Manager**: pnpm (recommended), npm, yarn, or bun

### Installation

#### Using pnpm (Recommended)

```bash
# Install dependencies
pnpm install
```

#### Manual Installation

If you need to install Next.js and React manually:

```bash
pnpm i next@latest react@latest react-dom@latest
```

### Development

Run the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

### Build

Build the application for production:

```bash
pnpm build
```

This creates an optimized production build in the `.next` folder.

### Production

Start the production server:

```bash
pnpm start
```

This starts the Next.js production server. Make sure to run `pnpm build` first.

### Code Quality

#### Linting

Check code for linting errors:

```bash
pnpm lint
```

This runs Biome to check for code quality issues in the `./src` directory.

#### Formatting

Format code automatically:

```bash
pnpm format
```

This runs Biome formatter to automatically format code in the `./src` directory.

## Environment Variables

This project requires environment variables for microCMS integration.

### Required Variables

- `MICROCMS_SERVICE_DOMAIN`: Your microCMS service domain
- `MICROCMS_API_KEY`: Your microCMS API key

### Development

Create a `.env.local` file in the root directory:

```env
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

The `.env.local` file is automatically loaded by Next.js and is ignored by git.

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

> **Important**: Never commit `.env.local` or any file containing actual API keys to version control. These files are already included in `.gitignore`.

## Project Structure

This project follows the recommended directory structure for Next.js App Router, organized by features and concerns.

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

### Directory Roles

#### `app/`

The routing center for Next.js App Router. This directory contains:

- **Route Groups**: Directories like `(public)` and `(admin)` wrapped in parentheses are Route Groups. They don't affect the URL structure but allow you to organize routes with different layouts.
- **API Routes**: Files in `api/` directories create API endpoints. For example, `api/posts/route.ts` creates an endpoint at `/api/posts`.
- **Special Files**:
  - `layout.tsx`: Root layout component that wraps all pages
  - `page.tsx`: Home page component
  - `not-found.tsx`: Custom 404 page
  - `error.tsx`: Error boundary component
  - `globals.css`: Global styles

#### `components/`

Reusable UI components that are domain-independent. Organized by purpose:

- **`ui/`**: Basic UI components like buttons, modals, inputs, etc.
- **`layout/`**: Layout-related components like headers, footers, sidebars
- **`common/`**: Common utility components like loading spinners, error messages

These components should not contain business logic specific to a particular feature.

#### `features/`

Feature-based organization (domain-based architecture). Each feature is self-contained with:

- **`components/`**: Feature-specific components (e.g., `PostCard.tsx`)
- **`hooks/`**: Feature-specific custom hooks (e.g., `usePosts.ts`)
- **`services/`**: Feature-specific service functions (e.g., `postService.ts`)
- **`api/`**: Server-side data fetching functions
- **`types.ts`**: Feature-specific TypeScript types

Examples of features: `posts`, `auth`, `profile`, `hello`.

This structure scales well as the project grows and makes it easier to maintain and test features independently.

#### `libs/`

External services and shared logic that can be used across the application:

- **`microcms.ts`**: microCMS client configuration and utilities
- **`fetcher.ts`**: HTTP client utilities and fetch wrappers
- **`constants.ts`**: Application-wide constants and configuration values
- **`client.ts`**: microCMS client instance creation

These are infrastructure-level utilities that don't belong to any specific feature.

#### `hooks/`

Reusable custom React hooks that can be used across multiple features:

- **`useMediaQuery.ts`**: Hook for responsive design breakpoints
- Other utility hooks that are not feature-specific

#### `types/`

Global TypeScript type definitions that are used across multiple features or throughout the application. This is different from feature-specific types which should live in `features/{feature}/types.ts`.

#### `public/`

Static files served directly by Next.js:

- **`images/`**: Image assets
- **`icons/`**: Icon files
- Other static assets like fonts, documents, etc.

Files in this directory are accessible at the root URL (e.g., `/images/logo.png`).

#### Configuration Files

- **`next.config.ts`**: Next.js configuration
- **`tsconfig.json`**: TypeScript configuration
- **`biome.json`**: Biome linter and formatter configuration
- **`eslint.config.mjs`**: ESLint configuration
- **`package.json`**: Project dependencies and scripts
- **`.env.local`**: Local environment variables (not committed to git)

## Architecture Notes

### microCMS Integration

This project uses microCMS as a headless CMS. Important architectural decisions:

- **Server Components**: Use `getHello()` or similar functions directly in Server Components to fetch data from microCMS
- **Client Components**: Never use `microcms-js-sdk` directly in Client Components. Instead, use API routes (`/api/*`) to fetch data
- **API Routes**: Create API routes in `app/api/` to expose microCMS data to client components securely
- **Environment Variables**: microCMS credentials are stored in environment variables and only accessed on the server side

See `docs/hello-feature.md` for a detailed example of how to implement features with microCMS.

### Data Fetching

- **Server Components**: Fetch data directly using async/await in Server Components
- **Client Components**: Use SWR for client-side data fetching with caching and revalidation
- **API Routes**: Create RESTful endpoints in `app/api/` for client-side data access

## Deployment

### Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

**Steps:**

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository on [Vercel](https://vercel.com/new)
3. Configure environment variables in the Vercel dashboard
4. Deploy

Vercel will automatically:

- Detect Next.js and configure build settings
- Run `pnpm build` (or equivalent) during deployment
- Optimize your application for production
- Provide preview deployments for pull requests

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Other Platforms

Next.js can be deployed to various platforms:

- **AWS Amplify**: Full-stack deployment with CI/CD
- **Netlify**: Similar to Vercel, with automatic deployments
- **Railway**: Simple deployment with environment variable management
- **Docker**: Containerize your app and deploy anywhere
- **Self-hosted**: Run `pnpm build && pnpm start` on your own server

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

### Additional Resources

- [Next.js App Router Documentation](https://nextjs.org/docs/app) - comprehensive guide to the App Router
- [React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components) - learn about Server Components
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - utility-first CSS framework
- [microCMS Documentation](https://document.microcms.io/) - headless CMS documentation
- [SWR Documentation](https://swr.vercel.app/) - data fetching library
- [Biome Documentation](https://biomejs.dev/) - fast formatter and linter

## References

- [推奨ディレクトリ構成（Next.js App Router）](https://zenn.dev/yodaka/articles/eca2d4bf552aeb) - Recommended directory structure for Next.js App Router (Japanese)
