import { Metadata } from "next";
import { Suspense } from "react";
import ArticleList from "@/features/blog/components/ArticleList";
import SearchField from "@/components/ui/SearchField";
import { LIMIT } from "@/libs/constants";

type Props = {
  params: Promise<{
    current: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  return {
    alternates: {
      canonical: `/blog/p/${params.current}`,
    },
  };
}

export default async function Page(props: Props) {
  const params = await props.params;
  const current = parseInt(params.current as string, 10);

  return (
    <div className="bg-white dark:bg-gray-900">
      <section className="border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <h1 className="mb-8 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Blog
          </h1>
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
              offset: LIMIT * (current - 1),
            }}
            current={current}
            basePath="/blog"
          />
        </div>
      </section>
    </div>
  );
}

