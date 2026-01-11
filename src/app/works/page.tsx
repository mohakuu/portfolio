import PortfolioList from "@/features/portfolio/components/PortfolioList";

export const metadata = {
  title: "Works",
  description: "これまでに制作したプロジェクトの一覧です。",
};

export default function WorksPage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* ヒーローセクション */}
      <section className="border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            Works
          </h1>
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400 sm:text-xl">
            つくるものを通して人と人がつながり
            <br />
            新しい価値が生まれ、気持ちや想いが届く。
            <br />
            そんなお手伝いができればと考えています。
          </p>
        </div>
      </section>

      {/* ポートフォリオ一覧 */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <PortfolioList />
      </section>
    </div>
  );
}

