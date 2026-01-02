import Link from "next/link";
import { LIMIT } from "@/libs/constants";

type Props = {
  totalCount: number;
  current?: number;
  basePath?: string;
  q?: string;
};

export default function Pagination({
  totalCount,
  current = 1,
  basePath = "",
  q,
}: Props) {
  const pages = Array.from({ length: Math.ceil(totalCount / LIMIT) }).map(
    (_, i) => i + 1,
  );
  if (pages.length <= 1) {
    return null;
  }
  return (
    <ul className="flex justify-center gap-2 py-8">
      {pages.map((p) => (
        <li key={p}>
          {current !== p ? (
            <Link
              href={`${basePath}/p/${p}` + (q ? `?q=${q}` : "")}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {p}
            </Link>
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white dark:bg-blue-500">
              {p}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
