import EmptyState from "@/components/common/EmptyState";
import { MESSAGES } from "@/libs/constants";
import { getPortfolioList } from "../api/get-portfolio";
import PortfolioItem from "./PortfolioItem";

export default async function PortfolioList() {
  const portfolios = await getPortfolioList();

  if (!portfolios || portfolios.length === 0) {
    return <EmptyState message={MESSAGES.EMPTY_PORTFOLIO} />;
  }

  return (
    <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {portfolios.map((portfolio) => (
        <PortfolioItem key={portfolio.id} portfolio={portfolio} />
      ))}
    </ul>
  );
}
