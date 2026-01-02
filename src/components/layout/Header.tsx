import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              SIMPLE BLOG
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
