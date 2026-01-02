import Image from "next/image";
import Link from "next/link";
import PublishedDate from "@/components/common/Date";
import { Article } from "../types";
import TagList from "./TagList";

type Props = {
  article: Article;
};

export default function ArticleListItem({ article }: Props) {
  return (
    <li className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <Link href={`/articles/${article.id}`} className="block">
        <div className="sm:flex">
          {article.thumbnail ? (
            <div className="relative h-48 w-full sm:h-auto sm:w-64 sm:flex-shrink-0">
              <picture>
                <source
                  type="image/webp"
                  media="(max-width: 640px)"
                  srcSet={`${article.thumbnail?.url}?fm=webp&w=414 1x, ${article.thumbnail?.url}?fm=webp&w=414&dpr=2 2x`}
                />
                <source
                  type="image/webp"
                  srcSet={`${article.thumbnail?.url}?fm=webp&fit=crop&w=240&h=126 1x, ${article.thumbnail?.url}?fm=webp&fit=crop&w=240&h=126&dpr=2 2x`}
                />
                <img
                  src={article.thumbnail?.url || `/no-image.png`}
                  alt=""
                  className="h-full w-full object-cover"
                  width={article.thumbnail?.width}
                  height={article.thumbnail?.height}
                />
              </picture>
            </div>
          ) : (
            <div className="relative h-48 w-full sm:h-auto sm:w-64 sm:flex-shrink-0">
              <Image
                className="h-full w-full object-cover"
                src="/no-image.png"
                alt="No Image"
                width={1200}
                height={630}
              />
            </div>
          )}
          <div className="flex flex-1 flex-col p-6">
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              {article.title}
            </h2>
            <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
              {article.description}
            </p>
            <div className="mt-auto space-y-3">
              <TagList tags={article.tags} hasLink={false} />
              <PublishedDate date={article.publishedAt || article.createdAt} />
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
