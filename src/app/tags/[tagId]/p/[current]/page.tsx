import { Metadata } from "next";
import Pagination from "@/components/common/Pagination";
import { getList } from "@/features/blog/api/get-articles";
import { getTag } from "@/features/blog/api/get-tags";
import ArticleList from "@/features/blog/components/ArticleList";
import { LIMIT } from "@/libs/constants";

type Props = {
  params: Promise<{
    tagId: string;
    current: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  return {
    alternates: {
      canonical: `/tags/${params.tagId}/p/${params.current}`,
    },
  };
}

export default async function Page(props: Props) {
  const params = await props.params;
  const { tagId, current } = params;
  const currentPage = parseInt(current as string, 10);
  const data = await getList({
    limit: LIMIT,
    offset: LIMIT * (currentPage - 1),
    filters: `tags[contains]${tagId}`,
  });
  const tag = await getTag(tagId);
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
        #{tag.name}
      </h1>
      <ArticleList articles={data.contents} />
      <Pagination
        totalCount={data.totalCount}
        current={currentPage}
        basePath={`/tags/${tagId}`}
      />
    </div>
  );
}
