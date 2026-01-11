import type { Metadata } from "next";
import HeroSection from "@/components/common/HeroSection";
import PageContainer from "@/components/common/PageContainer";
import PageSection from "@/components/common/PageSection";
import PortfolioList from "@/features/portfolio/components/PortfolioList";

export const metadata: Metadata = {
  title: "Works",
  description: "これまでに制作したプロジェクトの一覧です。",
};

export default function WorksPage() {
  return (
    <PageContainer>
      <HeroSection
        title="Works"
        description={
          <>
            つくるものを通して人と人がつながり
            <br />
            新しい価値が生まれ、気持ちや想いが届く。
            <br />
            そんなお手伝いができればと考えています。
          </>
        }
      />
      <PageSection>
        <PortfolioList />
      </PageSection>
    </PageContainer>
  );
}
