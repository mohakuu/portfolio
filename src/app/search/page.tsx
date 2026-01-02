import { Metadata } from "next";
import Pagination from "@/components/common/Pagination";
import { getList } from "@/features/blog/api/get-articles";
import ArticleList from "@/features/blog/components/ArticleList";

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const searchParams = await props.searchParams;
  return {
    title: "「" + searchParams.q + "」の検索結果",
    openGraph: {
      title: "「" + searchParams.q + "」の検索結果",
    },
    alternates: {
      canonical: `/search?q=${searchParams.q}`,
    },
  };
}

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const data = await getList({
    q: searchParams.q,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <ArticleList articles={data.contents} />
      <Pagination
        totalCount={data.totalCount}
        basePath="/search"
        q={searchParams.q}
      />
    </div>
  );
}
