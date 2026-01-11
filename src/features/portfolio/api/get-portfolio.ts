import type { Portfolio } from "../types";

// モックデータ
const mockPortfolios: Portfolio[] = [
  {
    id: "1",
    title: "コーポレートサイト制作",
    description:
      "企業のブランディングを重視したコーポレートサイト。ユーザビリティとデザイン性を両立し、効果的な情報発信を実現しました。",
    image: "/no-image.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "WordPress"],
    githubUrl: "https://github.com/example/corporate-site",
    demoUrl: "https://corporate-demo.example.com",
    createdAt: "2024-01-15T00:00:00.000Z",
    updatedAt: "2024-01-15T00:00:00.000Z",
  },
  {
    id: "2",
    title: "Eコマースプラットフォーム",
    description:
      "Next.jsとStripeを使用したフルスタックのEコマースアプリケーション。商品管理、カート機能、決済処理を実装しました。",
    image: "/no-image.png",
    technologies: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    githubUrl: "https://github.com/example/ecommerce",
    demoUrl: "https://ecommerce-demo.example.com",
    createdAt: "2024-02-20T00:00:00.000Z",
    updatedAt: "2024-02-20T00:00:00.000Z",
  },
  {
    id: "3",
    title: "予約システム開発",
    description:
      "宿泊業向けの予約システム。HP内で予約完結できるため、予約サービスの費用を削減できます。",
    image: "/no-image.png",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
    githubUrl: "https://github.com/example/booking-system",
    demoUrl: "https://booking-demo.example.com",
    createdAt: "2024-03-10T00:00:00.000Z",
    updatedAt: "2024-03-10T00:00:00.000Z",
  },
  {
    id: "4",
    title: "タスク管理アプリ",
    description:
      "ReactとFirebaseを使用したリアルタイムタスク管理アプリケーション。チームでの共同作業をサポートします。",
    image: "/no-image.png",
    technologies: ["React", "Firebase", "TypeScript", "Material-UI"],
    githubUrl: "https://github.com/example/task-manager",
    demoUrl: "https://task-manager-demo.example.com",
    createdAt: "2024-04-05T00:00:00.000Z",
    updatedAt: "2024-04-05T00:00:00.000Z",
  },
  {
    id: "5",
    title: "ランディングページ制作",
    description:
      "SEO対策を徹底したランディングページ。モバイル対応も万全で、コンバージョン率の向上を実現しました。",
    image: "/no-image.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "SEO"],
    githubUrl: "https://github.com/example/landing-page",
    demoUrl: "https://landing-demo.example.com",
    createdAt: "2024-05-12T00:00:00.000Z",
    updatedAt: "2024-05-12T00:00:00.000Z",
  },
  {
    id: "6",
    title: "SNS運用管理ツール",
    description:
      "複数のSNSアカウントを一元管理できるツール。スケジュール投稿や分析機能を搭載しています。",
    image: "/no-image.png",
    technologies: ["Vue.js", "Node.js", "MongoDB", "OAuth"],
    githubUrl: "https://github.com/example/sns-manager",
    demoUrl: "https://sns-manager-demo.example.com",
    createdAt: "2024-06-18T00:00:00.000Z",
    updatedAt: "2024-06-18T00:00:00.000Z",
  },
];

// ポートフォリオ一覧を取得（モック）
export const getPortfolioList = async (): Promise<Portfolio[]> => {
  // モックなので、少し遅延を追加してAPIっぽくする
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockPortfolios;
};

// ポートフォリオの詳細を取得（モック）
export const getPortfolioDetail = async (
  id: string,
): Promise<Portfolio | null> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockPortfolios.find((portfolio) => portfolio.id === id) || null;
};
