import { Metadata } from "next";
import { getList } from "@/features/blog/api/get-articles";
import { LIMIT } from "@/libs/constants";
import Pagination from "@/components/common/Pagination";
import ArticleList from "@/features/blog/components/ArticleList";

type Props = {
  params: Promise<{
    current: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  return {
    alternates: {
      canonical: `/p/${params.current}`,
    },
  };
}

export default async function Page(props: Props) {
  const params = await props.params;
  const current = parseInt(params.current as string, 10);
  const data = await getList({
    limit: LIMIT,
    offset: LIMIT * (current - 1),
  });
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} current={current} />
    </div>
  );
}
