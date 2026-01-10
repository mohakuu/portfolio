import type { MicroCMSQueries } from "microcms-js-sdk";
import EmptyState from "@/components/common/EmptyState";
import Pagination from "@/components/common/Pagination";
import { LIMIT, MESSAGES } from "@/libs/constants";
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
    return <EmptyState message={MESSAGES.EMPTY_ARTICLES} />;
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
