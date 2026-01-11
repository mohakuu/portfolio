import { Metadata } from "next";
import HeroSection from "@/components/common/HeroSection";
import PageContainer from "@/components/common/PageContainer";
import SearchFieldWithSuspense from "@/components/common/SearchFieldWithSuspense";
import ArticleList from "@/features/blog/components/ArticleList";
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
    <PageContainer>
      <HeroSection title="Blog">
        <div className="mb-8">
          <SearchFieldWithSuspense />
        </div>
        <ArticleList
          queries={{
            offset: LIMIT * (current - 1),
          }}
          current={current}
          basePath="/blog"
        />
      </HeroSection>
    </PageContainer>
  );
}
