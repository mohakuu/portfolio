import ArticleList from "@/features/blog/components/ArticleList";

export const metadata = {
  title: "Blog",
  description: "ブログ記事一覧",
};

export default function ArticlesPage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <section className="border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <h1 className="mb-8 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Blog
          </h1>
          <ArticleList />
        </div>
      </section>
    </div>
  );
}

