import { Metadata } from "next";
import { Suspense } from "react";
import ArticleList from "@/features/blog/components/ArticleList";
import SearchField from "@/components/ui/SearchField";

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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Suspense
          fallback={
            <input
              type="search"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              placeholder="Loading..."
              disabled
            />
          }
        >
          <SearchField />
        </Suspense>
      </div>
      <ArticleList
        queries={{
          q: searchParams.q,
        }}
        basePath="/search"
        q={searchParams.q}
      />
    </div>
  );
}
