import PublishedDate from "@/components/common/Date";
import { formatRichText } from "@/libs/utils";
import { type Article } from "../types";
import Profile from "./Profile";
import TagList from "./TagList";

type Props = {
  data: Article;
};

export default function Article({ data }: Props) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <article>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          {data.title}
        </h1>
        <div className="mb-4">
          <TagList tags={data.tags} />
        </div>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
          {data.description}
        </p>
        <div className="mb-6 flex items-center gap-4">
          {data.writer && (
            <div className="flex items-center gap-2">
              {data.writer.image && (
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${data.writer?.image?.url}?fm=webp&fit=crop&w=48&h=48 1x, ${data.writer?.image?.url}?fm=webp&fit=crop&w=48&h=48&dpr=2 2x`}
                  />
                  <img
                    src={data.writer?.image?.url}
                    alt=""
                    className="h-12 w-12 rounded-full object-cover"
                    width={data.writer?.image?.width}
                    height={data.writer?.image?.height}
                  />
                </picture>
              )}
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {data.writer?.name}
              </span>
            </div>
          )}
          <PublishedDate date={data.publishedAt || data.createdAt} />
        </div>
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
        <Profile writer={data.writer} />
      </article>
    </main>
  );
}
