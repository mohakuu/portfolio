export const metadata = {
  title: "Contact",
  description: "お問い合わせ",
};

export default function ContactPage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <section className="border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            Contact
          </h1>
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400 sm:text-xl">
            お問い合わせ
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-12">

          <div className="space-y-8">
            <div>
              <p className="mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                Webサイト制作に関するご相談、お見積もりなど、お気軽にお問い合わせください。
              </p>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    メール
                  </h3>
                  <a
                    href="mailto:contact@example.com"
                    className="text-lg text-gray-900 underline hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
                  >
                    contact@example.com
                  </a>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    電話
                  </h3>
                  <a
                    href="tel:03-1234-5678"
                    className="text-lg text-gray-900 underline hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
                  >
                    03-1234-5678
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

