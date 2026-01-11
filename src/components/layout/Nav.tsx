import { Suspense } from "react";
import SearchField from "@/components/ui/SearchField";

export default function Nav() {
  return (
    <nav className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <input
              type="search"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              placeholder="Loading..."
              disabled
            />
          }
        >
          <SearchField />
        </Suspense>
      </div>
    </nav>
  );
}
