import HeroSection from "@/components/common/HeroSection";
import PageContainer from "@/components/common/PageContainer";
import PortfolioPreview from "@/features/portfolio/components/PortfolioPreview";

export const metadata = {
  title: "Home",
  description:
    "つくるものを通して人と人がつながり 新しい価値が生まれ、気持ちや想いが届く。 そんなお手伝いができればと考えています。",
};

export default function HomePage() {
  return (
    <PageContainer>
      <HeroSection
        title="IT IS FREELANCE PORTFOLIO SITE."
        className="text-center"
      >
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400 sm:text-xl lg:text-2xl">
            MOHAKU
          </p>
        </div>
      </HeroSection>
      <PortfolioPreview />
    </PageContainer>
  );
}
