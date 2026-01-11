import { Metadata } from "next";
import ArticleList from "@/features/blog/components/ArticleList";
import { LIMIT } from "@/libs/constants";

type Props = {
  params: Promise<{
    current: string;
  }>;
  searchParams: Promise<{
    q?: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const searchParams = await props.searchParams;
  return {
    alternates: {
      canonical: `/blog/search/p/${params.current}?q=${searchParams.q}`,
    },
  };
}

export default async function Page(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const current = parseInt(params.current as string, 10);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <ArticleList
        queries={{
          offset: LIMIT * (current - 1),
          q: searchParams.q,
        }}
        current={current}
        basePath="/blog/search"
        q={searchParams.q}
      />
    </div>
  );
}

