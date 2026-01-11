import SearchFieldWithSuspense from "@/components/common/SearchFieldWithSuspense";

export default function Nav() {
  return (
    <nav className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <SearchFieldWithSuspense />
      </div>
    </nav>
  );
}
