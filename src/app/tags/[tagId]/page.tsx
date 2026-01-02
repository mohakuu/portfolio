import { Metadata } from "next";
import { getList } from "@/features/blog/api/get-articles";
import { getTag } from "@/features/blog/api/get-tags";
import { LIMIT } from "@/libs/constants";
import Pagination from "@/components/common/Pagination";
import ArticleList from "@/features/blog/components/ArticleList";

type Props = {
  params: Promise<{
    tagId: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { tagId } = params;
  const tag = await getTag(tagId);
  return {
    title: tag.name,
    openGraph: {
      title: tag.name,
    },
    alternates: {
      canonical: `/tags/${params.tagId}`,
    },
  };
}

export default async function Page(props: Props) {
  const params = await props.params;
  const { tagId } = params;
  const data = await getList({
    limit: LIMIT,
    filters: `tags[contains]${tagId}`,
  });
  const tag = await getTag(tagId);
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
        #{tag.name}
      </h1>
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} basePath={`/tags/${tagId}`} />
    </div>
  );
}
