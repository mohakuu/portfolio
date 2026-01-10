export const metadata = {
  title: "About",
  description: "自己紹介",
};

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div>
            <h1 className="mb-8 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              About
            </h1>
          </div>

          <div className="space-y-8">
            {/* 基本情報 */}
            <div>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                基本情報
              </h2>
              <dl className="space-y-3 text-lg text-gray-600 dark:text-gray-400">
                <div className="flex">
                  <dt className="w-32 font-medium text-gray-900 dark:text-white">
                    出身地
                  </dt>
                  <dd>山梨県</dd>
                </div>
                <div className="flex">
                  <dt className="w-32 font-medium text-gray-900 dark:text-white">
                    職種
                  </dt>
                  <dd>Webエンジニア</dd>
                </div>
                <div className="flex">
                  <dt className="w-32 font-medium text-gray-900 dark:text-white">
                    趣味
                  </dt>
                  <dd>スキー</dd>
                </div>
              </dl>
            </div>

            {/* 自己紹介 */}
            <div>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                自己紹介
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                <p>
                  山梨県出身のWebエンジニアです。フロントエンドからバックエンドまで、幅広い技術スタックでWebアプリケーションの開発を行っています。
                </p>
                <p>
                  趣味はスキーで、冬のシーズンには地元の山梨のスキー場で滑ることを楽しんでいます。コードを書くことと、雪山を滑ること、どちらも同じように情熱を持って取り組んでいます。
                </p>
                <p>
                  つくるものを通して人と人がつながり、新しい価値が生まれ、気持ちや想いが届く。そんなお手伝いができればと考えています。
                </p>
              </div>
            </div>

            {/* スキル */}
            <div>
              <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                技術スタック
              </h2>
              <div className="flex flex-wrap gap-3">
                {[
                  "Next.js",
                  "React",
                  "TypeScript",
                  "Node.js",
                  "Tailwind CSS",
                  "PostgreSQL",
                  "Git",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

