import type { MicroCMSQueries } from "microcms-js-sdk";
import PublishedDate from "@/components/common/Date";
import { formatRichText } from "@/libs/utils";
import { getDetail } from "../api/get-articles";

type Props = {
  contentId: string;
  queries?: MicroCMSQueries;
};

export default async function Article({ contentId, queries }: Props) {
  const data = await getDetail(contentId, queries);

  return (
    <div className="bg-white dark:bg-gray-900">
      <section className="border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            {data.title}
          </h1>
          <p className="mb-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400 sm:text-xl">
            {data.description}
          </p>
          <div className="flex items-center gap-4">
            <PublishedDate date={data.publishedAt || data.createdAt} />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <article>
          {data.thumbnail && (
            <picture className="mb-8 block">
              <source
                type="image/webp"
                media="(max-width: 640px)"
                srcSet={`${data.thumbnail?.url}?fm=webp&w=414 1x, ${data.thumbnail?.url}?fm=webp&w=414&dpr=2 2x`}
              />
              <source
                type="image/webp"
                srcSet={`${data.thumbnail?.url}?fm=webp&fit=crop&w=960&h=504 1x, ${data.thumbnail?.url}?fm=webp&fit=crop&w=960&h=504&dpr=2 2x`}
              />
              <img
                src={data.thumbnail?.url}
                alt=""
                className="w-full rounded-lg object-cover"
                width={data.thumbnail?.width}
                height={data.thumbnail?.height}
              />
            </picture>
          )}
          <div
            className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-gray-900 dark:prose-code:text-white"
            dangerouslySetInnerHTML={{
              __html: `${formatRichText(data.content)}`,
            }}
          />
        </article>
      </section>
    </div>
  );
}
