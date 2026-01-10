import type { MicroCMSQueries } from "microcms-js-sdk";
import Pagination from "@/components/common/Pagination";
import { LIMIT } from "@/libs/constants";
import { getList } from "../api/get-articles";
import ArticleListItem from "./ArticleListItem";

type Props = {
  queries?: MicroCMSQueries;
  showPagination?: boolean;
  basePath?: string;
  current?: number;
  q?: string;
};

export default async function ArticleList({
  queries,
  showPagination = true,
  basePath = "",
  current,
  q,
}: Props) {
  const data = await getList({
    limit: LIMIT,
    ...queries,
  });

  if (!data.contents || data.contents.length === 0) {
    return (
      <p className="py-12 text-center text-gray-600 dark:text-gray-400">
        記事がありません。
      </p>
    );
  }

  return (
    <>
      <ul className="space-y-8">
        {data.contents.map((article) => (
          <ArticleListItem key={article.id} article={article} />
        ))}
      </ul>
      {showPagination && (
        <Pagination
          totalCount={data.totalCount}
          current={current}
          basePath={basePath}
          q={q}
        />
      )}
    </>
  );
}
