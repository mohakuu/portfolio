import { Metadata } from "next";
import PageContainer from "@/components/common/PageContainer";
import PageSection from "@/components/common/PageSection";
import SearchFieldWithSuspense from "@/components/common/SearchFieldWithSuspense";
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
      canonical: `/blog/search?q=${searchParams.q}`,
    },
  };
}

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;

  return (
    <PageContainer>
      <PageSection className="py-8">
        <div className="mb-8">
          <SearchFieldWithSuspense />
        </div>
        <ArticleList
          queries={{
            q: searchParams.q,
          }}
          basePath="/blog/search"
          q={searchParams.q}
        />
      </PageSection>
    </PageContainer>
  );
}
