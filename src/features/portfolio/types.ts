// ポートフォリオの型定義
export type Portfolio = {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  createdAt: string;
  updatedAt: string;
};

