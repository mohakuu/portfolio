import type { MicroCMSQueries } from "microcms-js-sdk";
import PublishedDate from "@/components/common/Date";
import HeroSection from "@/components/common/HeroSection";
import PageContainer from "@/components/common/PageContainer";
import PageSection from "@/components/common/PageSection";
import { formatRichText } from "@/libs/utils";
import { getDetail } from "../api/get-articles";

type Props = {
  contentId: string;
  queries?: MicroCMSQueries;
};

export default async function Article({ contentId, queries }: Props) {
  const data = await getDetail(contentId, queries);

  return (
    <PageContainer>
      <HeroSection title={data.title} description={data.description}>
        <div className="flex items-center gap-4">
          <PublishedDate date={data.publishedAt || data.createdAt} />
        </div>
      </HeroSection>
      <PageSection>
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
      </PageSection>
    </PageContainer>
  );
}
