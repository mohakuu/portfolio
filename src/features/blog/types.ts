import type {
  MicroCMSContentId,
  MicroCMSDate,
  MicroCMSImage,
} from "microcms-js-sdk";

// ブログの型定義
export type Blog = {
  title: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
};

export type Article = Blog & MicroCMSContentId & MicroCMSDate;
