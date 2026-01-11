import PortfolioPreview from "@/features/portfolio/components/PortfolioPreview";

export const metadata = {
  title: "Home",
  description:
    "つくるものを通して人と人がつながり 新しい価値が生まれ、気持ちや想いが届く。 そんなお手伝いができればと考えています。",
};

export default function HomePage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <section className="border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-6 text-center">
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400 sm:text-xl lg:text-2xl">
              MOHAKU
            </p>
            <p className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              IT IS FREELANCE PORTFOLIO SITE.
            </p>
          </div>
        </div>
      </section>
      <PortfolioPreview />
    </div>
  );
}
