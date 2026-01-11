import { Suspense } from "react";
import SearchField from "./SearchField";

export default function SearchFieldWithSuspense() {
  return (
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
  );
}

