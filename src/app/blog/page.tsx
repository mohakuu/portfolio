import HeroSection from "@/components/common/HeroSection";
import PageContainer from "@/components/common/PageContainer";
import SearchFieldWithSuspense from "@/components/common/SearchFieldWithSuspense";
import ArticleList from "@/features/blog/components/ArticleList";

export const metadata = {
  title: "Blog",
  description: "ブログ記事一覧",
};

export default function BlogPage() {
  return (
    <PageContainer>
      <HeroSection title="Blog" description="ブログ記事一覧">
        <div className="mb-8">
          <SearchFieldWithSuspense />
        </div>
        <ArticleList basePath="/blog" />
      </HeroSection>
    </PageContainer>
  );
}
