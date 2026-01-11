import Link from "next/link";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import TechStack from "@/components/common/TechStack";
import { MESSAGES } from "@/libs/constants";
import type { Portfolio } from "../types";

type Props = {
  portfolio: Portfolio;
};

function getPortfolioLink(portfolio: Portfolio) {
  return portfolio.demoUrl || portfolio.githubUrl || "#";
}

function getLinkProps(portfolio: Portfolio) {
  const hasExternalLink = portfolio.demoUrl || portfolio.githubUrl;
  return {
    target: hasExternalLink ? ("_blank" as const) : undefined,
    rel: hasExternalLink ? ("noopener noreferrer" as const) : undefined,
  };
}

function getLinkLabel(portfolio: Portfolio) {
  if (portfolio.demoUrl) return MESSAGES.VIEW_DEMO;
  if (portfolio.githubUrl) return MESSAGES.VIEW_GITHUB;
  return null;
}

export default function PortfolioItem({ portfolio }: Props) {
  const linkUrl = getPortfolioLink(portfolio);
  const linkProps = getLinkProps(portfolio);
  const linkLabel = getLinkLabel(portfolio);

  return (
    <li className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-lg dark:bg-gray-800">
      <Link href={linkUrl} {...linkProps} className="block">
        {/* 画像 */}
        <div className="relative aspect-video w-full overflow-hidden">
          <ImageWithFallback
            src={portfolio.image}
            alt={portfolio.title}
            width={800}
            height={450}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* コンテンツ */}
        <div className="p-6">
          <h2 className="mb-2 text-xl font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {portfolio.title}
          </h2>
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {portfolio.description}
          </p>

          {/* 技術スタック */}
          <TechStack technologies={portfolio.technologies} className="mb-4" />

          {/* リンク */}
          {linkLabel && (
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                {linkLabel}
              </span>
            </div>
          )}
        </div>
      </Link>
    </li>
  );
}

