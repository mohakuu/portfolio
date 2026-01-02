import Pagination from "@/components/common/Pagination";
import { getList } from "@/features/blog/api/get-articles";
import ArticleList from "@/features/blog/components/ArticleList";
import { LIMIT } from "@/libs/constants";

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
