import Link from "next/link";
import { MESSAGES } from "@/libs/constants";
import { getPortfolioList } from "../api/get-portfolio";
import PortfolioItem from "./PortfolioItem";

const PREVIEW_LIMIT = 3;

export default async function PortfolioPreview() {
  const portfolios = await getPortfolioList();
  const previewPortfolios = portfolios.slice(0, PREVIEW_LIMIT);

  if (previewPortfolios.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-gray-200 bg-white py-16 dark:border-gray-800 dark:bg-gray-900 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Works
          </h2>
          <Link
            href="/works"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            {MESSAGES.VIEW_ALL}
          </Link>
        </div>
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {previewPortfolios.map((portfolio) => (
            <PortfolioItem key={portfolio.id} portfolio={portfolio} />
          ))}
        </ul>
      </div>
    </section>
  );
}
